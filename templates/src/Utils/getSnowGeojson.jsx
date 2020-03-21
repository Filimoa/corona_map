export default async function getSnowGeojson(forecastTimeframe) {
  try {
    let response = await fetch("/get-snow-geojson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ forecastTimeframe })
    });
    return response.json();
  } catch {
    return null;
  }
}
