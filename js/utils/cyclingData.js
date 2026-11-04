/**
 * METEOASTUR LODE - Catálogo Oficial de Rutas Ciclistas de Carretera de Asturias
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Rutas clásicas de carretera organizadas por concejos de salida y comarcas.
 * REGLA DE ORO DE LENDO: Todas las rutas son estrictamente CIRCULARES (salida y regreso a casa).
 * Doctrina de Legalidad Estricta y Blindaje Constitucional de Seguridad y Responsabilidad (Leyes 15 y 16).
 */

export const CYCLING_ROUTES = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. COMARCA DE CASTRILLÓN & BAJO NALÓN (Piedras Blancas, Salinas, Avilés)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'castrillon-pillarno-arena',
    name: 'Clásica de Castrillón: Pillarno & San Juan de La Arena',
    subtitle: 'El circuito favorito de los ciclistas de Piedras Blancas',
    startConcejo: 'castrillon',
    concejos: ['castrillon', 'soto_del_barco'],
    distanceKm: 38,
    elevationGainM: 440,
    maxAltitudeM: 280,
    difficulty: 'Fácil / Media',
    profileType: 'Rompepiernas costero',
    isCircular: true,
    description: 'Salida de Piedras Blancas hacia el valle verde de Pillarno para coronar el Alto de La Cruz. Descenso panorámico a Soto del Barco, paso por San Juan de La Arena y regreso a casa por la carretera de Santa María del Mar.',
    tramos: [
      { name: 'Piedras Blancas ➔ Valle de Pillarno (Subida)', km: 9, bearingDeg: 210, elevGain: 220, avgGradePct: 3.5, endAlt: 280, coord: { lat: 43.515, lon: -6.005 } },
      { name: 'Alto de La Cruz ➔ Descenso a Soto del Barco', km: 8, bearingDeg: 260, elevGain: 30, avgGradePct: -3.2, endAlt: 25, coord: { lat: 43.535, lon: -6.070 } },
      { name: 'Soto del Barco ➔ Ría del Nalón ➔ San Juan de La Arena', km: 7, bearingDeg: 340, elevGain: 40, avgGradePct: 0.8, endAlt: 10, coord: { lat: 43.555, lon: -6.075 } },
      { name: 'San Juan de La Arena ➔ Santa María del Mar ➔ Piedras Blancas', km: 14, bearingDeg: 80, elevGain: 150, avgGradePct: 1.8, endAlt: 35, coord: { lat: 43.565, lon: -5.990 } }
    ]
  },
  {
    id: 'castrillon-cabo-penas',
    name: 'Castrillón & Salinas ➔ Faro de Cabo Peñas',
    subtitle: 'La ruta oceánica circular hasta el extremo norte',
    startConcejo: 'castrillon',
    concejos: ['castrillon', 'aviles', 'gozon', 'carreno'],
    distanceKm: 52,
    elevationGainM: 580,
    maxAltitudeM: 145,
    difficulty: 'Media',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Salida de Piedras Blancas cruzando el arenal de Salinas y la ría de Avilés. Enlace con Luanco y pedaleo expuesto a la galerna y brisas oceánicas hasta el Faro de Peñas, con regreso circular por Gozón.',
    tramos: [
      { name: 'Piedras Blancas ➔ Salinas ➔ Paso Ría de Avilés', km: 10, bearingDeg: 95, elevGain: 60, avgGradePct: 0.9, endAlt: 20, coord: { lat: 43.570, lon: -5.940 } },
      { name: 'Avilés ➔ Bañugues ➔ Luanco', km: 14, bearingDeg: 45, elevGain: 160, avgGradePct: 2.1, endAlt: 30, coord: { lat: 43.615, lon: -5.790 } },
      { name: 'Luanco ➔ Acantilados de Cabo Peñas (Faro)', km: 12, bearingDeg: 330, elevGain: 170, avgGradePct: 2.4, endAlt: 110, coord: { lat: 43.655, lon: -5.850 } },
      { name: 'Cabo Peñas ➔ Valles de Gozón ➔ Regreso a Castrillón', km: 16, bearingDeg: 220, elevGain: 190, avgGradePct: 1.6, endAlt: 35, coord: { lat: 43.560, lon: -5.980 } }
    ]
  },
  {
    id: 'castrillon-pravia-san-roman',
    name: 'Circuito del Nalón: Pravia & Alto de San Román',
    subtitle: 'Valle salmonero y el repecho clásico de Candamo',
    startConcejo: 'castrillon',
    concejos: ['castrillon', 'soto_del_barco', 'pravia', 'candamo'],
    distanceKm: 54,
    elevationGainM: 720,
    maxAltitudeM: 360,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'De Piedras Blancas hacia Pravia bordeando la vega del Nalón. Ascensión a San Román de Candamo, cuna de la fresa, con regreso rompepiernas por Grullos y Ventaniella cerrando el círculo en casa.',
    tramos: [
      { name: 'Piedras Blancas ➔ Soto del Barco ➔ Pravia', km: 16, bearingDeg: 215, elevGain: 120, avgGradePct: 1.2, endAlt: 40, coord: { lat: 43.490, lon: -6.110 } },
      { name: 'Pravia ➔ Subida Alto de San Román de Candamo', km: 11, bearingDeg: 140, elevGain: 320, avgGradePct: 4.8, endAlt: 360, coord: { lat: 43.450, lon: -6.070 } },
      { name: 'San Román ➔ Grullos ➔ Valles de Candamo', km: 12, bearingDeg: 45, elevGain: 110, avgGradePct: -2.5, endAlt: 80, coord: { lat: 43.475, lon: -6.030 } },
      { name: 'Candamo ➔ Ventaniella ➔ Regreso a Piedras Blancas', km: 15, bearingDeg: 355, elevGain: 170, avgGradePct: 1.8, endAlt: 35, coord: { lat: 43.550, lon: -5.985 } }
    ]
  },
  {
    id: 'castrillon-muros-cabo-vidio',
    name: 'Costa Occidental: Cudillero & Cabo Vidio',
    subtitle: 'Miradores salvajes sobre el mar Cantábrico',
    startConcejo: 'castrillon',
    concejos: ['castrillon', 'soto_del_barco', 'muros_de_nalon', 'cudillero'],
    distanceKm: 58,
    elevationGainM: 710,
    maxAltitudeM: 210,
    difficulty: 'Media / Exigente',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Salida de Piedras Blancas hacia el puente del Nalón para cruzar Muros y Cudillero. Tramo costero acariciado por la brisa hasta los acantilados de Oviñana y el Faro Vidio, con retorno directo a Piedras Blancas.',
    tramos: [
      { name: 'Piedras Blancas ➔ Paso del Nalón ➔ Muros', km: 15, bearingDeg: 260, elevGain: 150, avgGradePct: 1.4, endAlt: 110, coord: { lat: 43.545, lon: -6.105 } },
      { name: 'Muros ➔ El Pito ➔ Mirador de Cudillero', km: 9, bearingDeg: 285, elevGain: 140, avgGradePct: 2.5, endAlt: 140, coord: { lat: 43.560, lon: -6.155 } },
      { name: 'Cudillero ➔ Soto de Luiña ➔ Faro de Cabo Vidio (Oviñana)', km: 16, bearingDeg: 295, elevGain: 220, avgGradePct: 2.2, endAlt: 105, coord: { lat: 43.590, lon: -6.245 } },
      { name: 'Cabo Vidio ➔ Regreso continuo por N-632 ➔ Piedras Blancas', km: 18, bearingDeg: 105, elevGain: 200, avgGradePct: 1.2, endAlt: 35, coord: { lat: 43.555, lon: -6.040 } }
    ]
  },
  {
    id: 'castrillon-pulide-corvera',
    name: 'Alto de Pulide & Valles de Illas',
    subtitle: 'Subida exigente entre bosques de robles y eucaliptos',
    startConcejo: 'castrillon',
    concejos: ['castrillon', 'illas', 'corvera_de_asturias'],
    distanceKm: 42,
    elevationGainM: 620,
    maxAltitudeM: 410,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Salida de Piedras Blancas encarando las rampas de Pulide con tramos de hasta el 11%. Descenso por Callezuela (Illas) y regreso llaneando por Corvera y Salinas hasta casa.',
    tramos: [
      { name: 'Piedras Blancas ➔ Pillarno ➔ Alto de Pulide (Subida)', km: 12, bearingDeg: 190, elevGain: 375, avgGradePct: 5.2, endAlt: 410, coord: { lat: 43.495, lon: -5.990 } },
      { name: 'Descenso técnico Pulide ➔ Callezuela (Illas)', km: 9, bearingDeg: 105, elevGain: 45, avgGradePct: -4.1, endAlt: 120, coord: { lat: 43.495, lon: -5.915 } },
      { name: 'Callezuela ➔ Embalse de Trasona (Corvera)', km: 11, bearingDeg: 40, elevGain: 90, avgGradePct: 1.2, endAlt: 45, coord: { lat: 43.535, lon: -5.875 } },
      { name: 'Trasona ➔ Salinas ➔ Regreso a Piedras Blancas', km: 10, bearingDeg: 275, elevGain: 110, avgGradePct: 1.4, endAlt: 35, coord: { lat: 43.558, lon: -5.975 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. COMARCA DE GIJÓN & VALLES CENTRALES (RUTAS CIRCULARES A CASA)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'gijon-madera-siero',
    name: 'Clásica de La Madera & Alto del Infanzón',
    subtitle: 'La ruta reina circular del pelotón gijonés',
    startConcejo: 'gijon',
    concejos: ['gijon', 'siero', 'villaviciosa'],
    distanceKm: 52,
    elevationGainM: 680,
    maxAltitudeM: 350,
    difficulty: 'Media',
    profileType: 'Rompepiernas / Media Montaña',
    isCircular: true,
    description: 'Salida de Gijón hacia Pinzales para subir el tendido y constante Alto de La Madera. Descenso rápido a Noreña y regreso llaneando por Siero hacia el Alto del Infanzón, cerrando la vuelta en Gijón.',
    tramos: [
      { name: 'Gijón ➔ Pinzales ➔ Alto de La Madera', km: 14, bearingDeg: 195, elevGain: 310, avgGradePct: 3.8, endAlt: 350, coord: { lat: 43.465, lon: -5.712 } },
      { name: 'Descenso La Madera ➔ Noreña ➔ Pola de Siero', km: 12, bearingDeg: 165, elevGain: 60, avgGradePct: -2.5, endAlt: 210, coord: { lat: 43.395, lon: -5.688 } },
      { name: 'Siero ➔ Venta de Las Ranas ➔ Peón', km: 16, bearingDeg: 35, elevGain: 190, avgGradePct: 2.1, endAlt: 180, coord: { lat: 43.472, lon: -5.580 } },
      { name: 'Alto del Infanzón ➔ Bajada y regreso a Gijón', km: 10, bearingDeg: 285, elevGain: 120, avgGradePct: -3.2, endAlt: 20, coord: { lat: 43.528, lon: -5.620 } }
    ]
  },
  {
    id: 'gijon-la-tabla-sariego',
    name: 'Vuelta de La Tabla & Sariego',
    subtitle: 'Toboganes constantes por la comarca de la sidra',
    startConcejo: 'gijon',
    concejos: ['gijon', 'villaviciosa', 'sariego'],
    distanceKm: 48,
    elevationGainM: 590,
    maxAltitudeM: 380,
    difficulty: 'Media',
    profileType: 'Rompepiernas',
    isCircular: true,
    description: 'Salida este de Gijón cruzando Somió hacia Peón para encarar el repecho de La Tabla. Paisaje de pomaradas y descenso placentero por Sariego con retorno directo a Gijón.',
    tramos: [
      { name: 'Gijón ➔ Somió ➔ Alto del Curbiellu', km: 11, bearingDeg: 95, elevGain: 210, avgGradePct: 4.2, endAlt: 260, coord: { lat: 43.520, lon: -5.585 } },
      { name: 'Curbiellu ➔ Valle de Peón ➔ Alto de La Tabla', km: 13, bearingDeg: 140, elevGain: 240, avgGradePct: 5.1, endAlt: 380, coord: { lat: 43.460, lon: -5.520 } },
      { name: 'Descenso a Vega de Sariego ➔ Barbecho', km: 12, bearingDeg: 220, elevGain: 40, avgGradePct: -2.8, endAlt: 230, coord: { lat: 43.415, lon: -5.570 } },
      { name: 'Sariego ➔ Llantones ➔ Entrada y regreso a Gijón', km: 12, bearingDeg: 315, elevGain: 100, avgGradePct: -1.5, endAlt: 15, coord: { lat: 43.490, lon: -5.660 } }
    ]
  },
  {
    id: 'gijon-costa-aviles-penas',
    name: 'Costa de los Tres Cabos (Vuelta Circular Gijón)',
    subtitle: 'Salida desde Gijón, Luanco, Cabo Peñas y regreso a Gijón',
    startConcejo: 'gijon',
    concejos: ['gijon', 'carreno', 'gozon', 'aviles'],
    distanceKm: 58,
    elevationGainM: 610,
    maxAltitudeM: 140,
    difficulty: 'Media',
    profileType: 'Costa / Llano ondulado',
    isCircular: true,
    description: 'Trazado circular completo saliendo de Gijón hacia Candás y Luanco. Subida por los valles de Gozón bordeando la ría de Avilés y regreso rodando por Veriña y Tremañes de vuelta a casa en Gijón.',
    tramos: [
      { name: 'Gijón (Poniente) ➔ Carreño ➔ Candás', km: 13, bearingDeg: 295, elevGain: 130, avgGradePct: 1.8, endAlt: 40, coord: { lat: 43.585, lon: -5.765 } },
      { name: 'Candás ➔ Alto de Antromero ➔ Luanco', km: 8, bearingDeg: 320, elevGain: 90, avgGradePct: 2.2, endAlt: 25, coord: { lat: 43.615, lon: -5.790 } },
      { name: 'Luanco ➔ Valles de Gozón ➔ Trasona (Avilés)', km: 14, bearingDeg: 235, elevGain: 160, avgGradePct: 1.5, endAlt: 60, coord: { lat: 43.555, lon: -5.875 } },
      { name: 'Trasona ➔ Embalse de San Andrés ➔ Serín ➔ Gijón', km: 23, bearingDeg: 105, elevGain: 230, avgGradePct: 1.2, endAlt: 15, coord: { lat: 43.520, lon: -5.730 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. COMARCA DE CANGAS DE ONÍS & PICOS DE EUROPA (CIRCULARES A CANGAS)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'cangas-lagos-covadonga',
    name: 'Subida Legendaria a Los Lagos de Covadonga',
    subtitle: 'El santuario ciclista con salida y regreso a Cangas',
    startConcejo: 'cangas_de_onis',
    concejos: ['cangas_de_onis'],
    distanceKm: 44,
    elevationGainM: 1150,
    maxAltitudeM: 1134,
    difficulty: 'Épica',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Aproximación suave de Cangas al Santuario de Covadonga. A partir de ahí, 12 km implacables con rampas del 15% en La Huesera y el Mirador de la Reina hasta los lagos Enol y Ercina. Descenso completo de vuelta a Cangas de Onís.',
    tramos: [
      { name: 'Cangas de Onís ➔ Soto de Cangas ➔ Santuario Covadonga', km: 11, bearingDeg: 125, elevGain: 180, avgGradePct: 2.2, endAlt: 260, coord: { lat: 43.315, lon: -5.055 } },
      { name: 'Covadonga ➔ Los Canónigos ➔ La Huesera (km 6)', km: 6, bearingDeg: 155, elevGain: 480, avgGradePct: 9.2, endAlt: 740, coord: { lat: 43.285, lon: -5.035 } },
      { name: 'La Huesera ➔ Mirador de la Reina ➔ Lago Enol', km: 6, bearingDeg: 140, elevGain: 410, avgGradePct: 8.4, endAlt: 1134, coord: { lat: 43.270, lon: -4.985 } },
      { name: 'Descenso técnico Lago Enol ➔ Regreso a Cangas de Onís', km: 21, bearingDeg: 315, elevGain: 80, avgGradePct: -5.5, endAlt: 85, coord: { lat: 43.330, lon: -5.080 } }
    ]
  },
  {
    id: 'cangas-desfiladero-beyos',
    name: 'Desfiladero de Los Beyos & Alto del Pontón',
    subtitle: 'Garganta caliza esculpida por el Sella (Ida y Vuelta circular)',
    startConcejo: 'cangas_de_onis',
    concejos: ['cangas_de_onis', 'amieva', 'ponga'],
    distanceKm: 58,
    elevationGainM: 920,
    maxAltitudeM: 810,
    difficulty: 'Exigente',
    profileType: 'Media / Alta Montaña',
    isCircular: true,
    description: 'Pedaleo encañonado entre paredes verticales de roca caliza remontando el Sella hacia el Puerto del Pontón. Viento canalizado por el cañón con retorno favorable en descenso a Cangas.',
    tramos: [
      { name: 'Cangas de Onís ➔ Santillán ➔ Puente Vidosa', km: 17, bearingDeg: 170, elevGain: 220, avgGradePct: 2.0, endAlt: 305, coord: { lat: 43.245, lon: -5.130 } },
      { name: 'Puente Vidosa ➔ Desfiladero ➔ Cobarcil', km: 12, bearingDeg: 185, elevGain: 280, avgGradePct: 3.5, endAlt: 585, coord: { lat: 43.165, lon: -5.125 } },
      { name: 'Cobarcil ➔ La Huera ➔ Límite León', km: 10, bearingDeg: 160, elevGain: 340, avgGradePct: 4.8, endAlt: 810, coord: { lat: 43.115, lon: -5.105 } },
      { name: 'Regreso en bajada continua a Cangas de Onís', km: 19, bearingDeg: 350, elevGain: 80, avgGradePct: -3.2, endAlt: 85, coord: { lat: 43.250, lon: -5.120 } }
    ]
  },
  {
    id: 'cangas-arriondas-alto-fito',
    name: 'Cangas - Arriondas & Alto del Fito',
    subtitle: 'Circuito circular de Cangas al mar y regreso por Ribadesella',
    startConcejo: 'cangas_de_onis',
    concejos: ['cangas_de_onis', 'parres', 'colunga', 'ribadesella'],
    distanceKm: 48,
    elevationGainM: 740,
    maxAltitudeM: 597,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Enlace llano de Cangas a Arriondas para subir la vertiente sur del Alto del Fito. Bajada a Colunga y regreso circular por la costa de Ribadesella remontando el Sella de nuevo a Cangas.',
    tramos: [
      { name: 'Cangas de Onís ➔ Arriondas (Vega del Sella)', km: 8, bearingDeg: 290, elevGain: 30, avgGradePct: 0.8, endAlt: 70, coord: { lat: 43.385, lon: -5.185 } },
      { name: 'Arriondas ➔ Subida Alto del Fito (Sur)', km: 11, bearingDeg: 340, elevGain: 520, avgGradePct: 5.6, endAlt: 597, coord: { lat: 43.435, lon: -5.195 } },
      { name: 'Descenso a Colunga / La Isla', km: 13, bearingDeg: 310, elevGain: 40, avgGradePct: -4.5, endAlt: 25, coord: { lat: 43.485, lon: -5.265 } },
      { name: 'Retorno por Ribadesella ➔ Arriondas ➔ Cangas de Onís', km: 16, bearingDeg: 145, elevGain: 150, avgGradePct: 1.2, endAlt: 85, coord: { lat: 43.420, lon: -5.150 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. COMARCA DE OVIEDO & VALLES MINEROS (CIRCULARES A OVIEDO)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'oviedo-naranco-caldas',
    name: 'Cima del Naranco & Valles del Nalón',
    subtitle: 'El balcón de la capital y el valle termal (Circular Oviedo)',
    startConcejo: 'oviedo',
    concejos: ['oviedo', 'ribera_de_arriba', 'santo_adriano'],
    distanceKm: 42,
    elevationGainM: 720,
    maxAltitudeM: 634,
    difficulty: 'Media',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Salida de Oviedo subiendo la clásica del Monte Naranco. Bajada hacia Ules, enlace con la tranquila vega de Las Caldas y regreso circular a Oviedo por Tenebreo.',
    tramos: [
      { name: 'Oviedo (Llamaquique) ➔ Cima Monte Naranco', km: 7, bearingDeg: 320, elevGain: 380, avgGradePct: 6.8, endAlt: 634, coord: { lat: 43.385, lon: -5.870 } },
      { name: 'Descenso Naranco ➔ Ules ➔ San Claudio', km: 9, bearingDeg: 250, elevGain: 50, avgGradePct: -5.2, endAlt: 160, coord: { lat: 43.365, lon: -5.925 } },
      { name: 'San Claudio ➔ Las Caldas ➔ Trubia', km: 12, bearingDeg: 210, elevGain: 110, avgGradePct: 1.4, endAlt: 120, coord: { lat: 43.335, lon: -5.970 } },
      { name: 'Trubia ➔ Puerto de Tenebreo ➔ Regreso a Oviedo', km: 14, bearingDeg: 75, elevGain: 180, avgGradePct: 2.1, endAlt: 230, coord: { lat: 43.355, lon: -5.855 } }
    ]
  },
  {
    id: 'oviedo-angliru-infierno',
    name: 'El Olimpo del Ciclismo: Cima de L’Angliru',
    subtitle: 'Salida desde Oviedo, ascensión al coloso y regreso a casa',
    startConcejo: 'oviedo',
    concejos: ['oviedo', 'riosa', 'morcin'],
    distanceKm: 56,
    elevationGainM: 1420,
    maxAltitudeM: 1570,
    difficulty: 'Épica',
    profileType: 'Alta Montaña / Coloso',
    isCircular: true,
    description: 'De Oviedo a La Foz de Morcín y Riosa. En Viapará empieza el infierno: 6 km al 13% con la Cueña les Cabres al 23.5%. Descenso completo y regreso llaneando a Oviedo.',
    tramos: [
      { name: 'Oviedo ➔ Soto de Ribera ➔ La Vega (Riosa)', km: 18, bearingDeg: 195, elevGain: 190, avgGradePct: 1.8, endAlt: 310, coord: { lat: 43.235, lon: -5.875 } },
      { name: 'La Vega ➔ Área Recreativa Viapará', km: 5, bearingDeg: 205, elevGain: 420, avgGradePct: 8.5, endAlt: 730, coord: { lat: 43.215, lon: -5.910 } },
      { name: 'Viapará ➔ Cueña les Cabres (23.5%) ➔ Cima Angliru', km: 7, bearingDeg: 215, elevGain: 760, avgGradePct: 12.8, endAlt: 1570, coord: { lat: 43.220, lon: -5.940 } },
      { name: 'Descenso extremo y regreso seguro a Oviedo', km: 26, bearingDeg: 15, elevGain: 50, avgGradePct: -4.8, endAlt: 230, coord: { lat: 43.280, lon: -5.880 } }
    ]
  }
];

export function getCyclingRoutesForConcejo(concejoId) {
  if (!concejoId) return CYCLING_ROUTES;
  const directMatches = CYCLING_ROUTES.filter(r => r.concejos.includes(concejoId) || r.startConcejo === concejoId);
  if (directMatches.length > 0) return directMatches;
  return CYCLING_ROUTES;
}

export function getCyclingRouteById(routeId) {
  return CYCLING_ROUTES.find(r => r.id === routeId) || CYCLING_ROUTES[0];
}
