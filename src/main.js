import { createApp } from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import router from './router'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


createApp(App)
    .mixin({
        mounted() {

        },

        methods: {

        }
    })
    .use(VueLoading)
    .use(router)
    .mount('#app')
