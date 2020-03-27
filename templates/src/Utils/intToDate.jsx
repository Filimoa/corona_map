const intDates = {
  0: "2020-3-4",
  1: "2020-3-5",
  2: "2020-3-6",
  3: "2020-3-7",
  4: "2020-3-8",
  5: "2020-3-9",
  6: "2020-3-10",
  7: "2020-3-11",
  8: "2020-3-12",
  9: "2020-3-13",
  10: "2020-3-14",
  11: "2020-3-15",
  12: "2020-3-16",
  13: "2020-3-17",
  14: "2020-3-18",
  15: "2020-3-19",
  16: "2020-3-20",
  17: "2020-3-21",
  18: "2020-3-22",
  19: "2020-3-23",
  20: "2020-3-24",
  21: "2020-3-25",
  22: "2020-3-26",
  23: "2020-3-27",
  24: "2020-3-28",
  25: "2020-3-29",
  26: "2020-3-30",
  27: "2020-3-31",
  28: "2020-4-1",
  29: "2020-4-2",
  30: "2020-4-3",
  31: "2020-4-4",
  32: "2020-4-5"
};

export default function intToDate(days_int) {
  var result = new Date("2020/3/4");
  result.setDate(result.getDate() + days_int);

  var d = String(result.getDate());
  var m = String(result.getMonth() + 1);
  var y = String(result.getFullYear());

  return y + "-" + m + "-" + d;
}
