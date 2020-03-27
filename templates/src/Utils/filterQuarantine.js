const filter_criteria = {
  1: "partial",
  2: "Stay at home"
};

export default function filterQuarantine(
  featureCollection,
  accessor,
  quarantineData,
  date
) {
  const filterDate = new Date(date.replace(/-/g, "/"));

  function groupVar(x) {
    // ex: x = "Ohio"
    var group = 0;

    if (x in quarantineData) {
      var stateDate = quarantineData[x]["date"];

      if (stateDate) {
        stateDate = new Date(stateDate[0].replace(/-/g, "/"));
        if (stateDate <= filterDate) {
          group = 2;
        }
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
