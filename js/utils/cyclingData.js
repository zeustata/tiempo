/**
 * METEOASTUR LODE - Catálogo Oficial de Rutas Ciclistas de Carretera de Asturias (50 Grandes Clásicas)
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
    concejos: ['castrillon', 'sotodelbarco'],
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
    concejos: ['castrillon', 'sotodelbarco', 'pravia', 'candamo'],
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
    concejos: ['castrillon', 'sotodelbarco', 'murosdenalon', 'cudillero'],
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
    concejos: ['castrillon', 'illas', 'corvera'],
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
    id: 'gijon-villaviciosa-clasica',
    name: 'Clásica de La Sidra: Gijón ➔ Villaviciosa (Ida y Vuelta)',
    subtitle: 'El circuito por excelencia de las grupetas gijonesas',
    startConcejo: 'gijon',
    concejos: ['gijon', 'villaviciosa'],
    distanceKm: 52,
    elevationGainM: 680,
    maxAltitudeM: 265,
    difficulty: 'Media',
    profileType: 'Costa & Colinas',
    isCircular: true,
    description: 'La salida ciclista de fin de semana más popular de Gijón. Ida rápida por el Alto del Infanzón y el Alto del Gobernador hasta la ría de Villaviciosa, y regreso exigente encarando el repecho de Peón y el Curbiellu de vuelta a Somió y Gijón.',
    tramos: [
      { name: 'Gijón ➔ Somió ➔ Alto del Infanzón', km: 9, bearingDeg: 105, elevGain: 160, avgGradePct: 2.8, endAlt: 165, phase: 'ida', coord: { lat: 43.535, lon: -5.610 } },
      { name: 'Infanzón ➔ Alto del Gobernador ➔ Ría de Villaviciosa', km: 17, bearingDeg: 115, elevGain: 150, avgGradePct: -1.5, endAlt: 15, phase: 'ida', coord: { lat: 43.485, lon: -5.435 } },
      { name: 'Villaviciosa ➔ Valle de Peón ➔ Alto de La Cruz', km: 15, bearingDeg: 260, elevGain: 240, avgGradePct: 3.6, endAlt: 265, phase: 'vuelta', coord: { lat: 43.480, lon: -5.545 } },
      { name: 'Alto de La Cruz ➔ Alto del Curbiellu ➔ Regreso a Gijón', km: 11, bearingDeg: 295, elevGain: 130, avgGradePct: -2.8, endAlt: 15, phase: 'vuelta', coord: { lat: 43.525, lon: -5.630 } }
    ]
  },
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
  {
    id: 'gijon-fito-costa',
    name: 'Gran Fondo de La Rasa: Gijón ➔ Villaviciosa ➔ Fito',
    subtitle: 'El desafío de los dos valles orientales y regreso costero',
    startConcejo: 'gijon',
    concejos: ['gijon', 'villaviciosa', 'colunga', 'carreno'],
    distanceKm: 76,
    elevationGainM: 980,
    maxAltitudeM: 597,
    difficulty: 'Exigente',
    profileType: 'Media Montaña / Gran Fondo',
    isCircular: true,
    description: 'Salida de Gijón por el Infanzón y la ría de Villaviciosa hasta Colunga. Ascensión al Alto del Fito y retorno rodando por Venta de las Ranas de vuelta a Gijón.',
    tramos: [
      { name: 'Gijón ➔ Infanzón ➔ Ría de Villaviciosa', km: 24, bearingDeg: 110, elevGain: 280, avgGradePct: 2.1, endAlt: 20, coord: { lat: 43.480, lon: -5.430 } },
      { name: 'Villaviciosa ➔ Colunga ➔ Alto del Fito (Norte)', km: 18, bearingDeg: 135, elevGain: 510, avgGradePct: 5.8, endAlt: 597, coord: { lat: 43.435, lon: -5.195 } },
      { name: 'Descenso a Colunga ➔ Venta de Las Ranas', km: 20, bearingDeg: 295, elevGain: 110, avgGradePct: -2.8, endAlt: 140, coord: { lat: 43.490, lon: -5.520 } },
      { name: 'Venta de Las Ranas ➔ Peón ➔ Regreso a Gijón', km: 14, bearingDeg: 285, elevGain: 80, avgGradePct: -1.2, endAlt: 15, coord: { lat: 43.530, lon: -5.660 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. COMARCA DE CANGAS DE ONÍS & PICOS DE EUROPA (CIRCULARES A CANGAS)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'cangas-lagos-covadonga',
    name: 'Subida Legendaria a Los Lagos de Covadonga',
    subtitle: 'El santuario ciclista con salida y regreso a Cangas',
    startConcejo: 'cangasdeonis',
    concejos: ['cangasdeonis'],
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
    startConcejo: 'cangasdeonis',
    concejos: ['cangasdeonis', 'amieva', 'ponga'],
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
    startConcejo: 'cangasdeonis',
    concejos: ['cangasdeonis', 'parres', 'colunga', 'ribadesella'],
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
    concejos: ['oviedo', 'riberadearriba', 'santoadriano'],
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
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. COMARCA DEL ORIENTE & COSTA DE LOS BUFONES (LLANES, RIBADESELLA, PANES)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'llanes-valle-oscuru-borbolla',
    name: 'Circuito de Llanes: Valle Oscuru & La Borbolla',
    subtitle: 'Entre los bufones marinos y los valles escondidos del Cuera',
    startConcejo: 'llanes',
    concejos: ['llanes', 'ribadedeva'],
    distanceKm: 46,
    elevationGainM: 520,
    maxAltitudeM: 260,
    difficulty: 'Media',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Salida de la villa de Llanes hacia San Roque del Acebal para adentrarse en el idílico Valle Oscuru. Ascensión al Alto de La Borbolla y regreso por Colombres y la costa llanisca.',
    tramos: [
      { name: 'Llanes ➔ San Roque del Acebal ➔ Valle Oscuru', km: 13, bearingDeg: 115, elevGain: 160, avgGradePct: 2.1, endAlt: 180, coord: { lat: 43.400, lon: -4.680 } },
      { name: 'Valle Oscuru ➔ Subida Alto de La Borbolla', km: 9, bearingDeg: 95, elevGain: 190, avgGradePct: 3.8, endAlt: 260, coord: { lat: 43.385, lon: -4.600 } },
      { name: 'La Borbolla ➔ Descenso a Colombres (Ribadedeva)', km: 11, bearingDeg: 60, elevGain: 40, avgGradePct: -3.2, endAlt: 85, coord: { lat: 43.375, lon: -4.540 } },
      { name: 'Colombres ➔ Llanes por la carretera de la costa', km: 13, bearingDeg: 280, elevGain: 130, avgGradePct: 1.4, endAlt: 15, coord: { lat: 43.420, lon: -4.750 } }
    ]
  },
  {
    id: 'ribadesella-cuevas-sella',
    name: 'Circuito de Ribadesella: Cuevas del Agua & Valles del Sella',
    subtitle: 'El curso del gran río salmonero hasta la desembocadura',
    startConcejo: 'ribadesella',
    concejos: ['ribadesella', 'parres', 'caravia'],
    distanceKm: 42,
    elevationGainM: 460,
    maxAltitudeM: 220,
    difficulty: 'Fácil / Media',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Salida de la playa de Santa Marina en Ribadesella remontando el río Sella hacia Cuevas del Agua. Ascensión suave por los valles interiores y retorno circular a Ribadesella.',
    tramos: [
      { name: 'Ribadesella ➔ Margen del Sella ➔ Cuevas del Agua', km: 10, bearingDeg: 195, elevGain: 90, avgGradePct: 1.4, endAlt: 60, coord: { lat: 43.430, lon: -5.080 } },
      { name: 'Cuevas ➔ Collado de Caravia (Subida)', km: 12, bearingDeg: 285, elevGain: 210, avgGradePct: 3.2, endAlt: 220, coord: { lat: 43.450, lon: -5.190 } },
      { name: 'Caravia ➔ Berbes ➔ Mirador del Cantábrico', km: 10, bearingDeg: 55, elevGain: 80, avgGradePct: -1.8, endAlt: 90, coord: { lat: 43.475, lon: -5.120 } },
      { name: 'Berbes ➔ Descenso a Ribadesella Centro', km: 10, bearingDeg: 95, elevGain: 80, avgGradePct: -2.1, endAlt: 10, coord: { lat: 43.460, lon: -5.060 } }
    ]
  },
  {
    id: 'panes-hermida-penamellera',
    name: 'Desfiladero de Peñamellera & Valle Bajo del Cares',
    subtitle: 'La puerta oriental entre Picos de Europa y Cantabria',
    startConcejo: 'penamellerabaja',
    concejos: ['penamellerabaja', 'penamelleraalta'],
    distanceKm: 52,
    elevationGainM: 610,
    maxAltitudeM: 380,
    difficulty: 'Media',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Salida de Panes remontando las aguas bravas del Cares hacia Alles y Peñamellera Alta. Vistas imponentes de la mole caliza del Cuera y retorno en suave bajada a Panes.',
    tramos: [
      { name: 'Panes ➔ Vega de Siejo ➔ Alles (Peñamellera Alta)', km: 14, bearingDeg: 275, elevGain: 220, avgGradePct: 2.8, endAlt: 260, coord: { lat: 43.325, lon: -4.700 } },
      { name: 'Alles ➔ Alto de Ortiguero (Aproximación)', km: 12, bearingDeg: 260, elevGain: 210, avgGradePct: 3.4, endAlt: 380, coord: { lat: 43.315, lon: -4.810 } },
      { name: 'Ortiguero ➔ Valle del Cares ➔ Buelles', km: 14, bearingDeg: 80, elevGain: 60, avgGradePct: -3.0, endAlt: 70, coord: { lat: 43.330, lon: -4.640 } },
      { name: 'Buelles ➔ Paso del Deva ➔ Regreso a Panes', km: 12, bearingDeg: 125, elevGain: 120, avgGradePct: 1.2, endAlt: 50, coord: { lat: 43.320, lon: -4.580 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. COMARCA DEL OCCIDENTE (LUARCA, NAVIA, VEGADEO, CANGAS DEL NARCEA)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'luarca-aristebano-paredes',
    name: 'Circuito de Luarca: Alto de Aristébano & Valle de Paredes',
    subtitle: 'Tierra de vaqueiros de alzada y brañas legendarias',
    startConcejo: 'valdes',
    concejos: ['valdes', 'tineo'],
    distanceKm: 48,
    elevationGainM: 740,
    maxAltitudeM: 540,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Salida del puerto pesquero de Luarca adentrándose en el interior vaqueiro. Ascensión regular al Alto de Aristébano, descenso por el sobrecogedor Valle de Paredes y regreso a Luarca.',
    tramos: [
      { name: 'Luarca ➔ Barcia ➔ Subida Alto de Aristébano', km: 16, bearingDeg: 175, elevGain: 480, avgGradePct: 4.8, endAlt: 540, coord: { lat: 43.460, lon: -6.510 } },
      { name: 'Aristébano ➔ Descenso a San Pedro de Paredes', km: 11, bearingDeg: 120, elevGain: 40, avgGradePct: -4.2, endAlt: 180, coord: { lat: 43.435, lon: -6.425 } },
      { name: 'Valle de Paredes ➔ Canero (Garganta del Esva)', km: 12, bearingDeg: 15, elevGain: 70, avgGradePct: -1.5, endAlt: 30, coord: { lat: 43.520, lon: -6.450 } },
      { name: 'Canero ➔ Villar ➔ Regreso a Luarca', km: 9, bearingDeg: 285, elevGain: 150, avgGradePct: 2.1, endAlt: 20, coord: { lat: 43.540, lon: -6.535 } }
    ]
  },
  {
    id: 'navia-coana-doiras',
    name: 'Ría de Navia: Castros de Coaña & Embalse de Doiras',
    subtitle: 'El río Navia entre castros celtas y meandros profundos',
    startConcejo: 'navia',
    concejos: ['navia', 'coana', 'boal'],
    distanceKm: 54,
    elevationGainM: 680,
    maxAltitudeM: 420,
    difficulty: 'Media',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'De la ría de Navia remontando hacia el mítico Castro de Coaña. Enlace de media montaña hacia el embalse de Doiras y retorno en suave bajada por la ribera de Boal.',
    tramos: [
      { name: 'Navia ➔ Mohías ➔ Castro de Coaña', km: 11, bearingDeg: 215, elevGain: 180, avgGradePct: 2.6, endAlt: 160, coord: { lat: 43.515, lon: -6.745 } },
      { name: 'Coaña ➔ Subida hacia Mirador de Doiras', km: 15, bearingDeg: 195, elevGain: 310, avgGradePct: 4.1, endAlt: 420, coord: { lat: 43.425, lon: -6.815 } },
      { name: 'Doiras ➔ Ribera del río Navia ➔ San Luis', km: 14, bearingDeg: 35, elevGain: 60, avgGradePct: -3.2, endAlt: 90, coord: { lat: 43.480, lon: -6.760 } },
      { name: 'San Luis ➔ Puerto de Vega ➔ Entrada a Navia', km: 14, bearingDeg: 350, elevGain: 130, avgGradePct: 1.5, endAlt: 15, coord: { lat: 43.540, lon: -6.720 } }
    ]
  },
  {
    id: 'vegadeo-ria-eo-garganta',
    name: 'Vegadeo & Ría del Eo ➔ Alto de La Garganta',
    subtitle: 'El coloso del occidente asturiano sobre la ría gallega',
    startConcejo: 'vegadeo',
    concejos: ['vegadeo', 'taramundi', 'castropol'],
    distanceKm: 62,
    elevationGainM: 890,
    maxAltitudeM: 877,
    difficulty: 'Exigente / Épica',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Salida de Vegadeo cruzando la fértil vega del Suarón hacia Villanueva de Oscos para coronar el exigente Alto de La Garganta. Vistas inmensas de la ría del Eo en el descenso.',
    tramos: [
      { name: 'Vegadeo ➔ Valle de Taramundi (Aproximación)', km: 14, bearingDeg: 195, elevGain: 210, avgGradePct: 2.5, endAlt: 240, coord: { lat: 43.360, lon: -7.110 } },
      { name: 'Taramundi ➔ Subida exigente Alto de La Garganta', km: 16, bearingDeg: 145, elevGain: 640, avgGradePct: 5.6, endAlt: 877, coord: { lat: 43.320, lon: -6.990 } },
      { name: 'Descenso técnico La Garganta ➔ San Tirso de Abres', km: 18, bearingDeg: 325, elevGain: 50, avgGradePct: -4.8, endAlt: 50, coord: { lat: 43.400, lon: -7.140 } },
      { name: 'San Tirso ➔ Ría del Eo ➔ Regreso a Vegadeo', km: 14, bearingDeg: 45, elevGain: 90, avgGradePct: 1.0, endAlt: 10, coord: { lat: 43.465, lon: -7.050 } }
    ]
  },
  {
    id: 'cangas-narcea-acebo',
    name: 'Cangas del Narcea & Cima del Santuario del Acebo',
    subtitle: 'El altar ciclista del suroccidente asturiano',
    startConcejo: 'cangasdelnarcea',
    concejos: ['cangasdelnarcea'],
    distanceKm: 46,
    elevationGainM: 920,
    maxAltitudeM: 1174,
    difficulty: 'Exigente',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Salida de la villa de Cangas del Narcea para encarar los 9 km de ascensión continua hasta el Santuario de Nuestra Señora del Acebo (1.174 m). Descenso por Carballo y regreso a Cangas.',
    tramos: [
      { name: 'Cangas del Narcea ➔ Subida Cima del Acebo', km: 11, bearingDeg: 95, elevGain: 790, avgGradePct: 7.2, endAlt: 1174, coord: { lat: 43.175, lon: -6.505 } },
      { name: 'Santuario del Acebo ➔ Descenso a Robledo', km: 10, bearingDeg: 185, elevGain: 30, avgGradePct: -6.2, endAlt: 620, coord: { lat: 43.140, lon: -6.530 } },
      { name: 'Robledo ➔ Valle del río Cibea ➔ Corias', km: 13, bearingDeg: 310, elevGain: 60, avgGradePct: -2.8, endAlt: 360, coord: { lat: 43.190, lon: -6.565 } },
      { name: 'Corias (Monasterio) ➔ Regreso a Cangas del Narcea', km: 12, bearingDeg: 145, elevGain: 40, avgGradePct: 1.1, endAlt: 380, coord: { lat: 43.180, lon: -6.550 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. COMARCA DEL CAUDAL & MONTAÑA CENTRAL (LENA, MIERES, ALLER)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'lena-cobertoria-barzana',
    name: 'Pola de Lena ➔ Alto de La Cobertoria & Quirós',
    subtitle: 'El paso mítico de la Cordillera entre valles mineros',
    startConcejo: 'lena',
    concejos: ['lena', 'quiros', 'morcin'],
    distanceKm: 45,
    elevationGainM: 1150,
    maxAltitudeM: 1173,
    difficulty: 'Épica',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Salida de Pola de Lena atacando las duras rampas iniciales de La Cobertoria (hasta el 12%). Descenso vertiginoso hacia Bárzana de Quirós y regreso circular por Santa Eulalia de Morcín.',
    tramos: [
      { name: 'Pola de Lena ➔ Piedracea ➔ Alto de La Cobertoria', km: 10, bearingDeg: 285, elevGain: 870, avgGradePct: 8.7, endAlt: 1173, coord: { lat: 43.170, lon: -5.910 } },
      { name: 'Descenso La Cobertoria ➔ Bárzana (Valle de Quirós)', km: 11, bearingDeg: 310, elevGain: 40, avgGradePct: -7.1, endAlt: 410, coord: { lat: 43.205, lon: -6.015 } },
      { name: 'Bárzana ➔ Embalse de Valdemurrio ➔ Caranga', km: 11, bearingDeg: 350, elevGain: 80, avgGradePct: -2.1, endAlt: 240, coord: { lat: 43.265, lon: -6.040 } },
      { name: 'Caranga ➔ Morcín ➔ Regreso a Pola de Lena', km: 13, bearingDeg: 125, elevGain: 160, avgGradePct: 1.5, endAlt: 310, coord: { lat: 43.160, lon: -5.830 } }
    ]
  },
  {
    id: 'mieres-padrun-olloniego',
    name: 'Circuito de Mieres: Alto del Padrún & La Rebollada',
    subtitle: 'El repecho tradicional de la cuenca del Caudal',
    startConcejo: 'mieres',
    concejos: ['mieres', 'oviedo', 'riberadearriba'],
    distanceKm: 36,
    elevationGainM: 480,
    maxAltitudeM: 375,
    difficulty: 'Fácil / Media',
    profileType: 'Rompepiernas',
    isCircular: true,
    description: 'Salida de Mieres remontando la antigua N-630 hacia el Alto del Padrún. Bajada hacia Olloniego bordeando el río Nalón y regreso por Soto de Ribera y Ujo.',
    tramos: [
      { name: 'Mieres ➔ Ablaña ➔ Alto del Padrún (Subida)', km: 10, bearingDeg: 345, elevGain: 210, avgGradePct: 3.8, endAlt: 375, coord: { lat: 43.290, lon: -5.795 } },
      { name: 'Descenso Padrún ➔ Olloniego (Puente Viejo)', km: 8, bearingDeg: 330, elevGain: 30, avgGradePct: -4.0, endAlt: 150, coord: { lat: 43.305, lon: -5.830 } },
      { name: 'Olloniego ➔ Soto de Ribera ➔ Baiña', km: 9, bearingDeg: 165, elevGain: 110, avgGradePct: 1.6, endAlt: 210, coord: { lat: 43.275, lon: -5.810 } },
      { name: 'Baiña ➔ La Peña ➔ Regreso a Mieres', km: 9, bearingDeg: 145, elevGain: 130, avgGradePct: 1.4, endAlt: 220, coord: { lat: 43.250, lon: -5.775 } }
    ]
  },
  {
    id: 'aller-collaona-moreda',
    name: 'Valle del Aller: Cabañaquinta & Alto de La Colladona',
    subtitle: 'El puente montañoso entre las dos cuencas mineras',
    startConcejo: 'aller',
    concejos: ['aller', 'laviana'],
    distanceKm: 48,
    elevationGainM: 780,
    maxAltitudeM: 850,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'De Cabañaquinta encarando las rampas de La Colladona que separan el Caudal del Nalón. Descenso panorámico hacia Pola de Laviana y regreso circular por Moreda de Aller.',
    tramos: [
      { name: 'Cabañaquinta ➔ Corigüela ➔ Alto de La Colladona', km: 12, bearingDeg: 45, elevGain: 470, avgGradePct: 5.4, endAlt: 850, coord: { lat: 43.185, lon: -5.580 } },
      { name: 'Descenso Colladona ➔ Pola de Laviana', km: 11, bearingDeg: 35, elevGain: 40, avgGradePct: -5.8, endAlt: 290, coord: { lat: 43.245, lon: -5.560 } },
      { name: 'Laviana ➔ Blimea ➔ El Entrego', km: 12, bearingDeg: 310, elevGain: 80, avgGradePct: -1.0, endAlt: 230, coord: { lat: 43.285, lon: -5.635 } },
      { name: 'El Entrego ➔ Moreda ➔ Regreso a Cabañaquinta', km: 13, bearingDeg: 195, elevGain: 190, avgGradePct: 2.1, endAlt: 420, coord: { lat: 43.160, lon: -5.620 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. COMARCA DEL NALÓN (LAVIANA, LANGREO, SOBRESCOBIO)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'laviana-colladona-tarna',
    name: 'Circuito de Laviana: Valles del Nalón & Alto de Santo Emiliano',
    subtitle: 'El corazón minero entre castilletes y cumbres verdes',
    startConcejo: 'laviana',
    concejos: ['laviana', 'langreo', 'sanmartindelreyaurelio', 'mieres'],
    distanceKm: 45,
    elevationGainM: 710,
    maxAltitudeM: 520,
    difficulty: 'Media',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Salida de Pola de Laviana recorriendo la vega del Nalón hacia Sama y La Felguera. Ascensión a Santo Emiliano con bajada a Mieres y retorno por el valle de Carrocera.',
    tramos: [
      { name: 'Pola de Laviana ➔ El Entrego ➔ Sama de Langreo', km: 14, bearingDeg: 305, elevGain: 80, avgGradePct: -0.8, endAlt: 215, coord: { lat: 43.295, lon: -5.680 } },
      { name: 'Sama ➔ Subida Alto de Santo Emiliano', km: 7, bearingDeg: 245, elevGain: 305, avgGradePct: 5.2, endAlt: 520, coord: { lat: 43.280, lon: -5.735 } },
      { name: 'Santo Emiliano ➔ Descenso a Mieres del Camín', km: 8, bearingDeg: 215, elevGain: 35, avgGradePct: -4.5, endAlt: 220, coord: { lat: 43.250, lon: -5.770 } },
      { name: 'Mieres ➔ Valle de Carrocera ➔ Regreso a Laviana', km: 16, bearingDeg: 75, elevGain: 290, avgGradePct: 2.4, endAlt: 290, coord: { lat: 43.245, lon: -5.560 } }
    ]
  },
  {
    id: 'langreo-santo-emiliano-felguera',
    name: 'Vuelta Minera de Langreo: Santo Emiliano & Valle de Samuño',
    subtitle: 'Pistas asfaltadas entre bocaminas históricas y robledales',
    startConcejo: 'langreo',
    concejos: ['langreo', 'mieres'],
    distanceKm: 34,
    elevationGainM: 420,
    maxAltitudeM: 520,
    difficulty: 'Fácil / Media',
    profileType: 'Rompepiernas',
    isCircular: true,
    description: 'Salida de La Felguera subiendo Santo Emiliano por su vertiente norte. Descenso hacia el pozo San Luis en Samuño y regreso llaneando por el parque fluvial del Nalón.',
    tramos: [
      { name: 'La Felguera ➔ Sama ➔ Alto de Santo Emiliano', km: 10, bearingDeg: 235, elevGain: 300, avgGradePct: 4.5, endAlt: 520, coord: { lat: 43.280, lon: -5.735 } },
      { name: 'Santo Emiliano ➔ Valle de Samuño (Descenso)', km: 9, bearingDeg: 125, elevGain: 30, avgGradePct: -3.8, endAlt: 240, coord: { lat: 43.275, lon: -5.670 } },
      { name: 'Samuño ➔ Ciaño ➔ Parque del Nalón', km: 8, bearingDeg: 35, elevGain: 40, avgGradePct: 0.8, endAlt: 215, coord: { lat: 43.290, lon: -5.655 } },
      { name: 'Ciaño ➔ Paseo Fluvial ➔ Regreso a La Felguera', km: 7, bearingDeg: 320, elevGain: 50, avgGradePct: 1.0, endAlt: 210, coord: { lat: 43.310, lon: -5.690 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. VALLES DEL OSO & CAMÍN REAL (GRADO, TEVERGA, BELMONTE)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'grado-cabrunana-candamo',
    name: 'Circuito de Grado: Alto de La Cabruñana & Vega del Cubia',
    subtitle: 'La vega moscona y el balcón hacia el Bajo Nalón',
    startConcejo: 'grado',
    concejos: ['grado', 'pravia', 'candamo'],
    distanceKm: 42,
    elevationGainM: 560,
    maxAltitudeM: 375,
    difficulty: 'Media',
    profileType: 'Rompepiernas',
    isCircular: true,
    description: 'Salida de la villa de Grado encarando el clásico Alto de La Cabruñana por la N-634. Bajada hacia Cornellana bordeando el río Narcea y retorno circular por San Román a Grado.',
    tramos: [
      { name: 'Grado ➔ Subida Alto de La Cabruñana', km: 11, bearingDeg: 285, elevGain: 310, avgGradePct: 4.2, endAlt: 375, coord: { lat: 43.395, lon: -6.140 } },
      { name: 'Cabruñana ➔ Descenso a Cornellana (Río Narcea)', km: 9, bearingDeg: 295, elevGain: 25, avgGradePct: -4.0, endAlt: 50, coord: { lat: 43.415, lon: -6.160 } },
      { name: 'Cornellana ➔ San Román de Candamo', km: 11, bearingDeg: 75, elevGain: 120, avgGradePct: 1.8, endAlt: 80, coord: { lat: 43.450, lon: -6.070 } },
      { name: 'Candamo ➔ Aces ➔ Regreso a Grado Centro', km: 11, bearingDeg: 165, elevGain: 105, avgGradePct: 1.2, endAlt: 65, coord: { lat: 43.385, lon: -6.070 } }
    ]
  },
  {
    id: 'teverga-ventana-proaza',
    name: 'Valles del Oso: San Martín de Teverga ➔ Puerto de Ventana',
    subtitle: 'El coloso natural de los osos pardos y hayedos de Valdelagranda',
    startConcejo: 'teverga',
    concejos: ['teverga', 'proaza'],
    distanceKm: 48,
    elevationGainM: 950,
    maxAltitudeM: 1587,
    difficulty: 'Épica',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'De San Martín de Teverga subiendo los 14 km del Puerto de Ventana hasta la frontera con León (1.587 m). Descenso panorámico por el desfiladero de Peñas Juntas y regreso a Teverga.',
    tramos: [
      { name: 'San Martín de Teverga ➔ Páramo ➔ Puerto de Ventana', km: 14, bearingDeg: 195, elevGain: 890, avgGradePct: 6.4, endAlt: 1587, coord: { lat: 43.075, lon: -6.010 } },
      { name: 'Descenso técnico Ventana ➔ La Plaza (Teverga)', km: 14, bearingDeg: 15, elevGain: 20, avgGradePct: -6.2, endAlt: 460, coord: { lat: 43.160, lon: -6.100 } },
      { name: 'Teverga ➔ Desfiladero de Peñas Juntas ➔ Proaza', km: 10, bearingDeg: 35, elevGain: 15, avgGradePct: -2.5, endAlt: 210, coord: { lat: 43.250, lon: -6.020 } },
      { name: 'Proaza ➔ Senda Fluvial ➔ Regreso a Teverga', km: 10, bearingDeg: 215, elevGain: 25, avgGradePct: 2.4, endAlt: 460, coord: { lat: 43.160, lon: -6.100 } }
    ]
  },
  {
    id: 'belmonte-espina-somiedo',
    name: 'Belmonte de Miranda & Alto de La Espina',
    subtitle: 'Tierra de oro romano y desfiladeros fluviales',
    startConcejo: 'belmontedemiranda',
    concejos: ['belmontedemiranda', 'salas', 'somiedo'],
    distanceKm: 54,
    elevationGainM: 880,
    maxAltitudeM: 650,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Salida de Belmonte remontando el valle del Pigüeña. Subida hacia La Espina con vistas de la sierra de Begega y retorno circular a Belmonte por Almurfe.',
    tramos: [
      { name: 'Belmonte ➔ Alvariza ➔ Subida Alto de La Espina', km: 16, bearingDeg: 315, elevGain: 480, avgGradePct: 4.2, endAlt: 650, coord: { lat: 43.375, lon: -6.345 } },
      { name: 'La Espina ➔ Descenso a Salas', km: 12, bearingDeg: 45, elevGain: 40, avgGradePct: -4.5, endAlt: 240, coord: { lat: 43.415, lon: -6.260 } },
      { name: 'Salas ➔ Cornellana (Vega del Narcea)', km: 12, bearingDeg: 110, elevGain: 60, avgGradePct: -1.8, endAlt: 50, coord: { lat: 43.415, lon: -6.160 } },
      { name: 'Cornellana ➔ Cañón del Pigüeña ➔ Regreso a Belmonte', km: 14, bearingDeg: 215, elevGain: 300, avgGradePct: 2.1, endAlt: 200, coord: { lat: 43.280, lon: -6.215 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. COMARCA DE LA SIDRA (VILLAVICIOSA, NAVA, CABRANES, BIMENES)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'villaviciosa-buenos-aires-puntal',
    name: 'Circuito de Villaviciosa: Alto de Buenos Aires & El Puntal',
    subtitle: 'Entre pomaradas, la ría protegida y el puerto de Tazones',
    startConcejo: 'villaviciosa',
    concejos: ['villaviciosa', 'colunga'],
    distanceKm: 40,
    elevationGainM: 490,
    maxAltitudeM: 380,
    difficulty: 'Fácil / Media',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Salida de la capital manzanera subiendo el Alto de Buenos Aires por carreteras tranquilas entre manzanos. Descenso hacia el puerto de El Puntal y regreso bordeando la ría a Villaviciosa.',
    tramos: [
      { name: 'Villaviciosa ➔ Amandi ➔ Alto de Buenos Aires', km: 11, bearingDeg: 145, elevGain: 310, avgGradePct: 4.2, endAlt: 380, coord: { lat: 43.445, lon: -5.410 } },
      { name: 'Buenos Aires ➔ Descenso a Selorio', km: 10, bearingDeg: 45, elevGain: 30, avgGradePct: -3.8, endAlt: 40, coord: { lat: 43.510, lon: -5.370 } },
      { name: 'Selorio ➔ Rodiles ➔ Puerto de El Puntal', km: 9, bearingDeg: 295, elevGain: 60, avgGradePct: 1.2, endAlt: 15, coord: { lat: 43.535, lon: -5.430 } },
      { name: 'El Puntal ➔ Margen de la Ría ➔ Regreso a Villaviciosa', km: 10, bearingDeg: 195, elevGain: 90, avgGradePct: 1.0, endAlt: 20, coord: { lat: 43.480, lon: -5.435 } }
    ]
  },
  {
    id: 'nava-faya-lobos-bimenes',
    name: 'Vuelta a la Comarca Sidrera: Nava & Faya de Los Lobos',
    subtitle: 'Valles angostos, sierras calcáreas y sidra natural',
    startConcejo: 'nava',
    concejos: ['nava', 'bimenes', 'laviana'],
    distanceKm: 44,
    elevationGainM: 630,
    maxAltitudeM: 680,
    difficulty: 'Media / Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'De Nava subiendo hacia Bimenes y coronando el mítico Alto de La Faya de los Lobos. Vistas aéreas de Peñamayor y descenso rápido cerrando el círculo en Nava.',
    tramos: [
      { name: 'Nava ➔ Martimporra (Bimenes) ➔ Subida Faya', km: 13, bearingDeg: 215, elevGain: 420, avgGradePct: 4.8, endAlt: 680, coord: { lat: 43.315, lon: -5.545 } },
      { name: 'Alto de La Faya de Los Lobos ➔ Descenso a Barredos', km: 10, bearingDeg: 185, elevGain: 20, avgGradePct: -4.9, endAlt: 280, coord: { lat: 43.275, lon: -5.560 } },
      { name: 'Barredos ➔ El Entrego ➔ Valles de Bimenes', km: 11, bearingDeg: 345, elevGain: 110, avgGradePct: 1.8, endAlt: 340, coord: { lat: 43.330, lon: -5.580 } },
      { name: 'Bimenes ➔ Priandi ➔ Regreso a Nava Centro', km: 10, bearingDeg: 45, elevGain: 80, avgGradePct: -2.1, endAlt: 240, coord: { lat: 43.355, lon: -5.505 } }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 11. GRANDES PUERTOS, OCCIDENTE Y LITORAL (AMPLIACIÓN A 50 CLÁSICAS CIRCULARES)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'somiedo-farrapona-saliencia',
    name: 'Somiedo Mítico: Pola ➔ Alto de La Farrapona',
    subtitle: 'Coloso de La Vuelta entre brañas y lagos glaciales',
    startConcejo: 'somiedo',
    concejos: ['somiedo', 'teverga'],
    distanceKm: 54,
    elevationGainM: 1380,
    maxAltitudeM: 1708,
    difficulty: 'Muy Exigente (Categoría Especial)',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Salida desde Pola de Somiedo remontando el valle de Saliencia hasta coronar La Farrapona (1.708 m) con vistas panorámicas a los Lagos y descenso circular de regreso.',
    tramos: [
      { name: 'Pola de Somiedo ➔ Veigas ➔ Valle de Saliencia', km: 15, bearingDeg: 95, elevGain: 520, avgGradePct: 4.5, endAlt: 1120, coord: { lat: 43.070, lon: -6.140 } },
      { name: 'Saliencia ➔ Subida Final Alto de La Farrapona', km: 12, bearingDeg: 115, elevGain: 680, avgGradePct: 8.2, endAlt: 1708, coord: { lat: 43.058, lon: -6.085 } },
      { name: 'La Farrapona ➔ Descenso Técnico a Éndriga', km: 14, bearingDeg: 295, elevGain: 40, avgGradePct: -6.5, endAlt: 920, coord: { lat: 43.080, lon: -6.165 } },
      { name: 'La Riera ➔ Regreso por el Cañón a Pola de Somiedo', km: 13, bearingDeg: 280, elevGain: 140, avgGradePct: -1.8, endAlt: 700, coord: { lat: 43.091, lon: -6.257 } }
    ]
  },
  {
    id: 'quiros-gamoniteiru-aramo',
    name: 'El Coloso del Aramo: Bárzana ➔ Alto del Gamoniteiru',
    subtitle: 'Una de las ascensiones más duras de Europa en el corazón de Quirós',
    startConcejo: 'quiros',
    concejos: ['quiros', 'riosa', 'lena'],
    distanceKm: 46,
    elevationGainM: 1510,
    maxAltitudeM: 1772,
    difficulty: 'Extrema (Hors Catégorie)',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Salida de Bárzana de Quirós ascendiendo La Cobertoria antes de girar hacia el muro hormigonado del Gamoniteiru (1.772 m). Vértigo sobre los valles centrales y descenso circular a casa.',
    tramos: [
      { name: 'Bárzana de Quirós ➔ Alto de La Cobertoria', km: 10, bearingDeg: 90, elevGain: 680, avgGradePct: 7.4, endAlt: 1179, coord: { lat: 43.155, lon: -5.885 } },
      { name: 'Cobertoria ➔ Desvío y Muro del Gamoniteiru', km: 7, bearingDeg: 355, elevGain: 610, avgGradePct: 9.8, endAlt: 1772, coord: { lat: 43.190, lon: -5.890 } },
      { name: 'Descenso Gamoniteiru ➔ Cobertoria ➔ Pedroveya', km: 15, bearingDeg: 275, elevGain: 60, avgGradePct: -7.5, endAlt: 510, coord: { lat: 43.170, lon: -5.945 } },
      { name: 'Salcedo ➔ Embalse de Valdemurio ➔ Bárzana', km: 14, bearingDeg: 250, elevGain: 160, avgGradePct: 0.8, endAlt: 495, coord: { lat: 43.159, lon: -5.972 } }
    ]
  },
  {
    id: 'lena-alto-cubilla',
    name: 'El Balcón de Ubiña: Campomanes ➔ Alto de La Cubilla',
    subtitle: 'Puerto de montaña infinito con paisaje alpino de 28 km',
    startConcejo: 'lena',
    concejos: ['lena'],
    distanceKm: 60,
    elevationGainM: 1420,
    maxAltitudeM: 1683,
    difficulty: 'Muy Exigente',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Desde Campomanes remontando el río Huerna por Tuiza de Arriba entre praderías glaciares hasta coronar La Cubilla (1.683 m), con retorno limpio por el mismo valle.',
    tramos: [
      { name: 'Campomanes ➔ Sotiello ➔ Tuiza de Abajo', km: 16, bearingDeg: 205, elevGain: 560, avgGradePct: 3.8, endAlt: 920, coord: { lat: 43.060, lon: -5.880 } },
      { name: 'Tuiza ➔ Rampas Alpinas Alto de La Cubilla', km: 14, bearingDeg: 185, elevGain: 780, avgGradePct: 5.9, endAlt: 1683, coord: { lat: 43.005, lon: -5.915 } },
      { name: 'La Cubilla ➔ Descenso Panorámico a Ríos', km: 15, bearingDeg: 10, elevGain: 30, avgGradePct: -5.5, endAlt: 780, coord: { lat: 43.070, lon: -5.865 } },
      { name: 'Jomezana ➔ Vega del Huerna ➔ Campomanes', km: 15, bearingDeg: 25, elevGain: 50, avgGradePct: -2.4, endAlt: 375, coord: { lat: 43.135, lon: -5.830 } }
    ]
  },
  {
    id: 'cabrales-sotres-escarandi',
    name: 'Picos de Europa: Arenas ➔ Sotres & Jito de Escarandi',
    subtitle: 'Subida en el corazón calcáreo del Macizo Oriental',
    startConcejo: 'cabrales',
    concejos: ['cabrales', 'penamelleraalta'],
    distanceKm: 44,
    elevationGainM: 1260,
    maxAltitudeM: 1300,
    difficulty: 'Muy Exigente',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'De Arenas de Cabrales subiendo el cañón de Poncebos, herraduras hacia Sotres y puerto final hasta el Jito de Escarandi (1.300 m) frente a las cumbres de Urriellu.',
    tramos: [
      { name: 'Arenas de Cabrales ➔ Poncebos ➔ Tielve', km: 11, bearingDeg: 135, elevGain: 540, avgGradePct: 5.8, endAlt: 685, coord: { lat: 43.265, lon: -4.815 } },
      { name: 'Tielve ➔ Sotres ➔ Jito de Escarandi', km: 11, bearingDeg: 115, elevGain: 630, avgGradePct: 6.4, endAlt: 1300, coord: { lat: 43.218, lon: -4.715 } },
      { name: 'Escarandi ➔ Descenso Rápido a Poncebos', km: 12, bearingDeg: 305, elevGain: 30, avgGradePct: -7.8, endAlt: 215, coord: { lat: 43.255, lon: -4.825 } },
      { name: 'Poncebos ➔ Arroyo de las Arenas ➔ Arenas', km: 10, bearingDeg: 335, elevGain: 60, avgGradePct: -0.6, endAlt: 150, coord: { lat: 43.310, lon: -4.845 } }
    ]
  },
  {
    id: 'colunga-fito-lastres',
    name: 'Clásica del Oriente: Colunga ➔ Alto del Fito & Lastres',
    subtitle: 'Mar y montaña uniendo el mirador del Sueve con el puerto marinero',
    startConcejo: 'colunga',
    concejos: ['colunga', 'parres', 'caravia'],
    distanceKm: 44,
    elevationGainM: 860,
    maxAltitudeM: 590,
    difficulty: 'Exigente',
    profileType: 'Costa y Montaña',
    isCircular: true,
    description: 'Salida de Colunga encarando las rampas de la vertiente norte del Fito (590 m). Descenso hacia Arriondas y regreso costero por Caravia y Lastres hasta el centro.',
    tramos: [
      { name: 'Colunga ➔ Gobiendes ➔ Alto del Fito (Vertiente Norte)', km: 10, bearingDeg: 145, elevGain: 560, avgGradePct: 6.2, endAlt: 590, coord: { lat: 43.443, lon: -5.195 } },
      { name: 'Fito ➔ Bada ➔ Borde del Río Sella (Parres)', km: 12, bearingDeg: 110, elevGain: 40, avgGradePct: -4.2, endAlt: 90, coord: { lat: 43.400, lon: -5.165 } },
      { name: 'Arriondas ➔ Caravia Alta ➔ Playa de La Isla', km: 13, bearingDeg: 345, elevGain: 160, avgGradePct: 1.5, endAlt: 25, coord: { lat: 43.475, lon: -5.210 } },
      { name: 'Playa de La Griega ➔ Lastres ➔ Colunga', km: 9, bearingDeg: 265, elevGain: 100, avgGradePct: 1.2, endAlt: 35, coord: { lat: 43.495, lon: -5.275 } }
    ]
  },
  {
    id: 'cudillero-vidio-luina',
    name: 'Acantilados Pixuetos: Cudillero ➔ Vidio & Soto de Luiña',
    subtitle: 'Vistas oceánicas y repechos bravos del Occidente cercano',
    startConcejo: 'cudillero',
    concejos: ['cudillero', 'murosdenalon'],
    distanceKm: 40,
    elevationGainM: 640,
    maxAltitudeM: 280,
    difficulty: 'Media',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Desde El Pito hacia los acantilados de Oviñana y el faro de Cabo Vidio. Bucle interior por los bosques de San Martín de Luiña y retorno panorámico sobre Cudillero.',
    tramos: [
      { name: 'Cudillero ➔ La Magdalena ➔ Faro Cabo Vidio', km: 11, bearingDeg: 275, elevGain: 190, avgGradePct: 2.1, endAlt: 115, coord: { lat: 43.588, lon: -6.245 } },
      { name: 'Oviñana ➔ Soto de Luiña ➔ San Martín', km: 9, bearingDeg: 195, elevGain: 150, avgGradePct: 2.4, endAlt: 185, coord: { lat: 43.545, lon: -6.225 } },
      { name: 'Valles de Luiña ➔ Alto de La Peñona', km: 10, bearingDeg: 85, elevGain: 210, avgGradePct: 3.1, endAlt: 280, coord: { lat: 43.535, lon: -6.160 } },
      { name: 'La Peñona ➔ El Pito ➔ Puerto de Cudillero', km: 10, bearingDeg: 20, elevGain: 90, avgGradePct: -2.4, endAlt: 45, coord: { lat: 43.562, lon: -6.145 } }
    ]
  },
  {
    id: 'proaza-xanas-tenebredo',
    name: 'Valles del Oso: Proaza ➔ Tenebredo & Santo Adriano',
    subtitle: 'Subida clásica del concejo oso entre bosques y cañones',
    startConcejo: 'proaza',
    concejos: ['proaza', 'santoadriano', 'riberadearriba'],
    distanceKm: 42,
    elevationGainM: 880,
    maxAltitudeM: 525,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Salida de Proaza hacia Villanueva y coronación del duro Alto de Tenebredo. Bajada rápida al valle de Trubia y regreso por el desfiladero de Peñas Juntas.',
    tramos: [
      { name: 'Proaza ➔ Villanueva ➔ Inicio Tenebredo', km: 7, bearingDeg: 25, elevGain: 110, avgGradePct: 1.5, endAlt: 210, coord: { lat: 43.290, lon: -5.975 } },
      { name: 'Villanueva ➔ Rampas del Alto de Tenebredo', km: 8, bearingDeg: 35, elevGain: 340, avgGradePct: 7.1, endAlt: 525, coord: { lat: 43.310, lon: -5.950 } },
      { name: 'Tenebredo ➔ Tuñón ➔ Senda del Oso (Río Trubia)', km: 14, bearingDeg: 220, elevGain: 140, avgGradePct: -2.5, endAlt: 185, coord: { lat: 43.285, lon: -5.995 } },
      { name: 'Tuñón ➔ Caranga ➔ Regreso a Proaza Centro', km: 13, bearingDeg: 185, elevGain: 290, avgGradePct: 2.2, endAlt: 195, coord: { lat: 43.245, lon: -6.020 } }
    ]
  },
  {
    id: 'pilona-infiesto-sueve',
    name: 'Sueve Interior: Infiesto ➔ La Llama & La Pesanca',
    subtitle: 'Carreteras sin tráfico entre hórreos de Espinaréu y montañas',
    startConcejo: 'pilona',
    concejos: ['pilona', 'nava', 'parres'],
    distanceKm: 48,
    elevationGainM: 910,
    maxAltitudeM: 580,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'De Infiesto hacia Espinaréu y las laderas del río Infierno, enlazando después hacia el puerto de La Llama con vistas al Sueve y vuelta llana por Sevares.',
    tramos: [
      { name: 'Infiesto ➔ Río Infierno ➔ Área de La Pesanca', km: 13, bearingDeg: 165, elevGain: 320, avgGradePct: 3.1, endAlt: 440, coord: { lat: 43.285, lon: -5.325 } },
      { name: 'Espinaréu ➔ Alto de La Llama (Vertiente Sur)', km: 11, bearingDeg: 75, elevGain: 350, avgGradePct: 4.5, endAlt: 580, coord: { lat: 43.320, lon: -5.260 } },
      { name: 'La Llama ➔ Descenso a Sevares y Villamayor', km: 12, bearingDeg: 355, elevGain: 60, avgGradePct: -3.8, endAlt: 115, coord: { lat: 43.360, lon: -5.310 } },
      { name: 'Villamayor ➔ Vega del Piloña ➔ Infiesto', km: 12, bearingDeg: 265, elevGain: 180, avgGradePct: 1.5, endAlt: 145, coord: { lat: 43.349, lon: -5.365 } }
    ]
  },
  {
    id: 'caso-redes-puerto-tarna',
    name: 'Reserva de Redes: Campo de Caso ➔ Puerto de Tarna',
    subtitle: 'Ascensión monumental por hayedos centenarios del Nalón',
    startConcejo: 'caso',
    concejos: ['caso', 'sobrescobio', 'ponga'],
    distanceKm: 52,
    elevationGainM: 1160,
    maxAltitudeM: 1492,
    difficulty: 'Muy Exigente',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Desde Campo de Caso subiendo el trazado serpenteante de Bezanes y Tarna (1.492 m) bajo el Tiatordos. Retorno por el embalse de Tanes y Rioseco con paisaje puro de Redes.',
    tramos: [
      { name: 'El Campu ➔ Bezanes ➔ Desfiladero de Tarna', km: 14, bearingDeg: 120, elevGain: 540, avgGradePct: 4.5, endAlt: 1050, coord: { lat: 43.135, lon: -5.260 } },
      { name: 'Tarna Pueblo ➔ Rampas Finales Puerto de Tarna', km: 9, bearingDeg: 140, elevGain: 460, avgGradePct: 6.1, endAlt: 1492, coord: { lat: 43.092, lon: -5.205 } },
      { name: 'Puerto de Tarna ➔ Descenso Rápido a El Campu', km: 17, bearingDeg: 305, elevGain: 30, avgGradePct: -5.2, endAlt: 530, coord: { lat: 43.165, lon: -5.320 } },
      { name: 'Caleao / Tanes ➔ Orilla Embalse ➔ Campo de Caso', km: 12, bearingDeg: 135, elevGain: 130, avgGradePct: 1.2, endAlt: 535, coord: { lat: 43.185, lon: -5.385 } }
    ]
  },
  {
    id: 'ponga-collada-llomena-beyos',
    name: 'Cumbres de Ponga: Beleño ➔ Collada Llomena',
    subtitle: 'El puerto más fotogénico mirando de frente a Picos de Europa',
    startConcejo: 'ponga',
    concejos: ['ponga', 'amieva', 'cangasdeonis'],
    distanceKm: 38,
    elevationGainM: 1010,
    maxAltitudeM: 993,
    difficulty: 'Muy Exigente',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Bucle alpino desde San Juan de Beleño ascendiendo la mítica Collada Llomena (993 m) frente al macizo del Cornión y el pico Pierzu, bajando por Sobrefoz hacia el Sella.',
    tramos: [
      { name: 'San Juan de Beleño ➔ Collada Llomena', km: 10, bearingDeg: 25, elevGain: 510, avgGradePct: 6.2, endAlt: 993, coord: { lat: 43.225, lon: -5.145 } },
      { name: 'Collada Llomena ➔ Descenso a Puente Vidosa', km: 11, bearingDeg: 115, elevGain: 40, avgGradePct: -6.4, endAlt: 290, coord: { lat: 43.210, lon: -5.095 } },
      { name: 'Desfiladero Los Beyos ➔ Puente Huera ➔ Viego', km: 9, bearingDeg: 290, elevGain: 310, avgGradePct: 4.1, endAlt: 590, coord: { lat: 43.185, lon: -5.125 } },
      { name: 'Sobrefoz ➔ San Juan de Beleño Centro', km: 8, bearingDeg: 280, elevGain: 150, avgGradePct: 1.8, endAlt: 530, coord: { lat: 43.191, lon: -5.161 } }
    ]
  },
  {
    id: 'tineo-piedratecha-obona',
    name: 'Tierras Vaqueras: Tineo ➔ Alto de Piedratecha',
    subtitle: 'Puertos largos y soledad absoluta en el corazón del Occidente',
    startConcejo: 'tineo',
    concejos: ['tineo', 'salas', 'allande'],
    distanceKm: 50,
    elevationGainM: 1040,
    maxAltitudeM: 890,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'Salida desde Tineo enlazando el valle de Obona hasta las estribaciones de Piedratecha y Casa del Puerto, regresando por carreteras panorámicas sobre el Narcea.',
    tramos: [
      { name: 'Tineo ➔ Monasterio de Obona ➔ Mirallo', km: 12, bearingDeg: 265, elevGain: 290, avgGradePct: 3.2, endAlt: 680, coord: { lat: 43.340, lon: -6.505 } },
      { name: 'Mirallo ➔ Subida Alto de Piedratecha', km: 11, bearingDeg: 245, elevGain: 380, avgGradePct: 4.8, endAlt: 890, coord: { lat: 43.315, lon: -6.555 } },
      { name: 'Piedratecha ➔ Descenso a Navelgas y Gera', km: 14, bearingDeg: 40, elevGain: 90, avgGradePct: -3.5, endAlt: 380, coord: { lat: 43.395, lon: -6.520 } },
      { name: 'El Cruceru ➔ Regreso Llano a Tineo', km: 13, bearingDeg: 130, elevGain: 280, avgGradePct: 2.2, endAlt: 650, coord: { lat: 43.340, lon: -6.415 } }
    ]
  },
  {
    id: 'allande-puerto-palo',
    name: 'Camino Primitivo en Bici: Pola de Allande ➔ Puerto del Palo',
    subtitle: 'El histórico puerto jacobeo del Suroccidente',
    startConcejo: 'allande',
    concejos: ['allande', 'grandasdesalime', 'tineo'],
    distanceKm: 46,
    elevationGainM: 1120,
    maxAltitudeM: 1146,
    difficulty: 'Muy Exigente',
    profileType: 'Alta Montaña',
    isCircular: true,
    description: 'Desde Pola de Allande coronando el mítico Puerto del Palo (1.146 m) por la AS-14 entre pinares y brezos, rodeando Montefurado para descender de nuevo a Pola.',
    tramos: [
      { name: 'Pola de Allande ➔ La Reigada ➔ Puerto del Palo', km: 16, bearingDeg: 275, elevGain: 630, avgGradePct: 5.4, endAlt: 1146, coord: { lat: 43.268, lon: -6.695 } },
      { name: 'Alto del Palo ➔ Lagos ➔ Berducedo', km: 10, bearingDeg: 260, elevGain: 110, avgGradePct: -2.4, endAlt: 900, coord: { lat: 43.255, lon: -6.770 } },
      { name: 'Berducedo ➔ Descenso Panorámico a San Martín', km: 10, bearingDeg: 75, elevGain: 80, avgGradePct: -4.1, endAlt: 540, coord: { lat: 43.245, lon: -6.680 } },
      { name: 'Valle del Nisón ➔ Regreso a Pola de Allande', km: 10, bearingDeg: 45, elevGain: 300, avgGradePct: 3.0, endAlt: 520, coord: { lat: 43.273, lon: -6.611 } }
    ]
  },
  {
    id: 'tapia-penarronda-caridad',
    name: 'Costa del Eo-Navia: Tapia ➔ Penarronda & El Franco',
    subtitle: 'Rodadura rápida y ventosa junto al Cantábrico occidental',
    startConcejo: 'tapiadecasariego',
    concejos: ['tapiadecasariego', 'castropol', 'elfranco', 'coana'],
    distanceKm: 42,
    elevationGainM: 470,
    maxAltitudeM: 155,
    difficulty: 'Fácil / Media',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Circuito ideal para rodar rápido entre el puerto de Tapia de Casariego, las dunas de Penarronda, A Caridá y el puerto de Viavélez, con regreso costero limpio.',
    tramos: [
      { name: 'Tapia ➔ Playa de Penarronda ➔ Barres', km: 10, bearingDeg: 245, elevGain: 110, avgGradePct: 1.2, endAlt: 65, coord: { lat: 43.545, lon: -7.015 } },
      { name: 'Barres ➔ Tol ➔ Valles del Franco', km: 11, bearingDeg: 120, elevGain: 150, avgGradePct: 1.9, endAlt: 155, coord: { lat: 43.515, lon: -6.915 } },
      { name: 'A Caridá ➔ Puerto Marinero de Viavélez', km: 10, bearingDeg: 45, elevGain: 90, avgGradePct: -1.4, endAlt: 25, coord: { lat: 43.562, lon: -6.840 } },
      { name: 'Viavélez ➔ Porcía ➔ Regreso a Tapia de Casariego', km: 11, bearingDeg: 275, elevGain: 120, avgGradePct: 1.1, endAlt: 25, coord: { lat: 43.569, lon: -6.944 } }
    ]
  },
  {
    id: 'boal-arbon-illano',
    name: 'Cañón del Navia: Boal ➔ Embalse de Arbón & Illano',
    subtitle: 'Carretera escénica colgada sobre los embalses del río Navia',
    startConcejo: 'boal',
    concejos: ['boal', 'illano', 'coana', 'villayon'],
    distanceKm: 46,
    elevationGainM: 940,
    maxAltitudeM: 615,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'De Boal bajando al impresionante cañón de los embalses de Doiras y Arbón, rodeando las laderas de Illano y coronando Penouta para volver con grandes vistas.',
    tramos: [
      { name: 'Boal ➔ Mirador de Castrillón ➔ Presa de Doiras', km: 12, bearingDeg: 185, elevGain: 210, avgGradePct: -2.1, endAlt: 210, coord: { lat: 43.360, lon: -6.795 } },
      { name: 'Doiras ➔ Subida hacia Illano y Laderas del Navia', km: 12, bearingDeg: 215, elevGain: 430, avgGradePct: 4.5, endAlt: 615, coord: { lat: 43.335, lon: -6.865 } },
      { name: 'Illano ➔ Descenso hacia Arbón (Villayón)', km: 12, bearingDeg: 25, elevGain: 110, avgGradePct: -3.8, endAlt: 120, coord: { lat: 43.470, lon: -6.745 } },
      { name: 'Arbón ➔ Prelo ➔ Regreso en Ascenso a Boal', km: 10, bearingDeg: 225, elevGain: 190, avgGradePct: 3.1, endAlt: 450, coord: { lat: 43.431, lon: -6.816 } }
    ]
  },
  {
    id: 'ribadedeva-la-franca-bustio',
    name: 'Oriente Cantábrico: Colombres ➔ La Franca & Peñamellera',
    subtitle: 'Frontera verde de Asturias entre acantilados y desfiladeros',
    startConcejo: 'ribadedeva',
    concejos: ['ribadedeva', 'penamellerabaja', 'llanes'],
    distanceKm: 44,
    elevationGainM: 680,
    maxAltitudeM: 295,
    difficulty: 'Media',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Bucle pintoresco desde Colombres pasando por la playa de La Franca, Bustio y el valle del Deva hasta Panes para regresar coronando Pimiango.',
    tramos: [
      { name: 'Colombres ➔ Playa de La Franca ➔ Buelna', km: 11, bearingDeg: 280, elevGain: 160, avgGradePct: 1.5, endAlt: 75, coord: { lat: 43.395, lon: -4.605 } },
      { name: 'La Borbolla ➔ Siejo ➔ Valle Bajo de Panes', km: 12, bearingDeg: 145, elevGain: 240, avgGradePct: 2.2, endAlt: 135, coord: { lat: 43.325, lon: -4.585 } },
      { name: 'Panes ➔ Desfiladero del Deva ➔ Unquera / Bustio', km: 11, bearingDeg: 25, elevGain: 80, avgGradePct: -1.1, endAlt: 15, coord: { lat: 43.370, lon: -4.515 } },
      { name: 'Bustio ➔ Subida a Pimiango ➔ Colombres Centro', km: 10, bearingDeg: 270, elevGain: 200, avgGradePct: 3.2, endAlt: 125, coord: { lat: 43.377, lon: -4.538 } }
    ]
  },
  {
    id: 'salas-espina-cornellana',
    name: 'Puerta del Occidente: Salas ➔ La Espina & Cornellana',
    subtitle: 'El puerto clásico de unión hacia Tineo con bajada rápida al Narcea',
    startConcejo: 'salas',
    concejos: ['salas', 'grado', 'belmontedemiranda'],
    distanceKm: 42,
    elevationGainM: 760,
    maxAltitudeM: 650,
    difficulty: 'Exigente',
    profileType: 'Media Montaña',
    isCircular: true,
    description: 'De Salas ascendiendo por Bodenaya hasta el Alto de La Espina (650 m). Giro hacia Belmonte y Cornellana para volver remontando el río Nonaya hasta la villa.',
    tramos: [
      { name: 'Salas ➔ Bodenaya ➔ Alto de La Espina', km: 12, bearingDeg: 265, elevGain: 420, avgGradePct: 4.5, endAlt: 650, coord: { lat: 43.395, lon: -6.345 } },
      { name: 'La Espina ➔ Descenso hacia Soto de los Infantes', km: 10, bearingDeg: 135, elevGain: 50, avgGradePct: -4.8, endAlt: 120, coord: { lat: 43.360, lon: -6.225 } },
      { name: 'Soto ➔ Monasterio de Cornellana (Vega del Narcea)', km: 10, bearingDeg: 45, elevGain: 70, avgGradePct: -1.2, endAlt: 50, coord: { lat: 43.412, lon: -6.160 } },
      { name: 'Cornellana ➔ Subida Tendida del Nonaya ➔ Salas', km: 10, bearingDeg: 275, elevGain: 220, avgGradePct: 2.3, endAlt: 235, coord: { lat: 43.412, lon: -6.259 } }
    ]
  },
  {
    id: 'aviles-cabo-penas-salinas',
    name: 'Costa Avilesina: Avilés ➔ Cabo Peñas & Salinas',
    subtitle: 'Circuito llano-ondulado por la ría y la península de Gozón',
    startConcejo: 'aviles',
    concejos: ['aviles', 'gozon', 'carreno', 'castrillon'],
    distanceKm: 46,
    elevationGainM: 520,
    maxAltitudeM: 145,
    difficulty: 'Media',
    profileType: 'Costa / Rompepiernas',
    isCircular: true,
    description: 'Desde la Ría de Avilés y el Centro Niemeyer hacia Luanco y el Faro de Cabo Peñas. Vuelta por Bañugues, Verdicio y el arenal de Salinas cerrando el circuito urbano.',
    tramos: [
      { name: 'Avilés (Niemeyer) ➔ Zeluan ➔ Luanco', km: 14, bearingDeg: 35, elevGain: 160, avgGradePct: 1.5, endAlt: 35, coord: { lat: 43.615, lon: -5.790 } },
      { name: 'Luanco ➔ Faro de Cabo Peñas', km: 10, bearingDeg: 330, elevGain: 150, avgGradePct: 2.1, endAlt: 110, coord: { lat: 43.655, lon: -5.850 } },
      { name: 'Cabo Peñas ➔ Verdicio ➔ San Juan de Nieva', km: 12, bearingDeg: 230, elevGain: 140, avgGradePct: 1.6, endAlt: 20, coord: { lat: 43.585, lon: -5.935 } },
      { name: 'Salinas ➔ Raíces ➔ Regreso al Centro de Avilés', km: 10, bearingDeg: 135, elevGain: 70, avgGradePct: 0.9, endAlt: 15, coord: { lat: 43.558, lon: -5.921 } }
    ]
  },
  {
    id: 'parres-arriondas-fito-sella',
    name: 'Valles del Sella: Arriondas ➔ Fito & Ribadesella',
    subtitle: 'El triángulo dorado entre los picos del Sueve y el Cantábrico',
    startConcejo: 'parres',
    concejos: ['parres', 'colunga', 'caravia', 'ribadesella'],
    distanceKm: 48,
    elevationGainM: 860,
    maxAltitudeM: 590,
    difficulty: 'Exigente',
    profileType: 'Costa y Montaña',
    isCircular: true,
    description: 'Salida de Arriondas subiendo el clásico Alto del Fito (590 m) por su vertiente sur. Descenso a la costa de Caravia, rodeo por Ribadesella y vuelta plana paralela al río Sella.',
    tramos: [
      { name: 'Arriondas ➔ Bada ➔ Alto del Fito (Vertiente Sur)', km: 12, bearingDeg: 355, elevGain: 540, avgGradePct: 5.5, endAlt: 590, coord: { lat: 43.443, lon: -5.195 } },
      { name: 'Mirador del Fito ➔ Descenso a Arenal de Morís', km: 9, bearingDeg: 20, elevGain: 20, avgGradePct: -5.8, endAlt: 25, coord: { lat: 43.470, lon: -5.182 } },
      { name: 'Caravia ➔ Berbes ➔ Puerto de Ribadesella', km: 13, bearingDeg: 85, elevGain: 150, avgGradePct: 1.4, endAlt: 15, coord: { lat: 43.462, lon: -5.060 } },
      { name: 'Ribadesella ➔ Vega del Río Sella ➔ Arriondas', km: 14, bearingDeg: 225, elevGain: 150, avgGradePct: 1.0, endAlt: 45, coord: { lat: 43.386, lon: -5.184 } }
    ]
  }
];

/**
 * Obtiene las rutas ciclistas que parten de un concejo o discurren por él.
 */
export function getCyclingRoutesForConcejo(concejoId) {
  if (!concejoId) return CYCLING_ROUTES;
  const directMatches = CYCLING_ROUTES.filter(r => r.concejos.includes(concejoId) || r.startConcejo === concejoId);
  if (directMatches.length > 0) return directMatches;
  return CYCLING_ROUTES;
}

/**
 * Busca una ruta por su ID único
 */
export function getCyclingRouteById(routeId) {
  return CYCLING_ROUTES.find(r => r.id === routeId) || CYCLING_ROUTES[0];
}

/**
 * Obtiene la ficha técnica oficial, consejos de desarrollo y punto de salida GPS de una ruta ciclista
 */
export function getCyclingRouteExplanation(routeId) {
  const route = getCyclingRouteById(routeId);
  if (!route) return null;

  const firstTramo = route.tramos?.[0] || {};
  const startPlace = (firstTramo.name ? firstTramo.name.split('➔')[0].trim() : route.name);
  const startCoord = firstTramo.coord || { lat: 43.558, lon: -5.975 };
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(startPlace + ', Asturias')}`;
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${startCoord.lat},${startCoord.lon}`;
  const wikilocUrl = `https://es.wikiloc.com/rutas-ciclismo?q=${encodeURIComponent(route.name)}`;

  const tramosHtml = (route.tramos || []).map((t, i) => 
    `• <strong>Tramo ${i + 1} (${t.km} km):</strong> ${t.name} — Pendiente media: <strong>${t.avgGradePct > 0 ? '+' : ''}${t.avgGradePct}%</strong> (Cota: ${t.endAlt} m).`
  ).join('<br>');

  const gearAdvice = route.elevationGainM >= 1000
    ? 'Alta montaña asturiana: imprescindible desarrollo compacto (50/34 o equivalente) con piñonera 11-30 o 11-34 para afrontar rampas sostenidas sin clavar cadencia. Obligatorio chaleco cortavientos o manguitos para el descenso desde cota alta.'
    : route.elevationGainM >= 600
      ? 'Media montaña y terreno rompepiernas: recomendable plato compacto (50/34 o 52/36) con corona 28-32. Lleva cortavientos ligero para las bajadas sombrías y bidón con sales.'
      : 'Terreno rodador y costero: desarrollo estándar o compacto para repechos cortos a buen ritmo. Atención a las brisas marinas laterales si montas llantas de perfil medio/alto (>45 mm).';

  return {
    icon: '🚴',
    title: route.name,
    subtitle: `${route.subtitle} • ${route.difficulty}`,
    badge: `Circular • ${route.distanceKm} km • +${route.elevationGainM} m • Cota ${route.maxAltitudeM} m`,
    sections: [
      {
        icon: '🗺️',
        heading: 'Perfil del Trazado y Concepción Circular',
        text: `${route.description}<br><br><strong>Ficha Física:</strong> ${route.distanceKm} km totales • Desnivel positivo: +${route.elevationGainM} m • Altitud máxima: ${route.maxAltitudeM} m • Tipología: ${route.profileType} (100% circular con salida y regreso a casa).`
      },
      {
        icon: '⛰️',
        heading: 'Desglose de Sectores y Puertos de Paso',
        text: tramosHtml
      },
      {
        icon: '⚙️',
        heading: 'Desarrollo Recomendado y Seguridad Vial',
        text: `${gearAdvice}<br><br><strong>Seguridad DGT:</strong> Usa siempre luz trasera diurna de alta visibilidad (obligatoria en túneles y zonas de bosque o borrina) y casco homologado.`
      },
      {
        icon: '🚩',
        heading: 'Punto de Salida y Tracks GPS',
        text: `Salida de referencia: <strong>${startPlace}</strong>. Puedes abrir la navegación GPS hacia el inicio o consultar tracks de la comunidad ciclista:`,
        actionButtons: [
          {
            label: '🚗 Punto de Salida (Google Maps)',
            url: mapsSearchUrl
          },
          {
            label: '📍 Primer Sector GPS',
            url: mapsDirUrl
          },
          {
            label: '🧭 Tracks en Wikiloc ↗',
            url: wikilocUrl
          }
        ]
      }
    ]
  };
}
