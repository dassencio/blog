// Global MathJax configuration.
const mathJaxConfig = {
  startup: {
    pageReady: () => (readyToRender = true),
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

let readyToRender = false;
let renderTimerId = 0;

// Download and configure MathJax as soon as this module is first loaded.
const script = document.createElement("script");
script.src = "/thirdparty/tex-svg-3.2.2.js";
script.async = true;
document.head.appendChild(script);

/**
 * Render all mathematics text in the page.
 */
function render() {
  if (renderTimerId) {
    clearTimeout(renderTimerId);
  }
  if (!readyToRender) {
    // MathJax has not been loaded yet, so try again in 50ms.
    renderTimerId = setTimeout(render, 50);
  } else {
    window.MathJax.texReset();
    window.MathJax.typeset();
  }
}

export default { render };
