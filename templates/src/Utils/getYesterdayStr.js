export default function getTodayStr() {
  var today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  var d = String(yesterday.getDate());
  var m = String(yesterday.getMonth() + 1);
  var y = String(yesterday.getFullYear());

  return y + "-" + m + "-" + d;
}
