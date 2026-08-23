/**
 * Gestión de favoritos y preferencias de usuario
 */
const STORAGE_KEY = 'meteoasturias_prefs_v2';

export function getPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {
      lastConcejo: 'gijon',
      favorites: ['gijon', 'oviedo', 'sotres', 'castrillon', 'pajares'],
      units: 'metric', // metric (km/h) | knots (kt)
      autoRefresh: true
    };
    return JSON.parse(raw);
  } catch (e) {
    return { lastConcejo: 'gijon', favorites: ['gijon', 'oviedo', 'sotres'], units: 'metric', autoRefresh: true };
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
  return prefs.favorites.includes(concejoId);
}