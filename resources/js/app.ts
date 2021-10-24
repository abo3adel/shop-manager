require("./bootstrap");

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";

// @ts-ignore
import AppLayout from "@/Layouts/AppLayout.vue";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { toast, alert, confirm } from "./helpers/swal";

import mitt from "mitt";
const emitter = mitt();

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = require(`./Pages/${name}`).default;
        page.layout = page.layout || AppLayout;
        return page;
    },
    // @ts-ignore
    setup({ el, app, props, plugin }) {
        const mount = createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(VueSweetalert2)
            // @ts-ignore
            .mixin({ methods: { route, toast, alert, confirm } });

        mount.config.globalProperties.emitter = emitter;

        return mount.mount(el);
    },
});

InertiaProgress.init({ color: "#4B5563" });