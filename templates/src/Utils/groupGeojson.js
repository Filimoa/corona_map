export default function groupGeojson(geojson, date) {
  const format_date = "pct-" + date;

  for (var key of Object.keys(geojson.features)) {
    let num_cases = geojson.features[key].properties[format_date];

    if (num_cases < 50) {
      geojson.features[key].properties.group = 1;
    } else if (num_cases < 100) {
      geojson.features[key].properties.group = 2;
    } else if (num_cases < 150) {
      geojson.features[key].properties.group = 3;
    } else {
      console.log("activated");
      geojson.features[key].properties.group = 4;
    }
  }
  return geojson;
}
