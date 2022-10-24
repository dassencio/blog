import { createApp } from "vue";
import "ress";
import App from "@/App.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseFigure from "@/components/BaseFigure.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import EquationBlock from "@/components/EquationBlock.vue";
import InputField from "@/components/InputField.vue";
import MultiModeGrid from "@/components/MultiModeGrid.vue";
import ResponsiveForm from "@/components/ResponsiveForm.vue";
import router from "@/router";

const app = createApp(App);

app.component("BaseButton", BaseButton);
app.component("BaseCheckbox", BaseCheckbox);
app.component("BaseFigure", BaseFigure);
app.component("CodeBlock", CodeBlock);
app.component("EquationBlock", EquationBlock);
app.component("InputField", InputField);
app.component("MultiModeGrid", MultiModeGrid);
app.component("ResponsiveForm", ResponsiveForm);

app.use(router);

app.mount("#app");
