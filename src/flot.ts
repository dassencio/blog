import jQuery from "jquery";
import mathjax from "@/mathjax";

declare global {
  interface Window {
    jQuery: typeof jQuery;
  }
}

window.jQuery = jQuery;

let readyToRender = false;

interface PlotRequest {
  data: object;
  options: object;
  target: string;
}

const plotQueue: PlotRequest[] = [];

function plot(target: string, data: object, options: object) {
  if (!readyToRender) {
    plotQueue.push({ data, options, target });
  } else {
    document.fonts.ready.then(() => {
      // @ts-ignore
      window.jQuery.plot(target, data, options);
      mathjax.render();
    });
  }
}

const script = document.createElement("script");
script.src = "/thirdparty/flot-0.8.3.js";
script.async = true;
document.head.appendChild(script);

script.onload = () => {
  readyToRender = true;
  plotQueue.forEach((request) =>
    plot(request.target, request.data, request.options)
  );
};

export default { plot };
