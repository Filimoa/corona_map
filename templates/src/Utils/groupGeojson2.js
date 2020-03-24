import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";

const all_filter_criteria = {
  pct: { 0: [1000, 30], 1: [30, 10], 2: [10, 5], 3: [5, 3], 4: [3, 0] },
  cases: {
    0: [0, 10],
    1: [10, 100],
    2: [100, 1000],
    3: [1000, 10000],
    4: [10000, 100000]
  },
  tests: {
    0: [0, 10],
    1: [10, 100],
    2: [100, 1000],
    3: [1000, 10000],
    4: [10000, 100000]
  }
};

export default function updatePercentiles(
  featureCollection,
  accessor,
  displayType
) {
  const filter_criteria = all_filter_criteria[displayType];

  function groupVar(x) {
    var group = -1;

    for (var key in filter_criteria) {
      if (
        x < Math.max(...filter_criteria[key]) &&
        x >= Math.min(...filter_criteria[key])
      ) {
        group = parseInt(key);
        break;
      }
    }

    return group;
  }

  const { features } = featureCollection;
  const scale = scaleQuantile()
    .domain(features.map(accessor))
    .range(range(9));
  return {
    type: "FeatureCollection",
    features: features.map(f => {
      const value = accessor(f);
      console.log(value);
      const properties = {
        ...f.properties,
        value,
        // group: group(features.map(accessor), displayType)
        group: groupVar(value)
      };
      return { ...f, properties };
    })
  };
}
