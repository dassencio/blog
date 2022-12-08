import mathjax from "@/mathjax";

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

/**
 * Escapes special HTML characters in a string.
 *
 * @param text - Input string
 * @returns Input string with special HTML characters escaped.
 */
export function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Removes excess indentation from a string.
 *
 * @param text - Input string
 * @returns Input string with smallest indentation level set to zero spaces.
 */
export function removeExcessIndentation(text: string) {
  const lines = text.split("\n");
  const indentationLevel = Math.min(
    ...lines
      .filter((line) => line.trim() !== "")
      .map((line) => line.length - line.trimStart().length)
  );
  return lines.map((line) => line.slice(indentationLevel)).join("\n");
}

/**
 * Scrolls to the page element associated with the current URL hash.
 */
export function scrollToTarget() {
  const hash = window.location.hash || "#app";
  const targetId = decodeURIComponent(hash.substring(1));
  document.getElementById(targetId)?.scrollIntoView();
}

/**
 * Callback function which must be triggered whenever a view (e.g. a blog post)
 * is mounted.
 */
export function onViewMounted() {
  mathjax.render();
  scrollToTarget();
}
