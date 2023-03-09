// Global MathJax configuration.
// @ts-expect-error (no type definition available for MathJax).
window.MathJax = {
  chtml: {
    displayAlign: "left",
  },
  options: {
    renderActions: {
      assistiveMml: [],
    },
    menuOptions: {
      settings: {
        assistiveMml: true,
      },
    },
  },
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
};

// Download and configure MathJax as soon as this module is first loaded.
const script = document.createElement("script");
script.src = "/thirdparty/mathjax-3.2.2/es5/tex-chtml.js";
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
  if (document.readyState === "complete") {
    // @ts-expect-error (no type definition available for MathJax).
    window.MathJax.texReset();
    // @ts-expect-error (no type definition available for MathJax).
    window.MathJax.typeset();
    // @ts-expect-error (no type definition available for MathJax).
    window.MathJax.startup.document.menu.menu.find("Accessibility").hide();
  } else {
    document.onreadystatechange = () => render();
  }
}

export default { render };
