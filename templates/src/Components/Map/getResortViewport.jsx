export default function getResortViewport(resort) {
  // Powdamap shortens longitude to long and this converts
  // it back for mapbox when setting the viewport
  return {
    longitude: resort["long"],
    latitude: resort["lat"],
    zoom: 7
  };
}
