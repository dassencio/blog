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
 * @returns Input string with special HTML characters escaped
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
 * @returns Input string with smallest indentation level set to zero spaces
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
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement instanceof HTMLElement) {
      /*
       * The timeout is needed to ensure that the element is scrolled into view
       * after the DOM has been fully rendered, otherwise the scroll position
       * may be incorrect.
       */
      setTimeout(() => targetElement.scrollIntoView(), 200);
    }
  } else {
    window.scrollTo(0, 0);
  }
}

/**
 * Callback function which must be triggered whenever a view (e.g. a blog post)
 * is mounted.
 */
export function onViewMounted() {
  mathjax.render();
  scrollToTarget();
}

/**
 * Callback function which must be triggered whenever a view is updated.
 */
export function onViewUpdated() {
  mathjax.render();
}

/**
 * Converts a figure ID into its associated HTML element ID.
 */
export function figureIdToHtmlId(id: string) {
  return `figure-${id}`;
}

/**
 * Generates an HTML anchor element for a figure.
 *
 * @param id - Figure ID
 * @param number - Figure number
 * @param subfigureLabel - Subfigure label (e.g. "a")
 * @param capitalized - Whether the first text character should be capitalized
 *
 * @returns HTML anchor element as a string
 */
export function figureLink(
  id: string,
  number: number,
  subfigureLabel = "",
  capitalized = false
) {
  return `<a href="#${figureIdToHtmlId(id)}">${
    capitalized ? "Figure" : "figure"
  } ${number}${subfigureLabel}</a>`;
}

/**
 * Converts a reference ID into its associated HTML element ID.
 */
export function referenceIdToHtmlId(id: string) {
  return `reference-${id}`;
}

/**
 * Converts a table ID into its associated HTML element ID.
 */
export function tableIdToHtmlId(id: string) {
  return `table-${id}`;
}

/**
 * Generates an HTML anchor element for a table.
 *
 * @param id - Table ID
 * @param number - Table number
 * @param capitalized - Whether the first text character should be capitalized
 *
 * @returns HTML anchor element as a string
 */
export function tableLink(id: string, number: number, capitalized = false) {
  return `<a href="#${tableIdToHtmlId(id)}">${
    capitalized ? "Table" : "table"
  } ${number}</a>`;
}
