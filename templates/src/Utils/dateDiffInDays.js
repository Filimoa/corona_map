const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
export default function dateDiffInDays(date1, date2) {
  const a = new Date(date1);
  const b = new Date(date2);

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}