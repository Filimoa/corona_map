export default function flattenGeojson(obj) {
  // geojson comes in feature list where "geometry" and proprties
  // are seperate objects. This flattens this into 1 object.
  const flattened = {};

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flattened, flattenGeojson(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });

  return flattened;
}
