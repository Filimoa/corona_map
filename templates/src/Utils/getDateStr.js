export default function getDateStr(date) {
  // converts date object to string YYYY-MM-DD
  var d = String(date.getDate());
  var m = String(date.getMonth() + 1);
  var y = String(date.getFullYear());

  var date_str = y + "-" + m + "-" + d;

  return date_str;
}
