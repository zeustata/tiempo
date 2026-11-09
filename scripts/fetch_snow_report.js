/**
 * MeteoAstur - Bot Automatizado de Partes Oficiales de Nieve
 * Extrae y consolida en segundo plano el estado de pistas y remontes
 * de las 4 estaciones de esquí de la Cordillera Cantábrica:
 * - Valgrande-Pajares
 * - Fuentes de Invierno
 * - San Isidro
 * - Leitariegos
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../data/partes-nieve.json');

const STATIONS = [
  { id: 'pajares', slug: 'valgrande-pajares', name: 'Valgrande-Pajares', kmDefault: 22.6, pistasDefault: 38, remontesDefault: 8 },
  { id: 'fuentes', slug: 'fuentes-de-invierno', name: 'Fuentes de Invierno', kmDefault: 8.7, pistasDefault: 15, remontesDefault: 5 },
  { id: 'san_isidro', slug: 'san-isidro', name: 'San Isidro', kmDefault: 34.0, pistasDefault: 35, remontesDefault: 15 },
  { id: 'leitariegos', slug: 'valle-laciana-leitariegos', name: 'Leitariegos', kmDefault: 8.0, pistasDefault: 13, remontesDefault: 6 }
];

function fetchUrl(url, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      }
    }, (res) => {
      // Manejar posibles redirecciones HTTP 301/302
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : new URL(res.headers.location, url).href;
        return resolve(fetchUrl(nextUrl, timeoutMs));
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} al consultar ${url}`));
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error(`Timeout (${timeoutMs}ms) al consultar ${url}`));
    });
  });
}

function parseCircleMetric(chunk, title) {
  const pattern = new RegExp('<strong>' + title + '</strong></div>\\s*<div class=\"[^\"]*\">\\s*<div class=\"dato_circulo_dato\">([^<]+)</div>\\s*<div class=\"dato_circulo_leyenda\">/([^<]+)</div>', 'i');
  const m = chunk.match(pattern);
  if (m) {
    const val = m[1].trim();
    const total = m[2].trim();
    return {
      abiertos: val === '-' ? 0 : parseInt(val, 10) || 0,
      totales: parseInt(total, 10) || 0
    };
  }
  return { abiertos: 0, totales: 0 };
}

async function processSnowReport() {
  console.log('❄️ Iniciando extracción de partes de nieve oficiales...');
  const now = new Date();

  // Plantilla base segura en caso de caída total de red
  const finalReport = {
    updatedAt: now.toISOString(),
    source: 'Infonieve / Estaciones Oficiales Cordillera Cantábrica',
    stations: {}
  };

  try {
    const summaryHtml = await fetchUrl('https://www.infonieve.es/estaciones-esqui/cordillera-cantabrica/');

    for (const st of STATIONS) {
      const slugIndex = summaryHtml.indexOf('estacion-esqui/' + st.slug + '/');
      let summaryState = 'Cerrada';
      let kmAbiertos = 0, kmTotales = st.kmDefault;
      let pistasAbiertas = 0, pistasTotales = st.pistasDefault;
      let espesorMin = 0, espesorMax = 0;
      let fechaActualizacion = '';

      if (slugIndex !== -1) {
        const chunk = summaryHtml.substring(slugIndex, slugIndex + 1600);
        
        // Estado textual (ej: 'Abierta', 'Cerrada', 'Pretemporada')
        const estadoMatch = chunk.match(/class="list_estaciones_largo">([^<]+)<\/span>/i);
        summaryState = estadoMatch ? estadoMatch[1].trim() : 'Cerrada';

        // Fecha de última actualización oficial emitida por la estación
        const fechaMatch = chunk.match(/class="fuentemicro fuentegris">([^<]+)<\/span>/i);
        fechaActualizacion = fechaMatch ? fechaMatch[1].trim() : '';

        // Kilómetros esquiables
        const kmMatch = chunk.match(/class="td tdx3"[^>]*><strong>([^<]+)<\/strong>\/([^<]+)<br>/i);
        if (kmMatch) {
          const rawKm = kmMatch[1].trim();
          kmAbiertos = rawKm === '-' ? 0 : parseFloat(rawKm.replace(',', '.')) || 0;
          const rawKmTot = kmMatch[2].trim();
          kmTotales = parseFloat(rawKmTot.replace(',', '.')) || st.kmDefault;
        }

        // Pistas abiertas
        const pistasMatch = chunk.match(/class="td tdx4"[^>]*><strong>([^<]+)<\/strong>\/([^<]+)<\/a>/i);
        if (pistasMatch) {
          const rawPistas = pistasMatch[1].trim();
          pistasAbiertas = rawPistas === '-' ? 0 : parseInt(rawPistas, 10) || 0;
          const rawPistasTot = pistasMatch[2].trim();
          pistasTotales = parseInt(rawPistasTot, 10) || st.pistasDefault;
        }

        // Espesor de nieve en cm
        const espesorMatch = chunk.match(/class="td tdx5"[^>]*><strong>([^<]+)<\/strong>\s*<span/i);
        if (espesorMatch) {
          const rawEsp = espesorMatch[1].trim();
          if (rawEsp.includes('-')) {
            const parts = rawEsp.split('-');
            espesorMin = parseInt(parts[0], 10) || 0;
            espesorMax = parseInt(parts[1], 10) || 0;
          } else if (rawEsp !== '-') {
            espesorMin = espesorMax = parseInt(rawEsp, 10) || 0;
          }
        }
      }

      // Detalle de remontes y pistas por colores de dificultad
      let remontes = { abiertos: 0, totales: st.remontesDefault };
      let verdes = { abiertos: 0, totales: 0 };
      let azules = { abiertos: 0, totales: 0 };
      let rojas = { abiertos: 0, totales: 0 };
      let negras = { abiertos: 0, totales: 0 };
      let calidadNieve = 'Sin especificar';

      try {
        const detailHtml = await fetchUrl(`https://www.infonieve.es/estacion-esqui/${st.slug}/parte-de-nieve/`, 8000);
        const remonteParsed = parseCircleMetric(detailHtml, 'Remontes');
        if (remonteParsed.totales > 0) remontes = remonteParsed;

        verdes = parseCircleMetric(detailHtml, 'Verdes');
        azules = parseCircleMetric(detailHtml, 'Azules');
        rojas = parseCircleMetric(detailHtml, 'Rojas');
        negras = parseCircleMetric(detailHtml, 'Negras');

        const calidadMatch = detailHtml.match(/Calidad de la nieve:\s*<strong>([^<]+)<\/strong>/i) ||
                             detailHtml.match(/class="fuentegrande"[^>]*>([^<]+)<\/span>\s*<br>\s*<span class="fuentemicro"[^>]*>CALIDAD/i);
        if (calidadMatch) {
          calidadNieve = calidadMatch[1].trim();
        }
      } catch (errDetail) {
        console.warn(`⚠️ Aviso: No se pudo obtener detalle fino de ${st.name} (${errDetail.message}). Usando métricas generales.`);
      }

      const isAbierta = summaryState.toLowerCase().includes('abierta');

      finalReport.stations[st.id] = {
        id: st.id,
        nombre: st.name,
        estado: summaryState,
        abierta: isAbierta,
        fechaActualizacion: fechaActualizacion || 'Sin parte reciente',
        kmEsquiables: kmAbiertos,
        kmTotales: kmTotales,
        pistasAbiertas: pistasAbiertas,
        pistasTotales: pistasTotales,
        remontesAbiertos: remontes.abiertos,
        remontesTotales: remontes.totales || st.remontesDefault,
        espesorMin,
        espesorMax,
        calidadNieve,
        pistasDesglose: {
          verdes: verdes.abiertos,
          verdesTotales: verdes.totales,
          azules: azules.abiertos,
          azulesTotales: azules.totales,
          rojas: rojas.abiertos,
          rojasTotales: rojas.totales,
          negras: negras.abiertos,
          negrasTotales: negras.totales
        }
      };
    }

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalReport, null, 2), 'utf-8');
    console.log(`✅ Partes de nieve guardados con éxito en: ${OUTPUT_FILE}`);

  } catch (err) {
    console.error('❌ Error consolidando partes de nieve:', err.message);
    // Si ya existe el archivo anterior no lo destruimos; si no existe, creamos el fallback seguro
    if (!fs.existsSync(OUTPUT_FILE)) {
      STATIONS.forEach(st => {
        finalReport.stations[st.id] = {
          id: st.id,
          nombre: st.name,
          estado: 'Cerrada',
          abierta: false,
          fechaActualizacion: 'Fuera de temporada',
          kmEsquiables: 0,
          kmTotales: st.kmDefault,
          pistasAbiertas: 0,
          pistasTotales: st.pistasDefault,
          remontesAbiertos: 0,
          remontesTotales: st.remontesDefault,
          espesorMin: 0,
          espesorMax: 0,
          calidadNieve: 'Sin especificar',
          pistasDesglose: { verdes: 0, verdesTotales: 0, azules: 0, azulesTotales: 0, rojas: 0, rojasTotales: 0, negras: 0, negrasTotales: 0 }
        };
      });
      fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalReport, null, 2), 'utf-8');
      console.log('🛡️ Creado archivo base de seguridad con estado cerrado.');
    }
  }
}

processSnowReport();

