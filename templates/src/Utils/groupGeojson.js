const all_filter_criteria = {
  pct: {
    0: [1000, 30],
    1: [30, 10],
    2: [10, 5],
    3: [5, 3],
    4: [3, 1],
    5: [1, 0]
  },
  cases: {
    0: [0, 1],
    1: [1, 10],
    2: [10, 100],
    3: [100, 1000],
    4: [1000, 5000],
    5: [5000, 100000]
  },
  tests: {
    0: [0, 1],
    1: [1, 10],
    2: [10, 100],
    3: [100, 1000],
    4: [1000, 5000],
    5: [5000, 100000]
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

  return {
    type: "FeatureCollection",
    features: features.map(f => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        group: groupVar(value)
      };
      return { ...f, properties };
    })
  };
}
