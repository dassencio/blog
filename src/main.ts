import { createApp } from "vue";
import "ress";
import App from "@/App.vue";
import BaseButton from "@/components/BaseButton.vue";
import BinaryOption from "@/components/BinaryOption.vue";
import BlockEquation from "@/components/BlockEquation.vue";
import InputField from "@/components/InputField.vue";
import MultiModeGrid from "@/components/MultiModeGrid.vue";
import ResponsiveForm from "@/components/ResponsiveForm.vue";
import router from "@/router";

const app = createApp(App);

app.component("BaseButton", BaseButton);
app.component("BinaryOption", BinaryOption);
app.component("BlockEquation", BlockEquation);
app.component("InputField", InputField);
app.component("MultiModeGrid", MultiModeGrid);
app.component("ResponsiveForm", ResponsiveForm);

app.use(router);

app.mount("#app");
