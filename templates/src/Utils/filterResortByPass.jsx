import gjfilter from "geojson-filter";

export default function filterResortByPass(geojson, passType) {
  // filter resort geojson by filter type
  if (passType == "noFilter") {
    return geojson;
  } else {
    const filter = ["==", "pass_type", passType];
    // console.log("Inside function", filteredGeojson);
    return gjfilter(geojson, filter);
  }
}
