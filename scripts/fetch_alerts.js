const fs = require('fs');
const https = require('https');
const path = require('path');

const API_URL = 'https://feeds.meteoalarm.org/api/v1/warnings/feeds-spain';
const OUTPUT_FILE = path.join(__dirname, '../data/avisos-asturias.json');

// Zonas AEMET para Asturias (códigos de Meteoalerta)
const ASTURIAS_ZONES = [
  'Litoral occidental asturiano',
  'Litoral oriental asturiano',
  'Suroccidental asturiana',
  'Central y Valles mineros',
  'Cordillera y Picos de Europa'
];

function fetchAlerts() {
  return new Promise((resolve, reject) => {
    https.get(API_URL, { headers: { 'User-Agent': 'MeteoAstur-Bot' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function processAlerts() {
  try {
    const data = await fetchAlerts();
    const now = new Date();
    
    // Objeto consolidado por zona
    const alertsByZone = {
      '633301': { name: 'Litoral occidental asturiano', alerts: [] },
      '633302': { name: 'Litoral oriental asturiano', alerts: [] },
      '633303': { name: 'Suroccidental asturiana', alerts: [] },
      '633304': { name: 'Central y Valles mineros', alerts: [] },
      '633305': { name: 'Cordillera y Picos de Europa', alerts: [] }
    };
    
    const zoneNameToId = {
      'Litoral occidental asturiano': '633301',
      'Litoral oriental asturiano': '633302',
      'Suroccidental asturiana': '633303',
      'Central y Valles mineros': '633304',
      'Cordillera y Picos de Europa': '633305'
    };

    if (data && Array.isArray(data.warnings)) {
      data.warnings.forEach(w => {
        if (!w.alert || !w.alert.info) return;
        
        // Buscamos la info en español
        const infoEs = Array.isArray(w.alert.info) 
          ? w.alert.info.find(i => i.language === 'es-ES') || w.alert.info[0]
          : w.alert.info;
          
        if (!infoEs || !Array.isArray(infoEs.area)) return;
        
        // Verificamos si afecta a alguna zona de Asturias
        infoEs.area.forEach(area => {
          if (ASTURIAS_ZONES.includes(area.areaDesc)) {
            const expires = new Date(infoEs.expires);
            // Ignoramos los caducados y los de nivel verde
            const levelParam = (infoEs.parameter || []).find(p => p.valueName === 'awareness_level');
            const typeParam = (infoEs.parameter || []).find(p => p.valueName === 'awareness_type');
            
            const levelVal = levelParam ? levelParam.value : '';
            if (expires > now && !levelVal.includes('green')) {
              
              const zoneId = zoneNameToId[area.areaDesc];
              
              // Extraer color del nivel
              let color = 'yellow';
              if (levelVal.includes('orange')) color = 'orange';
              if (levelVal.includes('red')) color = 'red';
              
              const alertObj = {
                id: w.alert.identifier,
                type: typeParam ? typeParam.value.toLowerCase() : 'unknown',
                level: color,
                onset: infoEs.onset,
                expires: infoEs.expires,
                headline: infoEs.headline,
                description: infoEs.description,
                instruction: infoEs.instruction
              };
              
              alertsByZone[zoneId].alerts.push(alertObj);
            }
          }
        });
      });
    }

    // Limpiar duplicados por actualizaciones (misma type y mismo color con horas superpuestas)
    // Para simplificar en cliente, dejamos todo y el cliente muestra el max nivel.
    
    const outputData = {
      updatedAt: now.toISOString(),
      zones: alertsByZone
    };
    
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));
    console.log('✅ Avisos AEMET para Asturias actualizados:', OUTPUT_FILE);
    
  } catch (err) {
    console.error('❌ Error obteniendo avisos:', err);
    process.exit(1);
  }
}

processAlerts();
