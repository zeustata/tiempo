/**
 * Servicio para capas de radar meteorológico en directo de RainViewer
 */
export async function fetchRainViewerRadar() {
  try {
    const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
    if (!res.ok) throw new Error('RainViewer offline');
    const data = await res.json();
    return {
      host: data.host || 'https://tilecache.rainviewer.com',
      radar: data.radar || { past: [], nowcast: [] },
      satellite: data.satellite || {},
      generated: data.generated
    };
  } catch (err) {
    console.warn('RainViewer unavailable:', err);
    return null;
  }
}