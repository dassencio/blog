/**
 * Convert a date into a string in the format "YYYY-MM-DD".
 *
 * @param year Full year as an integer value.
 * @param month Month as an integer value (1-12).
 * @param day Day as as an integer value (1-31).
 */
export function dateToString(year: number, month: number, day: number): string {
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error(`Invalid date: ${year}-${month}-${day}`);
  }
  return date.toISOString().split("T")[0];
}
