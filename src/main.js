import { createApp } from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import router from './router'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from "sweetalert2";


createApp(App)
    .mixin({
        mounted() {

        },

        methods: {
            showSuccessToast(text,title="") {
                this.$swal({
                    html: `<span style="color:#fff">${text}</span>`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    padding: '0 10px',
                    iconColor: "#fff",
                    timerProgressBar: true,
                    background: "#155f10",
                    icon: 'success',
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            },

            showErrorToast(text,title="") {
                this.$swal({
                    title: title,
                    html: `<span style="color:#fff">${text}</span>`,
                    toast: true,
                    icon: 'error',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    padding: '0 10px',
                    iconColor: "#fff",
                    timerProgressBar: true,
                    background: "#7d0f0f",
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            }
        }
    })
    .use(VueSweetalert2)
    .use(VueLoading)
    .use(router)
    .mount('#app')
