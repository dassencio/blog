// Global MathJax configuration.
// @ts-expect-error (no type definition available for MathJax).
window.MathJax = {
  chtml: {
    displayAlign: "left",
  },
  loader: {
    load: ["[tex]/tagformat"],
  },
  options: {
    renderActions: {
      assistiveMml: [],
    },
    menuOptions: {
      settings: {
        assistiveMml: false,
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
      D: ["\\mathop{d#1}", 1], // Differential (with spaces around).
      Di: ["d#1", 1], // Differential (inline, no spaces around).
      DD: ["\\frac{d#1}{d#2}", 2], // Derivative (fraction).
      DDi: ["d#1/d#2", 2], // Derivative (inline, flat fraction).
      DDo: ["\\frac{d}{d#1}", 1], // Derivative as an operator (fraction).
      SumSub: ["\\mathop{\\sum_{#1}}_{#2}", 2], // Sum with two subscripts.
    },
    packages: {
      "[+]": ["tagformat"],
    },
    tags: "all",
    tagformat: {
      id: (id: string) => `equation-${id}`,
    },
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
