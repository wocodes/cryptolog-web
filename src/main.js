import { createApp } from 'vue';
import store from './store';
import App from './App.vue';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './main.css';

import router from './router';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import {DEV_WHITELIST} from '../helpers/constants';
import VueSplash from 'vue-splash';
// import SplitCarousel from "vue-split-carousel"; // working better than others
// import VueSplide from '@splidejs/vue-splide';
// import '@splidejs/splide/dist/css/splide.min.css';

createApp(App)
    .mixin({
        data() {
            return {
                // store: useStore(),
                user: this.$store.state.user,
                loader: null,
                allowedToViewDevUpdate: false,
                tipsStyle: 'font-sm md:font-md bg-blue-100 border-t-4 border-blue-500 rounded-b text-teal-900 my-3 p-1 shadow-md flex text-left'
            };
        },

        mounted() {
            this.allowedToViewDevUpdate = DEV_WHITELIST.includes(this.$store.state.user.email);
        },

        methods: {
            showSuccessToast(text,title='') {
                this.$swal({
                    title,
                    html: `<span style="color:#fff">${text}</span>`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    padding: '0 10px',
                    iconColor: '#fff',
                    timerProgressBar: true,
                    background: '#64ac5e',
                    icon: 'success',
                    didOpen: toast => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            },

            showErrorToast(text, title='') {
                let errors = '<ul>';

                if (text.response.data.errors) {
                    let errorsArr = Object.values(text.response.data.errors);
                    errorsArr = errorsArr.flat();
                    errorsArr.forEach(error => errors += `<li>${error}</li>`);
                }
                errors += '</ul>';

                if (text.response.data.message) {
                    errors = text.response.data.message
                }

                this.$swal({
                    title,
                    html: `<span style="color:#fff">${errors}</span>`,
                    toast: true,
                    icon: 'error',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    padding: '0 10px',
                    iconColor: '#fff',
                    timerProgressBar: true,
                    background: '#7d0f0f',
                    didOpen: toast => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            },

            showLoader(state) {
                this.loader = this.$loading.show({
                    container: this.$refs.pageContainer,
                    lockScroll: true,
                    loader: "bars",
                    color: '#1565D8',
                    blur: '20px',
                    isFullPage: false,
                }, {
                    after: `${state} Please wait...`,
                });
            },

            hideLoader() {
                this.loader.hide();
            },

            gotoSetupStep(step) {
                if(step === 'complete') {
                    const user = this.$store.state.user;
                    user.finished_setup = 1;

                    this.$store.commit('storeUser', user);

                    // this.showLoader();
                    // let vm = this;
                    // setTimeout(() => {
                    //     vm.hideLoader()
                    // }, 3000)
                } else {
                    this.$store.commit('updateSetupStep', step)
                }
            }
        }
    })
    .use(VueSweetalert2)
    .use(VueLoading)
    .use(router)
    .use(store)
    // .use(NProgress)
    .use(VueSplash)
    // .use(VueSplide)
    // .use(SplitCarousel)
    .mount('#app');
