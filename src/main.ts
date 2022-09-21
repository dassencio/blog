import { createApp } from "vue";
import "ress";
import App from "@/App.vue";
import BlockEquation from "@/components/BlockEquation.vue";
import MultiModeGrid from "@/components/MultiModeGrid.vue";
import router from "@/router";

const app = createApp(App);

app.component("BlockEquation", BlockEquation);
app.component("MultiModeGrid", MultiModeGrid);

app.use(router);

app.mount("#app");
