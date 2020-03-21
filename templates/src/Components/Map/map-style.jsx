export const snowLayer = {
  id: "snow-layer",
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

export const resortLayer = {
  id: "point",
  type: "symbol",
  layout: {
    "icon-image": "mountain-15",
    "icon-allow-overlap": true,
    "icon-size": 1
  }
};
