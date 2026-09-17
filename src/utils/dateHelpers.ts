/**
 * Returns a local calendar date string formatted as YYYY-MM-DD.
 * Unlike Date.prototype.toISOString().split('T')[0], this helper uses
 * the user's local timezone (getFullYear, getMonth, getDate) so dates
 * never shift by +/- 1 day due to UTC conversion in the late evening or early morning.
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Combines a YYYY-MM-DD calendar date string with the current local time of day
 * (hours, minutes, seconds, milliseconds) and returns an ISO 8601 string.
 * This preserves chronological ordering in expense ledgers when logging items
 * on the current day or past dates.
 */
export function parseDateWithCurrentTime(dateStr: string): string {
  const now = new Date();
  const parts = dateStr.split('-').map(Number);
  if (parts.length === 3 && !parts.some(isNaN)) {
    const [year, month, day] = parts;
    const target = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    return target.toISOString();
  }
  return new Date().toISOString();
}
