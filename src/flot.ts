import jQuery from "jquery";
import mathjax from "@/mathjax";

declare global {
  interface Window {
    jQuery: typeof jQuery;
  }
}

type plotFunction = (target: string, data: object, options: object) => void;

type JQueryFlot = typeof jQuery & { plot: plotFunction };

window.jQuery = jQuery;

interface PlotRequest {
  data: object;
  options: object;
  target: string;
}

const plotQueue: PlotRequest[] = [];

function plot(target: string, data: object, options: object) {
  if (!(window.jQuery as JQueryFlot).plot) {
    plotQueue.push({ data, options, target });
  } else {
    document.fonts.ready.then(() => {
      (window.jQuery as JQueryFlot).plot(target, data, options);
      mathjax.render();
    });
  }
}

const script = document.createElement("script");
script.src = "/thirdparty/flot-0.8.3.js";
script.async = true;
document.head.appendChild(script);

script.onload = () => {
  plotQueue.forEach((request) =>
    plot(request.target, request.data, request.options)
  );
};

export default { plot };
