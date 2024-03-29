<template>
  <div :id="plotId" class="chart"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import _ from "lodash";
import flot from "@/flot";

onMounted(() => {
  debouncedPlot();
  window.addEventListener("resize", debouncedPlot);
});
onUnmounted(() => {
  window.removeEventListener("resize", debouncedPlot);
});

const props = defineProps<{
  data: object;
  options: object;
}>();

const gridLineColor = "#e0e0e0";

const options = _.merge(
  {
    /*
     * Default colors:
     *
     * 0: United Nations Blue
     * 1: Baby Blue Eyes
     * 2: Brink Pink (approximately)
     */
    colors: ["#5b92e5", "#a1caf1", "#ff6696"],
    grid: {
      backgroundColor: "white",
      borderWidth: 1,
    },
    legend: {
      position: "nw",
      show: true,
    },
    series: {
      shadowSize: 0,
    },
    xaxis: {
      tickColor: gridLineColor,
    },
    yaxis: {
      position: "left",
      tickColor: gridLineColor,
    },
  },
  props.options
);

const plotId = _.uniqueId("__flot-chart__");

const debouncedPlot = _.debounce(() => {
  flot.plot(`#${plotId}`, props.data, options);
}, 100);
</script>

<style scoped lang="scss">
.chart {
  height: 20 * $base-length;
  padding-bottom: $view-subfigure-vertical-gap !important;
  width: 35 * $base-length;
}
:deep(.legend > div) {
  display: none;
}
:deep(.legend table) {
  background-color: white;
  border-spacing: $view-flot-chart-legend-label-space-around;
  border: $view-flot-chart-legend-border;
}
:deep(.legendLabel),
:deep(.tickLabel) {
  color: $view-text-color-normal;
}
:deep(.xaxisLabel) {
  margin-top: $view-subfigure-vertical-gap;
}
</style>
