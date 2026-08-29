/**
 * Gestión de favoritos y preferencias de usuario para MeteoAstur Lode
 */
const STORAGE_KEY = 'meteoasturlode_prefs_v3';

export function getPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        lastConcejo: 'gijon',
        favorites: [], // Vacío por defecto
        units: 'metric', // metric (km/h) | knots (kt)
        model: 'best_match',
        iconTheme: 'astur', // astur (SVG personalizados) | classic (emojis)
        autoRefresh: true
      };
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.favorites)) {
      parsed.favorites = [];
    }
    if (!parsed.model) {
      parsed.model = 'best_match';
    }
    if (!parsed.iconTheme) {
      parsed.iconTheme = 'astur';
    }
    return parsed;
  } catch (e) {
    return {
      lastConcejo: 'gijon',
      favorites: [],
      units: 'metric',
      model: 'best_match',
      iconTheme: 'astur',
      autoRefresh: true
    };
  }
}

export function savePreferences(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Error saving preferences', e);
  }
}

export function toggleFavorite(concejoId) {
  const prefs = getPreferences();
  if (!Array.isArray(prefs.favorites)) prefs.favorites = [];
  
  const index = prefs.favorites.indexOf(concejoId);
  if (index >= 0) {
    prefs.favorites.splice(index, 1);
  } else {
    prefs.favorites.push(concejoId);
  }
  savePreferences(prefs);
  return prefs.favorites;
}

export function isFavorite(concejoId) {
  const prefs = getPreferences();
  if (!Array.isArray(prefs.favorites)) return false;
  return prefs.favorites.includes(concejoId);
}