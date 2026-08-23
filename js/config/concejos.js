/**
 * Catálogo de Concejos y Puntos de Interés Meteorológico de Asturias
 */
export const CONCEJOS_ASTURIAS = [
  // --- ZONAS COSTERAS ---
  {
    id: 'gijon',
    name: 'Gijón / Xixón',
    lat: 43.5357,
    lon: -5.6615,
    altitude: 10,
    type: 'coast',
    region: 'Costa Central',
    badge: '🌊 Costa / Playa de San Lorenzo',
    description: 'Capital marítima y mayor población de Asturias.'
  },
  {
    id: 'oviedo',
    name: 'Oviedo / Uviéu',
    lat: 43.3619,
    lon: -5.8494,
    altitude: 232,
    type: 'valley',
    region: 'Valles Centrales',
    badge: '🏛️ Capital del Principado',
    description: 'Corazón administrativo y cultural de Asturias.'
  },
  {
    id: 'aviles',
    name: 'Avilés',
    lat: 43.5547,
    lon: -5.9248,
    altitude: 15,
    type: 'coast',
    region: 'Costa Central',
    badge: '🚢 Ría y Centro Niemeyer',
    description: 'Tercera urbe asturiana con puerto y ría navegable.'
  },
  {
    id: 'castrillon',
    name: 'Castrillón (Salinas)',
    lat: 43.5786,
    lon: -5.9619,
    altitude: 8,
    type: 'coast',
    region: 'Costa Central',
    badge: '🏄 Surf / Playa de Salinas',
    description: 'Referente de olas y surf en el Cantábrico.'
  },
  {
    id: 'llanes',
    name: 'Llanes',
    lat: 43.4198,
    lon: -4.7549,
    altitude: 12,
    type: 'coast',
    region: 'Oriente Costero',
    badge: '🏖️ Playas y Bufones de Pría',
    description: 'Costa oriental con acantilados y playas de postal.'
  },
  {
    id: 'ribadesella',
    name: 'Ribadesella / Ribeseya',
    lat: 43.4611,
    lon: -5.0615,
    altitude: 6,
    type: 'coast',
    region: 'Oriente Costero',
    badge: '🛶 Desembocadura del Sella',
    description: 'Punto final del emblemático Descenso del Sella.'
  },
  {
    id: 'villaviciosa',
    name: 'Villaviciosa (Tazones / Rodiles)',
    lat: 43.4813,
    lon: -5.4357,
    altitude: 10,
    type: 'coast',
    region: 'Costa Centro-Oriente',
    badge: '🍏 Capital Manzanera / Ría',
    description: 'Reserva Natural Parcial y cuna de la sidra.'
  },
  {
    id: 'cudillero',
    name: 'Cudillero / Cuideiru',
    lat: 43.5631,
    lon: -6.1458,
    altitude: 18,
    type: 'coast',
    region: 'Costa Occidental',
    badge: '🐟 Villa Marinera Pintoresca',
    description: 'Anfiteatro marinero de casitas de colores.'
  },
  {
    id: 'valdes',
    name: 'Valdés (Luarca / Lluarca)',
    lat: 43.5422,
    lon: -6.5358,
    altitude: 15,
    type: 'coast',
    region: 'Costa Occidental',
    badge: '⚓ La Villa Blanca de la Costa Verde',
    description: 'Puerto pesquero histórico y faro del occidente.'
  },
  {
    id: 'navia',
    name: 'Navia (Puerto de Vega)',
    lat: 43.5414,
    lon: -6.7214,
    altitude: 14,
    type: 'coast',
    region: 'Costa Occidental',
    badge: '🌊 Ría del Navia y Costa',
    description: 'Dinámico polo marítimo e industrial del noroccidente.'
  },
  {
    id: 'tapiadecasariego',
    name: 'Tapia de Casariego',
    lat: 43.5694,
    lon: -6.9442,
    altitude: 20,
    type: 'coast',
    region: 'Costa Noroccidental',
    badge: '🏄 Surf de Grandes Olas / Puerto',
    description: 'Frontera con Galicia y meca del surf cantábrico.'
  },

  // --- VALLES Y CENTRO DE ASTURIAS ---
  {
    id: 'siero',
    name: 'Siero (Pola de Siero / Lugones)',
    lat: 43.3925,
    lon: -5.6606,
    altitude: 215,
    type: 'valley',
    region: 'Valles Centrales',
    badge: '🛍️ Centro de Asturias',
    description: 'Corazón metropolitano y cruce de comunicaciones.'
  },
  {
    id: 'langreo',
    name: 'Langreo / Llangréu',
    lat: 43.2981,
    lon: -5.6833,
    altitude: 220,
    type: 'valley',
    region: 'Cuencas Mineras (Nalón)',
    badge: '🏭 Valle del Nalón',
    description: 'Epicentro del patrimonio industrial y minero.'
  },
  {
    id: 'mieres',
    name: 'Mieres',
    lat: 43.2503,
    lon: -5.7761,
    altitude: 210,
    type: 'valley',
    region: 'Cuencas Mineras (Caudal)',
    badge: '⛏️ Valle del Caudal',
    description: 'Puerta de entrada natural a los puertos de montaña.'
  },
  {
    id: 'cangasdelnarcea',
    name: 'Cangas del Narcea',
    lat: 43.1783,
    lon: -6.5494,
    altitude: 376,
    type: 'valley',
    region: 'Suroccidente',
    badge: '🍇 Vino de Cangas / Muniellos',
    description: 'Mayor concejo asturiano, viñedos de alta montaña y robledales.'
  },
  {
    id: 'tineo',
    name: 'Tineo / Tineu',
    lat: 43.3364,
    lon: -6.4111,
    altitude: 652,
    type: 'valley',
    region: 'Occidente Interior',
    badge: '🥾 Camino Primitivo de Santiago',
    description: 'Tierras altas ganaderas y de tradición jacobea.'
  },
  {
    id: 'cangasdeonis',
    name: 'Cangas de Onís',
    lat: 43.3503,
    lon: -5.1278,
    altitude: 87,
    type: 'valley',
    region: 'Oriente',
    badge: '👑 Primera Capital / Puente Romano',
    description: 'Puerta histórica a Picos de Europa y Covadonga.'
  },
  {
    id: 'infiesto',
    name: 'Piloña (Infiesto / Sueve)',
    lat: 43.3486,
    lon: -5.3644,
    altitude: 154,
    type: 'valley',
    region: 'Oriente Interior',
    badge: '🌲 Santuario de la Cueva / Sierra del Sueve',
    description: 'Bosques frondosos y hábitat del mítico caballo Asturcón.'
  },

  // --- MONTAÑA Y CORDILLERA CANTÁBRICA ---
  {
    id: 'sotres',
    name: 'Picos de Europa (Sotres / Cabrales)',
    lat: 43.2289,
    lon: -4.7506,
    altitude: 1050,
    type: 'mountain',
    region: 'Picos de Europa',
    badge: '🏔️ Pueblo más Alto de Asturias (1.050 m)',
    description: 'Punto de partida hacia el Picu Urriellu / Naranjo de Bulnes.'
  },
  {
    id: 'covadonga_lagos',
    name: 'Lagos de Covadonga (Enol y Ercina)',
    lat: 43.2725,
    lon: -4.9867,
    altitude: 1134,
    type: 'mountain',
    region: 'Picos de Europa',
    badge: '🏞️ Alta Montaña / Lagos Glaciares (1.134 m)',
    description: 'Paraje icónico en el Macizo Occidental de Picos de Europa.'
  },
  {
    id: 'pajares',
    name: 'Valgrande-Pajares (Estación de Esquí)',
    lat: 42.9928,
    lon: -5.7633,
    altitude: 1480,
    type: 'mountain',
    region: 'Cordillera Cantábrica',
    badge: '⛷️ Estación Invernal Pajares (1.480 m)',
    description: 'Paso histórico cordillerano y estación de esquí decana.'
  },
  {
    id: 'fuentesdeinvierno',
    name: 'Fuentes de Invierno / San Isidro (Aller)',
    lat: 43.0642,
    lon: -5.3942,
    altitude: 1500,
    type: 'mountain',
    region: 'Cordillera Cantábrica',
    badge: '🎿 Estación de Esquí Fuentes de Invierno (1.500 m)',
    description: 'Cumbres nevadas y pistas de esquí en el valle de Aller.'
  },
  {
    id: 'somiedo',
    name: 'Pola de Somiedo (Parque Natural)',
    lat: 43.0906,
    lon: -6.2575,
    altitude: 700,
    type: 'mountain',
    region: 'Cordillera Cantábrica',
    badge: '🐻 Brañas, Teitos y Osos',
    description: 'Reserva de la Biosfera con lagos glaciares y pastos de altura.'
  },
  {
    id: 'redes',
    name: 'Parque Natural de Redes (Caso / Sobrescobio)',
    lat: 43.1811,
    lon: -5.3375,
    altitude: 575,
    type: 'mountain',
    region: 'Cordillera Cantábrica',
    badge: '💧 Nacimiento del Nalón / Hayedos',
    description: 'Paraíso de bosques centenarios, cascadas y embalses.'
  }
];

export const DEFAULT_CONCEJO_ID = 'gijon';

export function getConcejoById(id) {
  return CONCEJOS_ASTURIAS.find(c => c.id === id) || CONCEJOS_ASTURIAS[0];
}

export function searchConcejos(query) {
  if (!query) return CONCEJOS_ASTURIAS;
  const q = query.toLowerCase().trim();
  return CONCEJOS_ASTURIAS.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.region.toLowerCase().includes(q) ||
    c.badge.toLowerCase().includes(q)
  );
}

export function findClosestConcejo(lat, lon) {
  let closest = CONCEJOS_ASTURIAS[0];
  let minDist = Infinity;

  CONCEJOS_ASTURIAS.forEach(c => {
    const d = Math.hypot(c.lat - lat, c.lon - lon);
    if (d < minDist) {
      minDist = d;
      closest = c;
    }
  });

  return closest;
}