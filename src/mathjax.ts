// Global MathJax configuration.
const mathJaxConfig = {
  startup: {
    pageReady: render,
  },
  svg: {
    displayAlign: "left",
  },
  tex: {
    displayMath: [["$$", "$$"]],
    inlineMath: [["$", "$"]],
    macros: {
      ColonEq: "\\mathrel{\\vcenter{:}}=",
      Vec: ["\\mathbf{#1}", 1],
    },
    tags: "all",
  },
  texReset: () => undefined,
  typeset: () => undefined,
};

declare global {
  interface Window {
    MathJax: typeof mathJaxConfig;
  }
}

window.MathJax = mathJaxConfig;

// Download and configure MathJax as soon as this module is first loaded.
const script = document.createElement("script");
script.src = "/thirdparty/tex-svg-3.2.2.js";
script.async = true;
document.head.appendChild(script);

/**
 * Renders all mathematics text in the page.
 *
 * This function can be safely called multiple times, but it may not produce
 * the expected results if new equations and/or labels are added inline to
 * the page after the first render. Provided that doesn't happen, it will work
 * as expected.
 *
 * See https://docs.mathjax.org/en/latest/web/typeset.html for more details.
 */
function render() {
  window.MathJax.texReset();
  window.MathJax.typeset();
}

export default { render };
