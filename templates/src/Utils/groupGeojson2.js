import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";

export default function updatePercentiles(featureCollection, accessor) {
  const { features } = featureCollection;
  const scale = scaleQuantile()
    .domain(features.map(accessor))
    .range(range(9));
  return {
    type: "FeatureCollection",
    features: features.map(f => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        group: scale(value)
      };
      return { ...f, properties };
    })
  };
}