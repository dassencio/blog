import { createApp } from "vue";
import "ress";
import App from "@/App.vue";
import BlockEquation from "@/components/BlockEquation.vue";
import router from "@/router";

const app = createApp(App);

app.component("BlockEquation", BlockEquation);

app.use(router);

app.mount("#app");
