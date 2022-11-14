/**
 * Converts a date into its representation in the ISO 8601 format.
 *
 * @param year - Full year as an integer value
 * @param month - Month as an integer value (1-12)
 * @param day - Day as as an integer value (1-31)
 * @returns Date in format "YYYY-MM-DD"
 */
export function dateToString(year: number, month: number, day: number): string {
  const padZero = (n: number) => (n < 10 ? `0${n}` : n);
  return `${year}-${padZero(month)}-${padZero(day)}`;
}
