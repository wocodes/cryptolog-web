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
import {getFromStorage} from "../helpers/storage";
import {DEV_WHITELIST, USER_EMAIL_KEY} from "../helpers/constants";


createApp(App)
    .mixin({
        data() {
            return {
                userEmail: getFromStorage(USER_EMAIL_KEY),
                loader: null,
                allowedToViewDevUpdate: false,
                tipsStyle: 'bg-blue-100 border-t-4 border-blue-500 rounded-b text-teal-900 my-3 p-1 shadow-md flex text-left',
            }
        },

        mounted() {
            this.allowedToViewDevUpdate = DEV_WHITELIST.includes(this.userEmail)
        },

        methods: {
            showSuccessToast(text,title="") {
                this.$swal({
                    title: title,
                    html: `<span style="color:#fff">${text}</span>`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    padding: '0 10px',
                    iconColor: "#fff",
                    timerProgressBar: true,
                    background: "#64ac5e",
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
            },

            showLoader() {
                this.loader = this.$loading.show();
            },

            hideLoader() {
                this.loader.hide();
            }
        }
    })
    .use(VueSweetalert2)
    .use(VueLoading)
    .use(router)
    .mount('#app')
