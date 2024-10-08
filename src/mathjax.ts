// Global MathJax configuration.
// @ts-expect-error (no type definition available for MathJax).
window.MathJax = {
  // Custom flag that is not part of the official MathJax configuration.
  readyToRender: false,

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
    pageReady: () => {
      // @ts-expect-error (no type definition available for MathJax).
      window.MathJax.readyToRender = true;
      render();
    },
  },
  svg: {
    displayAlign: "left",
  },
  tex: {
    displayMath: [["$$", "$$"]],
    inlineMath: [["$", "$"]],
    macros: {
      // General math.
      ColonEq: "\\mathrel{\\vcenter{:}}=", // Equal by definition sign.
      Digits: "\\mathrm{digits}", // Digits operator.
      Floor: ["\\left\\lfloor#1\\right\\rfloor", 1], // Floor function.
      IdentityMatrixThree: "\\MatrixThreeThree{1}{0}{0}{0}{1}{0}{0}{0}{1}", // 3x3 identity matrix.
      Lev: "\\mathrm{lev}", // Levenshtein distance operator.
      Matrix: ["\\begin{pmatrix}#1\\end{pmatrix}", 1], // Matrix environment.
      MatrixThreeOne: ["\\Matrix{#1 \\\\ #2 \\\\ #3}", 3], // 3x1 matrix.
      MatrixFourOne: ["\\Matrix{#1 \\\\ #2 \\\\ #3 \\\\ #4}", 4], // 4x1 matrix.
      MatrixTwoOne: ["\\Matrix{#1 \\\\ #2}", 2], // 2x1 matrix.
      MatrixTwoTwo: ["\\Matrix{#1 & #2 \\\\ #3 & #4}", 4], // 2x2 matrix.
      MatrixThreeThree: [
        "\\Matrix{#1 & #2 & #3 \\\\ #4 & #5 & #6 \\\\ #7 & #8 & #9}",
        9,
      ], // 3x3 matrix.
      Real: "\\mathbb{R}", // Real numbers.
      Size: "\\mathrm{size}", // Size operator.
      SumSub: ["\\mathop{\\sum_{#1}}_{#2}", 2], // Sum with two subscripts.
      SupPar: ["{\\small{(#1)}}", 1], // Superscripted label with parentheses.
      Vec: ["\\mathbf{#1}", 1], // Vector notation for Latin symbols.
      Vecg: ["\\pmb{#1}", 1], // Vector notation for Greek symbols.

      // Differential operators.
      Curl: "\\nabla \\times", // Curl operator.
      D: ["\\mathop{d#1}", 1], // Differential (with spaces around).
      Di: ["d#1", 1], // Differential (inline, no spaces around).
      Div: "\\nabla \\cdot", // Divergence operator.
      DD: ["\\frac{d#1}{d#2}", 2], // Derivative (fraction).
      DDi: ["d#1/d#2", 2], // Derivative (inline, flat fraction).
      DDo: ["\\frac{d}{d#1}", 1], // Derivative as an operator (fraction).
      Grad: "\\nabla", // Gradient operator.
      Lap: "\\nabla^2", // Laplacian operator.
      P: ["\\partial_{#1}", 1], // Partial derivative (subscripted).
      PP: ["\\frac{\\partial #1}{\\partial #2}", 2], // Partial derivative (fraction).
      PPo: ["\\frac{\\partial}{\\partial #1}", 1], // Partial derivative as an operator (fraction).
      PPno: ["\\frac{\\partial^{#1}}{\\partial #2^{#1}}", 2], // N-th partial derivative as an operator (fraction).

      // Measurement units.
      Ampere: "\\,\\mathrm{A}",
      Celsius: "\\,\\mathrm{^{\\circ}C}",
      CelsiusSlim: "\\mathrm{^{\\circ}C}",
      Coulomb: "\\,\\mathrm{C}",
      Day: "\\,\\mathrm{d}",
      Fahrenheit: "\\,\\mathrm{^{\\circ}F}",
      FahrenheitSlim: "\\mathrm{^{\\circ}F}",
      Gram: "\\,\\mathrm{g}",
      Joule: "\\,\\mathrm{J}",
      Kilobyte: "\\,\\mathrm{kB}",
      KilobyteSlim: "\\mathrm{kB}",
      Kilocalorie: "\\,\\mathrm{kcal}",
      Kilogram: "\\,\\mathrm{kg}",
      Kilojoule: "\\,\\mathrm{kJ}",
      Kilometer: "\\,\\mathrm{km}",
      Megaton: "\\,\\mathrm{Mt}",
      Meter: "\\,\\mathrm{m}",
      Milliampere: "\\,\\mathrm{mA}",
      Picometer: "\\,\\mathrm{pm}",
      PicometerSlim: "\\mathrm{pm}",
      Second: "\\,\\mathrm{s}",
      Volt: "\\,\\mathrm{V}",
      Watt: "\\,\\mathrm{W}",
      Year: "\\,\\mathrm{yr}",

      // Division of units (e.g. m/s).
      Per: "/\\!",
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
  // @ts-expect-error (no type definition available for MathJax).
  if (window.MathJax.readyToRender && document.readyState === "complete") {
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
