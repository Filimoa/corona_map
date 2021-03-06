export const fillLayer = {
  id: "state-layer",
  type: "fill",
  paint: {
    "fill-color": {
      property: "group",
      stops: [
        [0, "transparent"],
        [1, " #f9a8a8"],
        [2, "#d78686"],
        [3, "#b66666"],
        [4, "#954647"],
        [5, "#74272a"]
      ]
    },
    "fill-opacity": 0.5
  }
};

export const quarantineLayer = {
  id: "point",
  type: "line",
  paint: {
    "line-color": {
      property: "group",
      stops: [
        [0, "transparent"],
        [1, "transparent"],
        [2, "black"]
      ]
    },
    // "line-dasharray": [2, 2],
    "line-width": 3
  }
};
