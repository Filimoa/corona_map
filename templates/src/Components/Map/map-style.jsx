export const snowLayer = {
  id: "state-layer",
  type: "fill",
  paint: {
    "fill-color": {
      property: "group",
      stops: [
        [0, "transparent"],
        [1, "#65befa"],
        [2, "#35A3F8"],
        [3, "#0087F2"],
        [4, "#0278D4"]
      ]
    },
    "fill-opacity": 0.5
  }
};

export const changeLayer = {
  id: "point",
  type: "line",
  "line-opacity": 0.5
};
