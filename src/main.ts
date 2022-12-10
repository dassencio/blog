import { createApp } from "vue";
import "ress";
import "highlight.js/styles/github-gist.css";
import App from "@/App.vue";
import VueHighlightJS from "vue3-highlightjs";
import BaseButton from "@/components/BaseButton.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseSubfigure from "@/components/BaseSubfigure.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import EquationBlock from "@/components/EquationBlock.vue";
import FigureBlock from "@/components/FigureBlock.vue";
import FigureLink from "@/components/FigureLink.vue";
import FlotChart from "@/components/FlotChart.vue";
import InputField from "@/components/InputField.vue";
import ListBlock from "@/components/ListBlock.vue";
import ListItem from "@/components/ListItem.vue";
import MapBlock from "@/components/MapBlock.vue";
import ResponsiveForm from "@/components/ResponsiveForm.vue";
import ResponsiveImage from "@/components/ResponsiveImage.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import TableBlock from "@/components/TableBlock.vue";
import TableLink from "@/components/TableLink.vue";
import router from "@/router";

const app = createApp(App);

app.component("BaseButton", BaseButton);
app.component("BaseCheckbox", BaseCheckbox);
app.component("BaseSubfigure", BaseSubfigure);
app.component("CodeBlock", CodeBlock);
app.component("EquationBlock", EquationBlock);
app.component("FigureBlock", FigureBlock);
app.component("FigureLink", FigureLink);
app.component("FlotChart", FlotChart);
app.component("InputField", InputField);
app.component("ListBlock", ListBlock);
app.component("ListItem", ListItem);
app.component("MapBlock", MapBlock);
app.component("ResponsiveForm", ResponsiveForm);
app.component("ResponsiveImage", ResponsiveImage);
app.component("SectionTitle", SectionTitle);
app.component("TableBlock", TableBlock);
app.component("TableLink", TableLink);

app.use(router);
app.use(VueHighlightJS);

app.mount("#app");
