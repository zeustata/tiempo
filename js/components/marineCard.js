import { getWindDirection } from '../utils/weatherIcons.js?v=1.0.57';
import { 
  getMoonAndTideInfo, 
  getDailyTideEvents, 
  getRealtimeTideStatus, 
  getWeeklyTides, 
  renderTideSvgGraph 
} from '../utils/tides.js?v=1.0.57';

/**
 * Base de datos exhaustiva y profesional de playas, picos de surf y fondos marinos de Asturias
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
function getNearestCoastalReference(concejo) {
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
 * Computa la calidad e idoneidad del viento para surf en la costa asturiana
 * (La costa cantábrica asturiana mira principalmente al Norte: 340° a 20°)
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
 * Renderiza el módulo marítimo con Mareógrafo interactivo en tiempo real, 
 * Cuadro semanal de mareas e Inteligencia de Surf y Picos de Asturias
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
  const swellHeight = (marine && typeof marine.swell_wave_height === 'number') ? marine.swell_wave_height.toFixed(1) : ((marine && typeof marine.wave_height === 'number') ? marine.wave_height.toFixed(1) : '1.2');
  const wavePeriod = (marine && typeof marine.wave_period === 'number') ? Math.round(marine.wave_period) : 11;
  const waveDir = (marine && typeof marine.wave_direction === 'number') ? getWindDirection(marine.wave_direction) : { name: 'Noroeste (NW)' };
  const windWaveH = (marine && typeof marine.wind_wave_height === 'number') ? marine.wind_wave_height.toFixed(1) : '0.6';

  const windSpeed = Math.round(current.wind_speed_10m || 10);
  const windDeg = current.wind_direction_10m || 0;
  const windDirObj = getWindDirection(windDeg);
  const surfWind = getSurfWindCondition(windDeg, windSpeed);

  const h = parseFloat(waveHeight);
  let douglasDegree = 3;
  let douglasName = 'Marejada';
  let flagColor = '#f59e0b';
  let flagBadge = '🟡 Bandera Amarilla';
  let surfStatus = `🏄‍♂️ Olas consistentes. Muy buenas condiciones para surf en la costa de ${isCoasting ? concejo.name : interiorRef.name}.`;

  if (h < 0.6) {
    douglasDegree = 1;
    douglasName = 'Mar Calma / Rizada';
    flagBadge = '🟢 Bandera Verde';
    flagColor = '#10b981';
    surfStatus = '🏖️ Mar en calma. Día ideal para paseo por la arena, baño en familia y paddle surf (SUP).';
  } else if (h < 1.3) {
    douglasDegree = 2;
    douglasName = 'Marejadilla';
    flagBadge = '🟢 Bandera Verde / Amarilla';
    flagColor = '#10b981';
    surfStatus = '🏄‍♂️ Olas medianas de 1m. Ideal para iniciación al surf, longboard y baño tranquilo.';
  } else if (h <= 2.6) {
    douglasDegree = 3;
    douglasName = 'Marejada Consistente';
    flagBadge = '🟡 Bandera Amarilla';
    flagColor = '#f59e0b';
    surfStatus = `🔥 ¡Condiciones TOP de Surf! Rompientes activas en las playas de ${isCoasting ? concejo.name : interiorRef.name}.`;
  } else if (h <= 3.8) {
    douglasDegree = 4;
    douglasName = 'Fuerte Marejada';
    flagBadge = '🔴 Bandera Roja';
    flagColor = '#ef4444';
    surfStatus = '⚠️ Rompientes potentes (+3m). Solo surfistas experimentados. Precaución en paseos marítimos.';
  } else {
    douglasDegree = 5;
    douglasName = 'Mar Gruesa / Temporal';
    flagBadge = '🔴 Bandera Roja / Temporal';
    flagColor = '#ef4444';
    surfStatus = '🚨 Temporal costero activo. Prohibido el baño. Mar no navegable.';
  }

  // Temperatura del agua
  const now = new Date();
  const seaTemp = (16.2 + Math.sin((now.getMonth() - 2) * 0.5) * 4.2).toFixed(1);

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
          <h3 class="section-heading">🌊 Costa, Playas & Surf de ${concejo.name}</h3>
          <span class="section-subtitle">
            ${isCoasting 
              ? `Litoral de ${concejo.name} (${coastalData.region}) • Modelo Marino Copernicus / ECMWF`
              : `🌲 ${concejo.name} es concejo de interior. Datos enfocados a la costa más cercana: ${interiorRef.name}`
            }
          </span>
        </div>
        <div class="sea-state-pill" style="background: ${flagColor}22; color: ${flagColor}; border: 1px solid ${flagColor};">
          Grado ${douglasDegree} • ${douglasName}
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

        <!-- 2 Ciclos del Día en Orden Cronológico Real (Plea/Baja o Baja/Plea) -->
        ${(() => {
          const events = tideStatus.dayData.events || [];
          const ev0 = events[0] || { type: 'high', name: 'Pleamar', timeStr: '--:--', height: '--' };
          const ev1 = events[1] || { type: 'low', name: 'Bajamar', timeStr: '--:--', height: '--' };
          const ev2 = events[2] || { type: 'high', name: 'Pleamar', timeStr: '--:--', height: '--' };
          const ev3 = events[3];

          const renderSubItem = (ev) => {
            if (!ev) return '';
            const isHigh = ev.type === 'high';
            return `
              <div class="tide-sub-item ${isHigh ? 'high' : 'low'}">
                <div class="tide-sub-top">
                  <span class="tide-sub-icon">${isHigh ? '🌅' : '🏖️'}</span>
                  <span class="tide-sub-name">${ev.name}</span>
                </div>
                <div class="tide-sub-bottom">
                  <span class="tide-sub-time">${ev.timeStr}</span>
                  <span class="tide-sub-height">${ev.height} m</span>
                </div>
              </div>
            `;
          };

          return `
            <div class="daily-tide-cycles-grid">
              <!-- Tarjeta 1 (1ª Marea del Día) -->
              <div class="tide-cycle-card">
                <div class="tide-cycle-header">
                  <span class="cycle-badge">🌅 1ª Marea del Día</span>
                </div>
                <div class="tide-cycle-items">
                  ${renderSubItem(ev0)}
                  ${renderSubItem(ev1)}
                </div>
              </div>

              <!-- Tarjeta 2 (2ª Marea del Día) -->
              <div class="tide-cycle-card">
                <div class="tide-cycle-header">
                  <span class="cycle-badge">🌙 2ª Marea del Día</span>
                </div>
                <div class="tide-cycle-items">
                  ${renderSubItem(ev2)}
                  ${ev3 ? renderSubItem(ev3) : `
                    <div class="tide-sub-item low" style="opacity: 0.75; border-style: dashed;">
                      <div class="tide-sub-top">
                        <span class="tide-sub-icon">⏳</span>
                        <span class="tide-sub-name">Próx. Ciclo</span>
                      </div>
                      <div class="tide-sub-bottom">
                        <span class="tide-sub-time">Madrugada</span>
                        <span class="tide-sub-height">Día sig.</span>
                      </div>
                    </div>
                  `}
                </div>
              </div>
            </div>
          `;
        })()}
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

      <!-- 3. GRID DE SENSORES MARINOS Y CONDICIONES GENERALES -->
      <div class="marine-grid">
        <!-- Altura de Ola -->
        <div class="marine-widget">
          <div class="widget-label">Altura del Oleaje (Significativa)</div>
          <div class="widget-value">${waveHeight} <span class="unit">metros</span></div>
          <div class="widget-detail">Mar de fondo (Swell): <strong>${swellHeight} m</strong></div>
          <div class="widget-detail">Mar de viento: <strong>${windWaveH} m</strong></div>
        </div>

        <!-- Período y Dirección para Surf -->
        <div class="marine-widget">
          <div class="widget-label">Período y Dirección del Swell</div>
          <div class="widget-value">${wavePeriod} <span class="unit">segundos</span></div>
          <div class="widget-detail">Dirección del oleaje: <strong>${waveDir.name}</strong></div>
          <div class="widget-detail">Viento en orilla: <strong>${windSpeed} km/h (${windDirObj.name})</strong></div>
        </div>

        <!-- Temperatura del Agua y Confort Turístico -->
        <div class="marine-widget">
          <div class="widget-label">Temperatura del Agua en Playa</div>
          <div class="widget-value">${seaTemp} <span class="unit">°C</span></div>
          <div class="widget-detail">${isCoasting ? `Playas de ${concejo.name}` : `Costa de ${interiorRef.name}`}</div>
          <div class="widget-detail">Visibilidad costera: <strong>${(current.visibility / 1000 || 10).toFixed(0)} km</strong></div>
        </div>

        <!-- Estado de Surf y Bandera General -->
        <div class="marine-widget surf-turismo-visual-widget">
          <div class="surf-widget-top">
            <div class="surf-title-row">
              <span class="surf-title-icon">🏄‍♂️</span>
              <div>
                <div class="surf-title-main">Surf & Turismo de Playa</div>
                <div class="surf-title-sub">${isCoasting ? `Litoral de ${concejo.name}` : `Costa de ${interiorRef.name}`}</div>
              </div>
            </div>
            <div class="surf-flag-badge" style="background: ${flagColor}22; color: ${flagColor}; border: 1px solid ${flagColor};">
              ${flagBadge}
            </div>
          </div>

          <div class="surf-status-banner">
            ${surfStatus}
          </div>
        </div>
      </div>

      <!-- 4. PANEL DE INTELIGENCIA DE SURF: VIENTO OFFSHORE/ONSHORE & GUÍA DIDÁCTICA -->
      <div class="marine-widget surf-intelligence-card" style="margin-top: 20px; margin-bottom: 20px;">
        <div class="surf-intel-header">
          <div class="surf-intel-title-wrap">
            <span class="surf-intel-icon">🧭</span>
            <div>
              <div class="surf-intel-title">Calidad de Viento para Surf (Offshore / Onshore)</div>
              <div class="surf-intel-subtitle">Análisis aerodinámico en vivo cruzando viento y orientación cantábrica</div>
            </div>
          </div>
          <button class="btn-explain-sensor surf-guide-btn" data-explain="surf" title="Aprender sobre Offshore, Fondos, Izquierdas y Picos">
            💡 Guía de Surf y Olas
          </button>
        </div>

        <div class="surf-wind-analysis-grid">
          <!-- Tarjeta de Estado del Viento en Vivo -->
          <div class="surf-wind-pill-card ${surfWind.statusClass}">
            <div class="surf-wind-badge-row">
              <span class="surf-wind-status-badge" style="background: ${surfWind.color}22; color: ${surfWind.color}; border: 1px solid ${surfWind.color}80;">
                ${surfWind.badge}
              </span>
              <span class="surf-wind-reading">${windSpeed} km/h • ${windDirObj.name} (${Math.round(windDeg)}°)</span>
            </div>
            <div class="surf-wind-desc-text">
              <strong>${surfWind.name}:</strong> ${surfWind.desc}
            </div>
            <div class="surf-wind-effect-tag">
              ⚡ <strong>Efecto en la rompiente:</strong> ${surfWind.effect}
            </div>
          </div>

          <!-- Consejos de Orientación y Lectura Rápida -->
          <div class="surf-quick-tips-card">
            <div class="quick-tip-row">
              <span class="tip-icon">🟢</span>
              <div class="tip-body">
                <strong>Offshore (Viento Sur):</strong> Ideal. Peina la ola, crea tubos y deja el mar como un espejo.
              </div>
            </div>
            <div class="quick-tip-row">
              <span class="tip-icon">🔴</span>
              <div class="tip-body">
                <strong>Onshore (Viento Norte):</strong> Mar picado (chop), aplasta las olas y genera espuma.
              </div>
            </div>
            <div class="quick-tip-row">
              <span class="tip-icon">🏄‍♂️</span>
              <div class="tip-body">
                <strong>Izquierdas / Derechas:</strong> Se definen siempre mirando hacia la playa desde la ola.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. CATÁLOGO DE PLAYAS, PICOS Y FONDOS MARINOS DEL CONCEJO -->
      <div class="marine-ports-section">
        <div class="beach-section-header">
          <div>
            <h4 class="ports-title" style="margin-bottom: 2px;">
              🏖️ Rompientes, Picos de Surf & Fondos de ${isCoasting ? concejo.name : `${concejo.name} (en ${interiorRef.name})`}
            </h4>
            <span class="beach-section-subtitle">
              Picos bautizados, tipo de fondo (arena/roca), dirección de ola y marea óptima
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

              <div class="beach-details-grid">
                ${p.picos ? `
                  <div class="beach-detail-item full-width">
                    <span class="detail-label">📍 Picos de Surf:</span>
                    <span class="detail-value highlight-pico">${p.picos}</span>
                  </div>
                ` : ''}

                <div class="beach-detail-item">
                  <span class="detail-label">🪨 Fondo Marino:</span>
                  <span class="detail-value">${p.bottom || '🏖️ Arena (Beach Break)'}</span>
                </div>

                <div class="beach-detail-item">
                  <span class="detail-label">🔄 Dirección Ola:</span>
                  <span class="detail-value">${p.waveType || '↔️ Picos A-Frame'}</span>
                </div>

                <div class="beach-detail-item">
                  <span class="detail-label">⏳ Marea Óptima:</span>
                  <span class="detail-value">${p.bestTide || 'Media Marea'}</span>
                </div>

                <div class="beach-detail-item">
                  <span class="detail-label">🎯 Nivel:</span>
                  <span class="detail-value level-badge">${p.surfLevel || 'Todos'}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}