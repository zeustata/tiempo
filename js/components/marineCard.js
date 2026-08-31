import { getWindDirection } from '../utils/weatherIcons.js?v=1.0.69';
import { 
  getMoonAndTideInfo, 
  getDailyTideEvents, 
  getRealtimeTideStatus, 
  getWeeklyTides, 
  renderTideSvgGraph 
} from '../utils/tides.js?v=1.0.69';

/**
 * Base de datos exhaustiva y profesional de playas, picos de surf y fondos marinos de Asturias
 * Incluye orientación real de costa (azimut de apertura al mar) para cálculo aerodinámico Offshore/Onshore
 */
export const PLAYAS_POR_CONCEJO = {
  'gijon': {
    name: 'Gijón / Xixón',
    region: 'Costa Central',
    playas: [
      { 
        name: 'Playa de San Lorenzo', 
        type: 'Surf clásico asturiano, escaleras 1 a 15 y paseo del Muro', 
        tag: 'Surf Top',
        facing: 'N',
        facingDeg: 355,
        picos: 'Escalera 4 (Pared) • Escalera 10 (Piles) • El Peñón',
        bottom: '🏖️ Arena (Beach Break)',
        waveType: '↔️ Picos A-Frame (Izquierda y Derecha)',
        bestTide: 'Media Marea a Pleamar',
        surfLevel: 'Todos los niveles'
      },
      { 
        name: 'Playa de Peñarrubia', 
        type: 'Acantilados imponentes y rompiente mítica sobre losa', 
        tag: 'Surf Avanzado',
        facing: 'NNE',
        facingDeg: 25,
        picos: 'El Mongol (derecha tubular potente sobre roca)',
        bottom: '🪨 Roca / Losa (Point & Reef Break)',
        waveType: '➡️ Derecha potente y rápida',
        bestTide: 'Pleamar / Coeficiente vivo',
        surfLevel: 'Avanzado - Experto'
      },
      { 
        name: 'Playa de Poniente', 
        type: 'Aguas tranquilas, puerto deportivo y arena dorada', 
        tag: 'Familiar & SUP',
        facing: 'NE',
        facingDeg: 45,
        picos: 'Aguas calmas resguardadas por el dique',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Sin rompiente (Aguas mansas)',
        bestTide: 'Todas las mareas',
        surfLevel: 'Paddle Surf / Baño'
      },
      { 
        name: 'Playa del Arbeyal', 
        type: 'Playa resguardada en La Calzada con vistas al Musel', 
        tag: 'Tranquila',
        facing: 'E',
        facingDeg: 90,
        picos: 'Ensenada protegida',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Sin rompiente',
        bestTide: 'Todas las mareas',
        surfLevel: 'Baño y Paseo'
      },
      { 
        name: 'Playa de Estaño', 
        type: 'Cala con encanto, pozo natural de marea del Cura y chiringuito', 
        tag: 'Cala & Snorkel',
        facing: 'NNE',
        facingDeg: 20,
        picos: 'Rompiente exterior en marea viva',
        bottom: '🪨🏖️ Mixto (Arena y Rocas)',
        waveType: '↔️ Picos cortos',
        bestTide: 'Media Marea',
        surfLevel: 'Snorkel / Baño'
      },
      { 
        name: 'Playa de Serín', 
        type: 'Cala virgen entre altos acantilados salvajes', 
        tag: 'Salvaje',
        facing: 'N',
        facingDeg: 355,
        picos: 'Picos de mar abierto',
        bottom: '🪨 Cantos rodados y roca',
        waveType: '↔️ Olas orilleras',
        bestTide: 'Media Marea',
        surfLevel: 'Naturaleza & Baño'
      }
    ]
  },
  'castrillon': {
    name: 'Castrillón',
    region: 'Costa Central',
    playas: [
      { 
        name: 'Playa de Salinas', 
        type: 'Meca del surf asturiano, festival internacional de Longboard y gran paseo', 
        tag: 'Surf Top Mundial',
        facing: 'N',
        facingDeg: 350,
        picos: 'El Balneario • Las Dunas centrales • El Espartal',
        bottom: '🏖️ Arena (Beach Break constante)',
        waveType: '↔️ Múltiples Picos (Izquierdas y Derechas)',
        bestTide: 'Todas las mareas (óptimo media subiendo)',
        surfLevel: 'Iniciación a Experto'
      },
      { 
        name: 'Playa de San Juan de Nieva', 
        type: 'Potente rompiente de olas en la entrada de la ría de Avilés', 
        tag: 'Surf Potente',
        facing: 'NW',
        facingDeg: 320,
        picos: 'Picos del Espigón de San Juan',
        bottom: '🏖️ Arena (Barras de ría)',
        waveType: '↔️ Derechas e Izquierdas rápidas y tubulares',
        bestTide: 'Media Marea',
        surfLevel: 'Intermedio a Pro'
      },
      { 
        name: 'Playa de Bayas / El Sablón', 
        type: 'Monumento Natural: el arenal virgen más largo de Asturias con dunas salvajes', 
        tag: 'Monumento Natural',
        facing: 'NW',
        facingDeg: 325,
        picos: 'Picos abiertos frente a la Isla de Deva',
        bottom: '🏖️ Arena dorada',
        waveType: '↔️ Olas con mucha fuerza de mar abierto',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Intermedio'
      },
      { 
        name: 'Playa de Arnao', 
        type: 'Piscina natural fósil arrecifal y Museo de la Mina a pie de mar', 
        tag: 'Geológica & Familiar',
        facing: 'N',
        facingDeg: 355,
        picos: 'Piscina marina entre arrecifes fósiles',
        bottom: '🪨 Arrecife fósil y arena',
        waveType: '🚫 Protegida del oleaje',
        bestTide: 'Media a Bajamar',
        surfLevel: 'Baño y Geología'
      },
      { 
        name: 'Santa María del Mar', 
        type: 'Cala protegida con islote rocoso y desembocadura fluvial', 
        tag: 'Familiar',
        facing: 'NW',
        facingDeg: 330,
        picos: 'Pico abrigado del islote',
        bottom: '🏖️ Arena y cantos',
        waveType: '↔️ Olas suaves',
        bestTide: 'Media Marea',
        surfLevel: 'Iniciación / Baño'
      }
    ]
  },
  'villaviciosa': {
    name: 'Villaviciosa',
    region: 'Costa Oriental',
    playas: [
      { 
        name: 'Playa de Rodiles', 
        type: 'La mítica "Barra de Rodiles", una de las mejores izquierdas tubulares de Europa', 
        tag: 'Surf Top Mundial',
        facing: 'NNW',
        facingDeg: 335,
        picos: 'La Barra (izq. tubular de ría) • Picos del Arenal y Pinar',
        bottom: '🏖️ Arena sobre barra de ría (Beach Break)',
        waveType: '⬅️ Izquierda perfecta, tubular y kilométrica',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Avanzado - Pro (La Barra) / Todos (Arenal)'
      },
      { 
        name: 'Playa del Puntal', 
        type: 'Aguas mansas y resguardadas en la Ría de Villaviciosa con pineda', 
        tag: 'Ría & SUP',
        facing: 'WNW',
        facingDeg: 290,
        picos: 'Estuario en calma',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Sin oleaje',
        bestTide: 'Pleamar',
        surfLevel: 'Paddle Surf / Kayak'
      },
      { 
        name: 'Playa de Merón', 
        type: 'Cala virgen entre acantilados jurásicos con icnitas', 
        tag: 'Salvaje & Surf',
        facing: 'N',
        facingDeg: 0,
        picos: 'Picos centrales del pedrero',
        bottom: '🪨🏖️ Mixto (Arena y Rocas)',
        waveType: '↔️ Izquierdas y Derechas de mar abierto',
        bestTide: 'Media Marea',
        surfLevel: 'Intermedio'
      },
      { 
        name: 'Playa de Tazones', 
        type: 'Junto al emblemático puerto marinero con huellas de dinosaurio', 
        tag: 'Marinera',
        facing: 'NE',
        facingDeg: 45,
        picos: 'Pequeña ensenada de cantos',
        bottom: '🪨 Losa y cantos',
        waveType: '🚫 Mar abrigada',
        bestTide: 'Media a Pleamar',
        surfLevel: 'Turismo & Gastronomía'
      }
    ]
  },
  'gozon': {
    name: 'Gozón (Luanco)',
    region: 'Cabo Peñas',
    playas: [
      { 
        name: 'Playa de Xagó', 
        type: 'Extenso arenal con dunas eólicas protegidas y máxima consistencia de olas', 
        tag: 'Surf Muy Consistente',
        facing: 'WNW',
        facingDeg: 295,
        picos: 'El Escamplero (extremo este) • Picos de la Gran Duna',
        bottom: '🏖️ Arena (Beach Break potente)',
        waveType: '↔️ Picos A-Frame consistentes todo el año',
        bestTide: 'Bajamar a Media Marea',
        surfLevel: 'Iniciación a Intermedio'
      },
      { 
        name: 'Playa de Verdicio (Tenrero)', 
        type: 'Olas consistentes de mar abierto cerca de Peñas con dunas', 
        tag: 'Surf & Paisaje',
        facing: 'NNW',
        facingDeg: 340,
        picos: 'La Izquierda de la Punta • Rompiente central',
        bottom: '🪨🏖️ Mixto (Arena y Laja rocosa)',
        waveType: '↔️ Olas rápidas con fuerza',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Intermedio a Experto'
      },
      { 
        name: 'Playa de Luanco', 
        type: 'Arenal histórico urbano junto al muelle y el Museo Marítimo', 
        tag: 'Familiar & Urbana',
        facing: 'ESE',
        facingDeg: 110,
        picos: 'Aguas calmas abrigadas',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Sin olas',
        bestTide: 'Todas las mareas',
        surfLevel: 'Baño y Familias'
      },
      { 
        name: 'Playa de Bañugues', 
        type: 'Ensenada somera sin olas, fósiles y mar calma protegida del oleaje', 
        tag: 'Familiar',
        facing: 'NE',
        facingDeg: 45,
        picos: 'Aguas someras en ensenada',
        bottom: '🏖️ Arena y fango',
        waveType: '🚫 Sin oleaje',
        bestTide: 'Pleamar',
        surfLevel: 'Ideal niños pequeños'
      }
    ]
  },
  'ribadesella': {
    name: 'Ribadesella',
    region: 'Costa Oriental',
    playas: [
      { 
        name: 'Playa de Santa Marina', 
        type: 'Arenal aristocrático con palacetes indianos y desembocadura del Sella', 
        tag: 'Urbana & Surf',
        facing: 'NNE',
        facingDeg: 15,
        picos: 'Pico del Muro (Oeste) • Desembocadura de la ría del Sella',
        bottom: '🏖️ Arena (Beach Break)',
        waveType: '↔️ Picos protegidos con temporales de mar grande',
        bestTide: 'Media Marea a Pleamar',
        surfLevel: 'Iniciación y Longboard'
      },
      { 
        name: 'Playa de Vega', 
        type: 'Monumento Natural: arenal salvaje con dunas, desfiladero y surf potente', 
        tag: 'Monumento Natural',
        facing: 'NNW',
        facingDeg: 340,
        picos: 'Pico del Río (Centro) • Rompiente del Extremo Oeste',
        bottom: '🪨🏖️ Mixto (Arena con lajas y cantos)',
        waveType: '↔️ Olas huecas y con mucha fuerza',
        bestTide: 'Media Marea',
        surfLevel: 'Intermedio a Pro'
      },
      { 
        name: 'Playa de Guadamía', 
        type: 'Espectacular fiordo kárstico natural entre acantilados y bufones', 
        tag: 'Fiordo & Paisaje',
        facing: 'N',
        facingDeg: 0,
        picos: 'Piscina natural en marea alta',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Calma interior',
        bestTide: 'Pleamar',
        surfLevel: 'Baño & Kayak'
      }
    ]
  },
  'tapia': {
    name: 'Tapia de Casariego',
    region: 'Costa Occidental',
    playas: [
      { 
        name: 'Playa de La Grande', 
        type: 'Cuna histórica del surf en Asturias y sede del Memorial Peter Gulley', 
        tag: 'Surf Mítico',
        facing: 'N',
        facingDeg: 350,
        picos: 'La Grande • La Muralla • Los Campos',
        bottom: '🪨🏖️ Mixto (Losa rocosa y arena)',
        waveType: '↔️ Izquierdas y Derechas tubulares y rápidas',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Todos los niveles'
      },
      { 
        name: 'Playa del Murallón', 
        type: 'Piscina marina de agua salada encajada en las rocas del muelle', 
        tag: 'Piscina Salada',
        facing: 'NNE',
        facingDeg: 20,
        picos: 'Piscina natural protegida',
        bottom: '🪨 Roca',
        waveType: '🚫 Sin olas',
        bestTide: 'Media a Pleamar',
        surfLevel: 'Baño y Relax'
      },
      { 
        name: 'Playa de Serantes', 
        type: 'Desembocadura de río y arenal tranquilo de aguas limpias', 
        tag: 'Natural',
        facing: 'N',
        facingDeg: 355,
        picos: 'Rompiente de desembocadura',
        bottom: '🏖️ Arena fina',
        waveType: '↔️ Picos suaves',
        bestTide: 'Media Marea',
        surfLevel: 'Iniciación / Baño'
      }
    ]
  },
  'llanes': {
    name: 'Llanes',
    region: 'Costa Oriental',
    playas: [
      { 
        name: 'Playa de San Antolín', 
        type: 'Extenso arenal abierto de mar Cantábrico con desembocadura del Bedón', 
        tag: 'Surf & Paisaje',
        facing: 'N',
        facingDeg: 355,
        picos: 'Picos del Río Bedón • Centro del arenal',
        bottom: '🏖️ Arena y cantos',
        waveType: '↔️ Olas orilleras rápidas y potentes',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Intermedio a Experto'
      },
      { 
        name: 'Playa de Andrín', 
        type: 'Concha de arena salvaje encajada entre acantilados y corrientes', 
        tag: 'Surf Potente',
        facing: 'NNE',
        facingDeg: 20,
        picos: 'Pico de la Punta de Andrín',
        bottom: '🏖️ Arena (Fuerte desnivel)',
        waveType: '↔️ Rompiente orillera potente (Shorebreak)',
        bestTide: 'Media Marea',
        surfLevel: 'Experto'
      },
      { 
        name: 'Playa de Torimbia', 
        type: 'Monumento Paisajístico virgen protegida de postal y tradición naturista', 
        tag: 'Top Paisaje',
        facing: 'N',
        facingDeg: 0,
        picos: 'Rompiente en concha',
        bottom: '🏖️ Arena dorada',
        waveType: '↔️ Olas de mar abierto',
        bestTide: 'Media Marea',
        surfLevel: 'Baño & Paisaje'
      },
      { 
        name: 'Playa de Gulpiyuri', 
        type: 'Monumento Natural único: playa de mar sin costa abierta en medio de un prado', 
        tag: 'Monumento Natural',
        facing: 'N',
        facingDeg: 0,
        picos: 'Aguas filtradas bajo los acantilados',
        bottom: '🏖️ Arena blanca',
        waveType: '🚫 Sin olas (Piscina interior)',
        bestTide: 'Pleamar',
        surfLevel: 'Visita Geológica'
      },
      { 
        name: 'Playa de Barro', 
        type: 'Aguas cristalinas turquesas y arena fina abrigada de los vientos', 
        tag: 'Familiar Top',
        facing: 'NE',
        facingDeg: 35,
        picos: 'Bahía abrigada por islotes',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Aguas mansas',
        bestTide: 'Todas las mareas',
        surfLevel: 'Baño en familia'
      },
      { 
        name: 'Playa de Cuevas del Mar', 
        type: 'Arcos gigantes de roca kárstica horadados por el Cantábrico', 
        tag: 'Fotogénica',
        facing: 'N',
        facingDeg: 355,
        picos: 'Ensenada de cuevas',
        bottom: '🏖️ Arena y roca',
        waveType: '↔️ Olas suaves',
        bestTide: 'Bajamar (recorrer cuevas)',
        surfLevel: 'Baño & Fotografía'
      }
    ]
  },
  'caravia': {
    name: 'Caravia',
    region: 'Costa Oriental',
    playas: [
      { 
        name: 'Playa de La Espasa', 
        type: 'Gran arenal abierto con vistas panorámicas a la Sierra del Sueve', 
        tag: 'Surf & Paisaje',
        facing: 'N',
        facingDeg: 355,
        picos: 'Picos de la Ría del Espasa • Centro',
        bottom: '🏖️ Arena (Beach Break)',
        waveType: '↔️ Izquierdas y Derechas maniobrables',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Iniciación e Intermedio'
      },
      { 
        name: 'Arenal de Morís', 
        type: 'Extenso arenal con senda costera, acantilados y olas constantes', 
        tag: 'Surf Constante',
        facing: 'N',
        facingDeg: 350,
        picos: 'Pico de la Punta Este • Rompiente central',
        bottom: '🏖️ Arena dorada',
        waveType: '↔️ Olas con buena pared',
        bestTide: 'Media Marea',
        surfLevel: 'Todos los niveles'
      }
    ]
  },
  'soto-del-barco': {
    name: 'Soto del Barco',
    region: 'Costa Central',
    playas: [
      { 
        name: 'Playa de los Quebrantos', 
        type: 'Arenal en la desembocadura de la ría del Nalón unido a San Juan de la Arena', 
        tag: 'Surf & Dunas',
        facing: 'NW',
        facingDeg: 315,
        picos: 'La Barra del Nalón • Picos de dunas',
        bottom: '🏖️ Arena (Barra fluvial y marina)',
        waveType: '↔️ Derechas e Izquierdas rápidas',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Iniciación a Intermedio'
      }
    ]
  },
  'valdes': {
    name: 'Valdés (Luarca)',
    region: 'Costa Occidental',
    playas: [
      { 
        name: 'Playa de Otur', 
        type: 'Arenal amplio con dunas y oleaje limpio muy frecuentado por surfistas', 
        tag: 'Surf Occidental',
        facing: 'N',
        facingDeg: 355,
        picos: 'Picos centrales del arenal de Otur',
        bottom: '🏖️ Arena fina',
        waveType: '↔️ Picos limpios y ordenados',
        bestTide: 'Media Marea',
        surfLevel: 'Iniciación a Intermedio'
      },
      { 
        name: 'Playa de Cueva', 
        type: 'Desembocadura del río Esva encajada entre altos acantilados', 
        tag: 'Paisaje & Surf',
        facing: 'NW',
        facingDeg: 320,
        picos: 'Picos de la desembocadura del Esva',
        bottom: '🪨🏖️ Mixto (Cantos y arena)',
        waveType: '↔️ Olas de mar abierto',
        bestTide: 'Media Marea',
        surfLevel: 'Intermedio'
      },
      { 
        name: 'Playas de Luarca (1ª y 2ª)', 
        type: 'Aguas calmas y protegidas por el espigón blanco del puerto', 
        tag: 'Familiar',
        facing: 'NNE',
        facingDeg: 25,
        picos: 'Concha urbana abrigada',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Calma',
        bestTide: 'Todas las mareas',
        surfLevel: 'Baño y Paseo'
      }
    ]
  },
  'navia': {
    name: 'Navia',
    region: 'Costa Occidental',
    playas: [
      { 
        name: 'Playa de Frejulfe', 
        type: 'Monumento Natural: imponente arenal virgen con pinar y potentes tubos', 
        tag: 'Monumento Natural & Surf',
        facing: 'NNW',
        facingDeg: 340,
        picos: 'Pico del Río Frejulfe • Rompiente Este',
        bottom: '🪨🏖️ Mixto (Arena y losas)',
        waveType: '↔️ Olas muy potentes, tubulares y rápidas',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Intermedio a Pro'
      },
      { 
        name: 'Playa de Navia', 
        type: 'Amplio arenal con pinar, ría y gran parque recreativo', 
        tag: 'Familiar & Ría',
        facing: 'N',
        facingDeg: 0,
        picos: 'Picos de la barra de Navia',
        bottom: '🏖️ Arena dorada',
        waveType: '↔️ Olas suaves',
        bestTide: 'Media Marea',
        surfLevel: 'Iniciación / Baño'
      }
    ]
  },
  'colunga': {
    name: 'Colunga',
    region: 'Costa Oriental',
    playas: [
      { 
        name: 'Playa de La Isla', 
        type: 'Amplio arenal con islote rocoso accesible a pie en bajamar', 
        tag: 'Familiar & Paseo',
        facing: 'N',
        facingDeg: 0,
        picos: 'Ensenada abrigada por el islote',
        bottom: '🏖️ Arena dorada',
        waveType: '↔️ Olas suaves en pleamar',
        bestTide: 'Todas las mareas',
        surfLevel: 'Baño y Familias'
      },
      { 
        name: 'Playa de La Griega', 
        type: 'Icnitas de dinosaurios saurópodos gigantes y desembocadura del Libardón', 
        tag: 'Jurásica',
        facing: 'NNE',
        facingDeg: 25,
        picos: 'Picos suaves junto al río',
        bottom: '🏖️ Arena y losas jurásicas',
        waveType: '↔️ Rompiente suave',
        bestTide: 'Media Marea',
        surfLevel: 'Cultura & Baño'
      },
      { 
        name: 'Playa de Lastres', 
        type: 'Arenal bajo el emblemático pueblo marinero escalonado', 
        tag: 'Marinera',
        facing: 'E',
        facingDeg: 90,
        picos: 'Concha resguardada por el muelle',
        bottom: '🏖️ Arena y grava',
        waveType: '🚫 Mar tranquila',
        bestTide: 'Media a Pleamar',
        surfLevel: 'Turismo & Baño'
      }
    ]
  },
  'cudillero': {
    name: 'Cudillero',
    region: 'Costa Occidental',
    playas: [
      { 
        name: 'Playa del Silencio (El Gavieru)', 
        type: 'Anfiteatro rocoso único de aguas cristalinas esmeralda', 
        tag: 'Top Paisaje',
        facing: 'NE',
        facingDeg: 45,
        picos: 'Aguas cristalinas abrigadas por acantilados',
        bottom: '🪨 Cantos rodados y roca viva',
        waveType: '🚫 Calma (Poco oleaje)',
        bestTide: 'Media a Bajamar',
        surfLevel: 'Snorkel y Paisaje'
      },
      { 
        name: 'Concha de Artedo', 
        type: 'Gran bahía protegida de cantos rodados, arena y pasarela sobre marisma', 
        tag: 'Protegida & Familiar',
        facing: 'ENE',
        facingDeg: 65,
        picos: 'Gran concha semicircular',
        bottom: '🪨🏖️ Cantos y arena',
        waveType: '↔️ Olas suaves',
        bestTide: 'Media a Pleamar',
        surfLevel: 'Baño y Gastronomía'
      },
      { 
        name: 'San Pedro de la Ribera', 
        type: 'Arenal amplio con pradera verde, área recreativa y desembocadura', 
        tag: 'Familiar & Surf',
        facing: 'N',
        facingDeg: 0,
        picos: 'Picos centrales de San Pedro',
        bottom: '🏖️ Arena fina',
        waveType: '↔️ Olas manejables',
        bestTide: 'Media Marea',
        surfLevel: 'Iniciación'
      }
    ]
  },
  'muros-de-nalon': {
    name: 'Muros de Nalón',
    region: 'Costa Occidental',
    playas: [
      { 
        name: 'Playa de Aguilar', 
        type: 'Playa dorada con la roca de Peñafurada y senda de los Miradores', 
        tag: 'Familiar & Surf',
        facing: 'N',
        facingDeg: 355,
        picos: 'Picos junto a Peñafurada • Centro',
        bottom: '🏖️ Arena dorada',
        waveType: '↔️ Olas suaves y divertidas',
        bestTide: 'Media Marea',
        surfLevel: 'Iniciación y Baño'
      },
      { 
        name: 'Playa de las Llanas', 
        type: 'Cala salvaje al pie de impresionantes acantilados con escalinata', 
        tag: 'Salvaje',
        facing: 'N',
        facingDeg: 350,
        picos: 'Picos abiertos de mar Cantábrico',
        bottom: '🪨🏖️ Mixto',
        waveType: '↔️ Rompiente rápida',
        bestTide: 'Bajamar',
        surfLevel: 'Naturaleza y Retiro'
      }
    ]
  },
  'carreno': {
    name: 'Carreño (Candás)',
    region: 'Costa Central',
    playas: [
      { 
        name: 'Playa de Candás', 
        type: 'Playa urbana con paseo marítimo, espigón y ambiente marinero', 
        tag: 'Urbana',
        facing: 'ESE',
        facingDeg: 115,
        picos: 'Ensenada abrigada por el dique',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Calma',
        bestTide: 'Todas las mareas',
        surfLevel: 'Baño y Paseo'
      },
      { 
        name: 'Playa de la Palmera', 
        type: 'Aguas tranquilas con solárium y vistas al puerto de Candás', 
        tag: 'Familiar',
        facing: 'ESE',
        facingDeg: 115,
        picos: 'Zona de baño abrigada',
        bottom: '🏖️ Arena',
        waveType: '🚫 Sin olas',
        bestTide: 'Media a Pleamar',
        surfLevel: 'Baño seguro'
      },
      { 
        name: 'Playa de Carranques (Perlora)', 
        type: 'Ensenada de aguas mansas en la histórica Ciudad de Vacaciones', 
        tag: 'Tranquila',
        facing: 'ENE',
        facingDeg: 70,
        picos: 'Ensenada natural',
        bottom: '🏖️ Arena y roquedo',
        waveType: '🚫 Aguas mansas',
        bestTide: 'Todas las mareas',
        surfLevel: 'Familias y Niños'
      }
    ]
  },
  'castropol': {
    name: 'Castropol',
    region: 'Ría del Eo',
    playas: [
      { 
        name: 'Playa de Penarronda', 
        type: 'Monumento Natural con gran arco de roca central, dunas y alhelí marino', 
        tag: 'Monumento Natural & Surf',
        facing: 'N',
        facingDeg: 355,
        picos: 'Picos del Arco de Roca • Centro',
        bottom: '🏖️ Arena fina',
        waveType: '↔️ Izquierdas y Derechas con buena pared',
        bestTide: 'Media Marea a Bajamar',
        surfLevel: 'Iniciación a Intermedio'
      },
      { 
        name: 'Playa de Arnao (Ría del Eo)', 
        type: 'Aguas cristalinas y calmas en la desembocadura de la Reserva de la Biosfera', 
        tag: 'Ría & Paisaje',
        facing: 'NW',
        facingDeg: 310,
        picos: 'Ensenada de la Ría del Eo',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Aguas calmas',
        bestTide: 'Media a Pleamar',
        surfLevel: 'Paddle Surf y Baño'
      }
    ]
  },
  'el-franco': {
    name: 'El Franco',
    region: 'Costa Occidental',
    playas: [
      { 
        name: 'Playa de Porcía', 
        type: 'Ría meándrica espectacular con islotes boyas de roca kárstica', 
        tag: 'Top Paisaje & Ría',
        facing: 'N',
        facingDeg: 0,
        picos: 'Estuario meándrico protegido',
        bottom: '🏖️ Arena fina',
        waveType: '↔️ Olas suaves en la barra exterior',
        bestTide: 'Media Marea a Pleamar',
        surfLevel: 'Baño y Fotografía'
      },
      { 
        name: 'Playa de Pormenande', 
        type: 'Cala abrigada de pescadores con aguas mansas e islote de El Rego', 
        tag: 'Cala Marinera',
        facing: 'NE',
        facingDeg: 35,
        picos: 'Piscina natural protegida',
        bottom: '🪨 Cantos rodados',
        waveType: '🚫 Calma',
        bestTide: 'Todas las mareas',
        surfLevel: 'Snorkel y Baño'
      }
    ]
  },
  'coana': {
    name: 'Coaña',
    region: 'Costa Occidental',
    playas: [
      { 
        name: 'Playa de Foxos', 
        type: 'Cala de cantos y arena junto a la ría de Navia y el Castro de Coaña', 
        tag: 'Tranquila',
        facing: 'NE',
        facingDeg: 35,
        picos: 'Ensenada fluvial-marina',
        bottom: '🪨🏖️ Mixto',
        waveType: '↔️ Olas suaves',
        bestTide: 'Media Marea',
        surfLevel: 'Baño y Paseo'
      },
      { 
        name: 'Playa de Arnelles', 
        type: 'Cala acogedora de arena fina cerca del pintoresco puerto de Ortiguera', 
        tag: 'Cala',
        facing: 'NNE',
        facingDeg: 20,
        picos: 'Cala abrigada',
        bottom: '🏖️ Arena fina',
        waveType: '🚫 Calma',
        bestTide: 'Media Marea',
        surfLevel: 'Baño y Desconexión'
      }
    ]
  },
  'ribadedeva': {
    name: 'Ribadedeva',
    region: 'Costa Oriental',
    playas: [
      { 
        name: 'Playa de La Franca', 
        type: 'Gran concha de arena fina con cuevas y arcos explorables en bajamar', 
        tag: 'Familiar Top',
        facing: 'NNE',
        facingDeg: 25,
        picos: 'Rompiente suave en la bahía',
        bottom: '🏖️ Arena fina dorada',
        waveType: '↔️ Olas suaves en pleamar',
        bestTide: 'Bajamar (cuevas) / Pleamar (baño)',
        surfLevel: 'Baño y Familias'
      }
    ]
  }
};

/**
 * Mapeo de referencia costera más cercana para concejos de interior o montaña
 */
export function getNearestCoastalReference(concejo) {
  const cId = concejo.id;

  // Oriente
  if (['cangas-de-onis', 'parres', 'amieva', 'cabrales', 'penasanta', 'oniss', 'ponga', 'ribadesella'].includes(cId) || (concejo.region && concejo.region.includes('Oriente'))) {
    return { refId: 'ribadesella', name: 'Ribadesella (Costa Oriental)', dist: '22 km' };
  }
  // Cuencas / Centro Sur
  if (['mieres', 'langreo', 'laviana', 'san-martin-del-rey-aurelio', 'morcin', 'riosa', 'lena', 'aller', 'sobrescobio', 'caso'].includes(cId)) {
    return { refId: 'gijon', name: 'Gijón / Xixón (Costa Central)', dist: '35 km' };
  }
  // Occidente Interior / Montaña
  if (['cangas-del-narcea', 'tineo', 'allande', 'somiedo', 'belmonte-de-miranda', 'ibias', 'degana'].includes(cId)) {
    return { refId: 'valdes', name: 'Luarca / Valdés (Costa Occidental)', dist: '45 km' };
  }
  // Centro / Oviedo / Siero / Noreña / Grado / Pravia
  if (['pravia', 'candamo', 'salass'].includes(cId)) {
    return { refId: 'muros-de-nalon', name: 'Muros de Nalón / Aguilar', dist: '14 km' };
  }

  // Por defecto: Gijón (Costa Central)
  return { refId: 'gijon', name: 'Gijón / Xixón (Costa Central)', dist: '26 km' };
}

/**
 * Calcula con precisión física y geográfica si el viento actual es Offshore, Onshore o Cross-shore
 * para una playa concreta de Asturias según su orientación real de costa (azimut de apertura al mar).
 */
export function getBeachSpecificWindCondition(beachFacingDeg, windDirDeg, windSpeedKm) {
  const speed = typeof windSpeedKm === 'number' ? windSpeedKm : 12;
  const facing = typeof beachFacingDeg === 'number' ? ((beachFacingDeg % 360) + 360) % 360 : 355;
  const windFrom = typeof windDirDeg === 'number' ? ((windDirDeg % 360) + 360) % 360 : 180;

  // Calma / Glassy si el viento es casi nulo (< 8 km/h)
  if (speed < 8) {
    return {
      type: 'glassy',
      badge: '✨ Glassy (< 8 km/h)',
      statusClass: 'surf-wind-glassy',
      color: '#38bdf8',
      shortDesc: 'Mar liso como un espejo, sin viento',
      isOffshore: true
    };
  }

  // Ángulo relativo entre la procedencia del viento y la dirección abierta al mar de la playa:
  // diffSea = 0° significa que el viento viene directamente desde el mar hacia la orilla (ONSHORE).
  // diffSea = 180° significa que el viento viene desde tierra hacia el mar (OFFSHORE).
  const diffSea = Math.abs(((windFrom - facing + 540) % 360) - 180);

  // 1. ONSHORE PURO (0° a 45°): Viento de mar a tierra -> Aplasta la ola y crea chop
  if (diffSea <= 45) {
    return {
      type: 'onshore',
      badge: '🔴 Onshore (Viento de Mar)',
      statusClass: 'surf-wind-onshore',
      color: '#ef4444',
      shortDesc: 'Chop / Mar picado que aplasta la rompiente',
      isOffshore: false
    };
  }

  // 2. CROSS-ONSHORE (45° a 75°): Viento diagonal entrando desde el mar
  if (diffSea <= 75) {
    return {
      type: 'cross-onshore',
      badge: '🟡 Cross-Onshore (Diagonal Mar)',
      statusClass: 'surf-wind-cross',
      color: '#f59e0b',
      shortDesc: 'Entrada diagonal de mar, algo revuelto',
      isOffshore: false
    };
  }

  // 3. CROSS-SHORE PURO (75° a 105°): Viento lateral / paralelo a la orilla
  if (diffSea <= 105) {
    return {
      type: 'crossshore',
      badge: '🟡 Cross-shore (Viento Lateral)',
      statusClass: 'surf-wind-cross',
      color: '#f59e0b',
      shortDesc: 'Viento lateral a la orilla con corriente de deriva',
      isOffshore: false
    };
  }

  // 4. CROSS-OFFSHORE (105° a 135°): Viento diagonal saliendo desde tierra
  if (diffSea <= 135) {
    return {
      type: 'cross-offshore',
      badge: '🟢 Cross-Offshore (Diagonal Tierra)',
      statusClass: 'surf-wind-offshore',
      color: '#10b981',
      shortDesc: 'Diagonal favorable desde tierra, ola ordenada',
      isOffshore: true
    };
  }

  // 5. OFFSHORE PURO (135° a 180°): Viento de tierra hacia el mar -> Peina la ola y abre tubos
  return {
    type: 'offshore',
    badge: '🟢 Offshore (Terral)',
    statusClass: 'surf-wind-offshore',
    color: '#10b981',
    shortDesc: 'Terral que peina la ola y abre tubos limpios',
    isOffshore: true
  };
}

/**
 * Computa la calidad e idoneidad del viento para surf en la costa asturiana a nivel general
 */
export function getSurfWindCondition(windDirDeg, windSpeedKm) {
  const speed = typeof windSpeedKm === 'number' ? windSpeedKm : 12;
  const deg = typeof windDirDeg === 'number' ? ((windDirDeg % 360) + 360) % 360 : 180;

  // Calma / Glassy si el viento es casi nulo (< 8 km/h)
  if (speed < 8) {
    return {
      type: 'glassy',
      name: 'Glassy / Mar Calma',
      badge: '✨ Glassy (< 8 km/h)',
      color: '#38bdf8',
      desc: 'Mar liso como un espejo. Sin viento que distorsione la ola; condiciones limpias y perfectas para disfrutar del agua.',
      effect: 'Cara de la ola cristalina y lisa.',
      statusClass: 'surf-wind-glassy'
    };
  }

  // Viento Sur (115° a 245°): Viento de tierra hacia el mar -> OFFSHORE
  if (deg >= 115 && deg <= 245) {
    return {
      type: 'offshore',
      name: 'Offshore (Viento Terral)',
      badge: '🟢 Viento Offshore',
      color: '#10b981',
      desc: 'Viento de tierra (Sur / SO / SE). Peina la ola retrasando su rotura, ahueca el tubo y alisa la superficie.',
      effect: 'Tubos huecos y pared limpia (¡Condición Ideal!).',
      statusClass: 'surf-wind-offshore'
    };
  }

  // Viento Norte (315° a 360° o 0° a 45°): Viento de mar hacia tierra -> ONSHORE
  if (deg >= 315 || deg <= 45) {
    return {
      type: 'onshore',
      name: 'Onshore (Viento de Mar)',
      badge: '🔴 Viento Onshore',
      color: '#ef4444',
      desc: 'Viento de mar hacia tierra (Norte / NO / NE). Choca de frente, aplasta la ola y genera mar picado con espuma.',
      effect: 'Olas desordenadas y mar picado (chop).',
      statusClass: 'surf-wind-onshore'
    };
  }

  // Viento lateral Este u Oeste (45° a 115° o 245° a 315°): CROSS-SHORE
  return {
    type: 'crossshore',
    name: 'Cross-shore (Viento Lateral)',
    badge: '🟡 Viento Lateral',
    color: '#f59e0b',
    desc: 'Viento lateral (Este u Oeste). Recorre la orilla de lado, barriendo las paredes y creando corriente de deriva.',
    effect: 'Corriente lateral a lo largo de la playa.',
    statusClass: 'surf-wind-cross'
  };
}

/**
 * Obtiene la temperatura del agua del mar en grados centígrados de forma unificada
 * (utiliza el sensor de satélite/boya en vivo de Open-Meteo o climatología del Cantábrico)
 */
export function getSeaWaterTemperature(marine) {
  if (marine && typeof marine.sea_surface_temperature === 'number') {
    return marine.sea_surface_temperature.toFixed(1);
  }
  const now = new Date();
  return (16.2 + Math.sin((now.getMonth() - 2) * 0.5) * 4.2).toFixed(1);
}

/**
 * Renderiza el módulo marítimo con Mareógrafo interactivo en tiempo real, 
 * Cuadro semanal de mareas y Catálogo de Playas y Calas de Asturias (Turismo y Baño)
 */
export function renderMarineCard(data, concejo) {
  const marine = data.marine?.current;
  const current = data.weather.current;

  const isCoasting = PLAYAS_POR_CONCEJO[concejo.id] !== undefined;
  const coastalData = isCoasting ? PLAYAS_POR_CONCEJO[concejo.id] : null;
  const interiorRef = !isCoasting ? getNearestCoastalReference(concejo) : null;
  const activePlayas = isCoasting ? coastalData.playas : PLAYAS_POR_CONCEJO[interiorRef.refId].playas;
  const activeCoastName = isCoasting ? coastalData.name : `${interiorRef.name} (más cercana a ${concejo.name} • ${interiorRef.dist})`;

  const waveHeight = (marine && typeof marine.wave_height === 'number') ? marine.wave_height.toFixed(1) : (isCoasting ? '1.4' : '1.3');

  const windSpeed = Math.round(current.wind_speed_10m || 10);
  const windDeg = current.wind_direction_10m || 0;
  const windDirObj = getWindDirection(windDeg);

  const h = parseFloat(waveHeight);
  let douglasDegree = 3;
  let douglasName = 'Marejada';
  let flagColor = '#f59e0b';
  let flagBadge = '🟡 Bandera Amarilla';
  let bathStatus = 'Precaución en el baño. Oleaje moderado con corriente en orilla.';

  if (h < 0.6) {
    douglasDegree = 1;
    douglasName = 'Mar Calma / Rizada';
    flagBadge = '🟢 Bandera Verde';
    flagColor = '#10b981';
    bathStatus = 'Condiciones excelentes para el baño, paseo por la orilla y niños.';
  } else if (h < 1.3) {
    douglasDegree = 2;
    douglasName = 'Marejadilla';
    flagBadge = '🟢 Bandera Verde / Amarilla';
    flagColor = '#10b981';
    bathStatus = 'Mar en buenas condiciones. Baño agradable prestando atención a zonas de rompiente.';
  } else if (h <= 2.6) {
    douglasDegree = 3;
    douglasName = 'Marejada Consistente';
    flagBadge = '🟡 Bandera Amarilla';
    flagColor = '#f59e0b';
    bathStatus = 'Precaución en el baño. Oleaje marcado y corrientes de resaca en orilla.';
  } else if (h <= 3.8) {
    douglasDegree = 4;
    douglasName = 'Fuerte Marejada';
    flagBadge = '🔴 Bandera Roja';
    flagColor = '#ef4444';
    bathStatus = 'Peligro. Baño desaconsejado por fuerte oleaje y corrientes.';
  } else {
    douglasDegree = 5;
    douglasName = 'Mar Gruesa / Temporal';
    flagBadge = '🔴 Bandera Roja / Temporal';
    flagColor = '#ef4444';
    bathStatus = '🚨 Temporal costero activo. Prohibido el baño en todas las playas.';
  }

  // Temperatura del agua unificada
  const now = new Date();
  const seaTemp = getSeaWaterTemperature(marine);

  // Visibilidad costera
  const visibilityKm = (current.visibility / 1000 || 10).toFixed(0);

  // Coordenada longitudinal local para cálculo exacto de mareas
  const targetLon = (isCoasting && typeof concejo.lon === 'number') ? concejo.lon : (concejo.lon || -5.6615);

  // Cálculos dinámicos de mareas y fase lunar adaptados a la longitud local
  const tideStatus = getRealtimeTideStatus(now, targetLon);
  const weeklyTides = getWeeklyTides(now, targetLon);
  const tideSvg = renderTideSvgGraph(now, true, tideStatus.currentHours, targetLon);

  return `
    <div class="marine-card">
      <div class="section-title-wrap">
        <div>
          <h3 class="section-heading">🏖️ Playas, Mareas & Turismo de ${concejo.name}</h3>
          <span class="section-subtitle">
            ${isCoasting 
              ? `Litoral de ${concejo.name} (${coastalData.region}) • Guía costera, mareas y arenales`
              : `🌲 ${concejo.name} es concejo de interior. Datos enfocados a la costa más cercana: ${interiorRef.name}`
            }
          </span>
        </div>
        <div class="sea-state-pill" style="background: ${flagColor}22; color: ${flagColor}; border: 1px solid ${flagColor};">
          ${flagBadge}
        </div>
      </div>

      <!-- 1. MAREÓGRAFO INTERACTIVO EN TIEMPO REAL (ONDA SINUSOIDAL VIVA 72H) -->
      <div class="marine-widget mareografo-card" style="margin-bottom: 20px;">
        <div class="mareografo-header">
          <div class="mareografo-title-wrap">
            <span class="mareografo-icon">🌊</span>
            <div>
              <div class="mareografo-title">Mareógrafo Dinámico en Vivo (72 Horas)</div>
              <div class="mareografo-subtitle">${activeCoastName} • Previsión Continua 3 Días (${Math.abs(targetLon).toFixed(2)}° O)</div>
            </div>
          </div>
          <div class="mareografo-live-badge" style="background: ${tideStatus.directionColor}20; color: ${tideStatus.directionColor}; border: 1px solid ${tideStatus.directionColor}60;">
            ${tideStatus.directionIcon} <strong>${tideStatus.directionName}</strong>
          </div>
        </div>

        <!-- Métricas clave en vivo -->
        <div class="mareografo-metrics-row">
          <div class="tide-metric-pill">
            <span class="t-label">Nivel de Agua Actual</span>
            <span class="t-value" style="color: ${tideStatus.directionColor};">${tideStatus.currentWaterHeight} <span class="t-unit">m</span></span>
          </div>

          <div class="tide-metric-pill">
            <span class="t-label">Llenado del Ciclo</span>
            <div class="tide-progress-wrap">
              <div class="tide-progress-bar" style="width: ${tideStatus.fillPercent}%; background: linear-gradient(90deg, #0284c7, #38bdf8);"></div>
            </div>
            <span class="t-subvalue">${tideStatus.fillPercent}% de marea</span>
          </div>

          <div class="tide-metric-pill highlight-countdown">
            <span class="t-label">Próximo Evento de Marea</span>
            <span class="t-countdown">⏳ ${tideStatus.countdownStr}</span>
            <span class="t-subvalue">Para <strong>${tideStatus.nextEvent.name}</strong> (${tideStatus.nextEvent.timeStr} • ${tideStatus.nextEvent.height}m)</span>
          </div>

          <div class="tide-metric-pill">
            <span class="t-label">Coeficiente Hoy</span>
            <span class="t-value">${tideStatus.moonInfo.coefficient}</span>
            <span class="t-badge-small ${tideStatus.moonInfo.tideClass}">${tideStatus.moonInfo.tideBadge}</span>
          </div>
        </div>

        <!-- Curva Gráfica Sinusoidal Continua de 72h con Scroll Horizontal -->
        <div class="tide-chart-container">
          <div class="tide-scroll-hint-bar">
            <span class="tide-scroll-hint-pill">👆 Desliza horizontalmente para recorrer las 72h (3 días de marea)</span>
          </div>
          <div class="tide-scroll-viewport">
            ${tideSvg}
          </div>
        </div>

        <!-- Mareas de Hoy en Estructura a 2 Niveles (Liquid Glass, Cero Colisiones) -->
        <div class="daily-tides-grid">
          ${(tideStatus.dayData.events || []).map((ev, idx) => {
            const isHigh = ev.type === 'high';
            return `
              <div class="tide-sub-item ${isHigh ? 'high' : 'low'}">
                <div class="tide-sub-top">
                  <div class="tide-sub-type-badge">
                    <span class="tide-sub-icon">${isHigh ? '🌅' : '🏖️'}</span>
                    <span class="tide-sub-name">${ev.name}</span>
                  </div>
                  <span class="tide-sub-order">#${idx + 1}</span>
                </div>
                <div class="tide-sub-bottom">
                  <span class="tide-sub-time">${ev.timeStr}</span>
                  <span class="tide-sub-height">${ev.height} m</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 2. CUADRO SEMANAL DE MAREAS & COEFICIENTES (7 DÍAS) -->
      <div class="marine-widget weekly-tides-card" style="margin-bottom: 20px;">
        <div class="weekly-tides-header">
          <div class="weekly-title-wrap">
            <span class="weekly-icon">📅</span>
            <div>
              <div class="weekly-title">Cuadro Semanal de Mareas & Coeficientes</div>
              <div class="weekly-subtitle">Previsión astronómica oficial a 7 días • Fases Lunares & Mareonas</div>
            </div>
          </div>
        </div>

        <div class="weekly-tides-grid">
          ${weeklyTides.map((day, idx) => `
            <div class="tide-day-card ${day.isToday ? 'is-today' : ''}">
              <div class="tide-day-header">
                <div class="tide-day-date">
                  <span class="tide-day-name">${day.dayName}</span>
                  <span class="tide-day-num">${day.dateFormatted}</span>
                </div>
                <div class="tide-moon-badge" title="${day.moonInfo.moonName}">
                  <span class="moon-ico">${day.moonInfo.moonIcon}</span>
                  <span class="moon-txt">${day.moonInfo.moonName}</span>
                </div>
              </div>

              <!-- Coeficiente y Clasificación -->
              <div class="tide-coef-row">
                <span class="coef-label">Coeficiente:</span>
                <span class="coef-number">${day.moonInfo.coefficient}</span>
                <span class="coef-tag ${day.moonInfo.tideClass}">${day.moonInfo.tideType}</span>
              </div>

              <!-- Lista de eventos del día -->
              <div class="tide-day-events-list">
                ${day.events.map(ev => `
                  <div class="tide-mini-row ${ev.type}">
                    <span class="mini-icon">${ev.type === 'high' ? '⬆️' : '⬇️'}</span>
                    <span class="mini-name">${ev.name}</span>
                    <span class="mini-time">${ev.timeStr}</span>
                    <span class="mini-height">${ev.height}m</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. GRID DE SENSORES TURÍSTICOS Y CONDICIONES DE PLAYA -->
      <div class="marine-grid">
        <!-- Temperatura del Agua y Confort -->
        <div class="marine-widget">
          <div class="widget-label">Temperatura del Agua en Playa</div>
          <div class="widget-value">${seaTemp} <span class="unit">°C</span></div>
          <div class="widget-detail">${isCoasting ? `Playas de ${concejo.name}` : `Costa de ${interiorRef.name}`}</div>
          <div class="widget-detail">Sensación: <strong>${parseFloat(seaTemp) >= 19 ? 'Agradable / Cálida' : (parseFloat(seaTemp) >= 16 ? 'Fresca y vivificante' : 'Fría / Cantábrico')}</strong></div>
        </div>

        <!-- Visibilidad Costera -->
        <div class="marine-widget">
          <div class="widget-label">Visibilidad & Bruma Marina</div>
          <div class="widget-value">${visibilityKm} <span class="unit">km</span></div>
          <div class="widget-detail">Viento en costa: <strong>${windSpeed} km/h (${windDirObj.name})</strong></div>
          <div class="widget-detail">Ambiente: <strong>${parseFloat(visibilityKm) >= 15 ? 'Cielos limpios y diáfanos' : 'Ligera bruma marina'}</strong></div>
        </div>

        <!-- Estado de la Mar (Douglas) -->
        <div class="marine-widget">
          <div class="widget-label">Estado de la Mar (Escala Douglas)</div>
          <div class="widget-value">${waveHeight} <span class="unit">m</span></div>
          <div class="widget-detail">Grado: <strong>Grado ${douglasDegree} (${douglasName})</strong></div>
          <div class="widget-detail">Tipo de mar: <strong>${h < 1.0 ? 'Mar en calma / Rizada' : 'Oleaje atlántico cantábrico'}</strong></div>
        </div>

        <!-- Bandera y Seguridad de Baño -->
        <div class="marine-widget surf-turismo-visual-widget">
          <div class="surf-widget-top">
            <div class="surf-title-row">
              <span class="surf-title-icon">🚩</span>
              <div>
                <div class="surf-title-main">Seguridad & Bandera de Baño</div>
                <div class="surf-title-sub">${isCoasting ? `Litoral de ${concejo.name}` : `Costa de ${interiorRef.name}`}</div>
              </div>
            </div>
            <div class="surf-flag-badge" style="background: ${flagColor}22; color: ${flagColor}; border: 1px solid ${flagColor};">
              ${flagBadge}
            </div>
          </div>

          <div class="surf-status-banner" style="color: ${flagColor};">
            ${bathStatus}
          </div>
        </div>
      </div>

      <!-- 4. CATÁLOGO TURÍSTICO DE PLAYAS Y CALAS DEL CONCEJO -->
      <div class="marine-ports-section">
        <div class="beach-section-header">
          <div>
            <h4 class="ports-title" style="margin-bottom: 2px;">
              🏖️ Guía de Playas y Calas de ${isCoasting ? concejo.name : `${concejo.name} (en ${interiorRef.name})`}
            </h4>
            <span class="beach-section-subtitle">
              Arenales, calas con encanto, entorno marinero y mejor momento de marea
            </span>
          </div>
        </div>

        <div class="beaches-grid">
          ${activePlayas.map(p => `
            <div class="beach-card">
              <div class="beach-card-top">
                <span class="beach-card-name">${p.name}</span>
                <span class="beach-card-tag">${p.tag || 'Playa'}</span>
              </div>
              
              <div class="beach-card-desc">${p.type}</div>

              <div class="beach-specs-table">
                <div class="beach-spec-row">
                  <span class="spec-label">🏖️ Entorno / Fondo:</span>
                  <span class="spec-value">${p.bottom || 'Arena fina dorada'}</span>
                </div>

                <div class="beach-spec-row">
                  <span class="spec-label">⏳ Marea Óptima:</span>
                  <span class="spec-value">${p.bestTide || 'Media Marea / Bajamar'}</span>
                </div>

                <div class="beach-spec-row full-card">
                  <span class="spec-label">🎯 Recomendación:</span>
                  <span class="spec-value">${p.surfLevel.includes('Baño') || p.surfLevel.includes('Familiar') || p.surfLevel.includes('Todos') ? '👨‍👩‍👧‍👦 Ideal para baño, descanso y paseos' : '🌊 Precaución con el oleaje en días de mar viva'}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}