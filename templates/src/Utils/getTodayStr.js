export default function getTodayStr() {
  var today = new Date();

  var d = String(today.getDate());
  var m = String(today.getMonth() + 1);
  var y = String(today.getFullYear());

  return y + "-" + m + "-" + d;
}
