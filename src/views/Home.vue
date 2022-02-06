<template>
  <div class="text-left">
    <div>
      <div class="md:pl-36" style="background-image:url('/images/bg-1.png');background-size: cover">
        <div class="p-4 grid grid-cols-3">
          <h1 class="col-span-1 text-2xl font-bold text-white font-sans">Assetlog</h1>

          <ul class="col-span-2 md:mr-36 mt-2 text-right inline-block">
<!--            <li class="text-sm inline-block">-->
<!--              <router-link :to="{name: 'about'}"-->
<!--                           class="text-gray-200 py-1 px-4 right-2">About-->
<!--              </router-link>-->
<!--            </li>-->

            <li class="text-sm inline-block mx-1">
              <router-link :to="{name: 'login'}"
                           class="bg-white text-blue-600 rounded-full py-1 px-4 right-2 hover:bg-black hover:text-white">Login
              </router-link>
            </li>

            <li class="text-sm inline-block mx-1">
              <router-link :to="{name: 'register'}"
                           class="bg-blue-600 text-white rounded-full py-1 px-4 right-2 hover:bg-blue-900">Register
              </router-link>
            </li>
          </ul>

        </div>
          <div class="md:mt-28 mx-10 my-10 md:text-left text-center md:w-1/2 md:pb-28">
            <h1 class="m-auto md:text-5xl text-white font-extrabold">No. 1 Asset Management Service.</h1>

            <p class="m-auto mt-8 md:text-xl text-white">
              Assetlog is a smart asset management service that helps you analyse your assets portfolio and share insights on how you can maximise your wealth.
<!--              <router-link to="about" class="text-blue-400">Read more...</router-link>-->
            </p>

            <div class="md:mt-20 py-10 md:mr-16">
              <!--        <p class="text-sm mt-20 text-white">Request an invite and get a chance to try out Assetlog!</p>-->
<!--              <form class="grid grid-cols-3 rounded-lg bg-white md:h-14 h-12 p-1" @submit.prevent="addToWaitlist">-->
<!--                <div class="relative text-gray-400 focus-within:text-gray-600 col-span-2">-->
<!--                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">-->
<!--                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                      <path d="M2 5L11.5 13L21 5" stroke="#CDCCD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                      <rect x="1" y="1" width="20" height="16" rx="2" stroke="#CDCCD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    </svg>-->
<!--                  </div>-->

<!--                  <input id="email" required class="md:text-lg h-full placeholder-gray-400 text-gray-900 rounded-lg w-full block pl-12 focus:outline-none" placeholder="Email address" v-model="email">-->
<!--                </div>-->

<!--                <button type="submit" class="text-sm md:text-md bg-blue-600 text-white rounded-lg font-extrabold hover:bg-blue-700">-->
<!--                  Get Started!-->
<!--                </button>-->
<!--              </form>-->

              <router-link :to="{name:'register'}" type="submit" class="border-b pl-14 pr-10 py-4 text-md md:text-md bg-blue-600 text-white rounded-full font-extrabold hover:bg-blue-700">
                Get Started!

                <svg xmlns="http://www.w3.org/2000/svg" class="float-right ml-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </router-link>
            </div>
          </div>
      </div>
    </div>

    <div class="md:px-36 md:pt-20 md:grid md:grid-cols-2 md:text-left mx-10 text-center mb-10">
      <div>
        <h1 class="font-extrabold md:text-4xl text-black">Your easy and most efficient asset management companion.</h1>

        <p class="my-4">Our revolutionary asset management service provides an effective and efficient way for you
          to get a clearer overview of your assets and their performance, especially if you invest over several asset types.</p>

          <ul class="list-none grid grid-cols-2 gap-y-3 md:mr-40 text-left">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg> Digital Currencies
            </li>

            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg> Stocks
            </li>

            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg> Real Estate
            </li>

            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg> NFTs
            </li>
          </ul>
      </div>

      <div class="md:block hidden">
        <img src="/images/home-bg-2.png" class="-mt-16 w-5/6 float-right" />
      </div>
    </div>

    <div class="py-3 bg-white">
      <div class="md:px-36 px-10">
        <h1 class="my-10 font-extrabold md:text-4xl text-black text-center">Start tracking your asset performance in 3 steps</h1>

        <div class="grid md:grid-cols-3 gap-x-20 gap-y-10">
          <div class="bg-gray-100 rounded-2xl shadow-lg px-5">
            <div class="grid grid-cols-3">
              <img src="/images/frame-19916.svg"/>

              <div class="col-span-2">
                <h3 class="text-xl font-bold my-4">Invest</h3>
                <p class="text-gray-500">
                  You posses the freedom to invest however and wherever you like.
                  <span class="md:block hidden">Just Do It! Or... You can let us help you ;-)</span>
                </p>

                <router-link to="" class="md:my-10 my-4 inline-block">
                  <svg class="h-7 w-7 inline-block" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4434 32.7876C25.294 32.7876 32.4688 25.6128 32.4688 16.7622C32.4688 7.91163 25.294 0.736816 16.4434 0.736816C7.59278 0.736816 0.417969 7.91163 0.417969 16.7622C0.417969 25.6128 7.59278 32.7876 16.4434 32.7876Z" fill="#E0EFFF"/>
                    <path d="M18.8462 11.1533L17.7164 12.2831L21.3862 15.9609H8.42969V17.5635H21.3862L17.7084 21.2413L18.8462 22.3711L24.455 16.7622L18.8462 11.1533Z" fill="#003399"/>
                  </svg>

                  Read more
                </router-link>
              </div>
            </div>
          </div>

          <div class="bg-gray-100 rounded-2xl shadow-lg px-5">
              <div class="grid grid-cols-3">
              <img src="/images/frame-19933.svg" class="mt-5" />

              <div class="col-span-2">
                <h3 class="text-xl font-bold my-4">Log</h3>
                <p class="text-gray-500">
                  <span class="md:block hidden">Logging your assets with Assetlog is so easy.</span>
                  You can either do it manually or let us help you do it automatically...
                </p>

                <router-link to="" class="my-4 inline-block">
                  <svg class="h-7 w-7 inline-block" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4434 32.7876C25.294 32.7876 32.4688 25.6128 32.4688 16.7622C32.4688 7.91163 25.294 0.736816 16.4434 0.736816C7.59278 0.736816 0.417969 7.91163 0.417969 16.7622C0.417969 25.6128 7.59278 32.7876 16.4434 32.7876Z" fill="#E0EFFF"/>
                    <path d="M18.8462 11.1533L17.7164 12.2831L21.3862 15.9609H8.42969V17.5635H21.3862L17.7084 21.2413L18.8462 22.3711L24.455 16.7622L18.8462 11.1533Z" fill="#003399"/>
                  </svg>

                  Read more
                </router-link>
              </div>
            </div>
          </div>

          <div class="bg-gray-100 rounded-2xl shadow-lg px-5">
              <div class="grid grid-cols-3">
                <img src="/images/frame-19917.svg" class="-mt-1 w-20" />

                <div class="col-span-2">
                  <h3 class="text-xl font-bold my-4">Track</h3>
                  <p class="text-gray-500">
                    <span class="md:block hidden">Keeping track of stuffs is HARD! </span>And not keeping track of your assets means losing them. We'd do that for you!
                  </p>

                <router-link to="" class="my-4 inline-block">
                  <svg class="h-7 w-7 inline-block" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4434 32.7876C25.294 32.7876 32.4688 25.6128 32.4688 16.7622C32.4688 7.91163 25.294 0.736816 16.4434 0.736816C7.59278 0.736816 0.417969 7.91163 0.417969 16.7622C0.417969 25.6128 7.59278 32.7876 16.4434 32.7876Z" fill="#E0EFFF"/>
                    <path d="M18.8462 11.1533L17.7164 12.2831L21.3862 15.9609H8.42969V17.5635H21.3862L17.7084 21.2413L18.8462 22.3711L24.455 16.7622L18.8462 11.1533Z" fill="#003399"/>
                  </svg>

                  Read more
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="md:px-36 px-10 py-20">
        <div id="signup-box" class="rounded-2xl text-white md:py-5 py-1">
          <h1 class="mt-10 mb-2 font-extrabold md:text-4xl text-center">Signup Today for Free.</h1>
          <small class="text-md text-gray-200 block text-center italic">and get $2 worth of <a href="#">credit</a>...</small>

          <div class="md:w-1/2 md:mx-auto mx-2 my-10">
            <!--        <p class="text-sm mt-20 text-white">Request an invite and get a chance to try out Assetlog!</p>-->
            <form class="grid grid-cols-3 rounded-lg bg-white h-14 p-1" @submit.prevent="addToWaitlist">
              <div class="relative text-gray-400 focus-within:text-gray-600 col-span-2">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L11.5 13L21 5" stroke="#CDCCD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="1" y="1" width="20" height="16" rx="2" stroke="#CDCCD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <input id="email" required class="md:text-lg h-full placeholder-gray-400 text-gray-900 rounded-lg w-full block pl-12 focus:outline-none" placeholder="Email address" v-model="email">
              </div>

              <button type="submit" class="text-sm md:text-md bg-blue-600 text-white rounded-lg font-extrabold hover:bg-blue-700">
                Get Started!
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="flow-root md:px-36 px-10 grid grid-cols-6 mb-20">
        <div class="col-span-4">
          <router-link to="home">Home</router-link> |
          <router-link to="about">About</router-link> |
          <router-link to="privacy">Privacy</router-link>
          <h5 class="font-bold">&copy; 2021 All rights reserved. Assetlog</h5>
          <small class="block">A product of <a href="//overflowsolutions.com.ng" target="_blank">Overflow Solutions&reg;</a></small>
        </div>

        <div class="col-span-2 text-right">
          <ul class="list-none">
            <li class="inline-block mr-2">
              <a href="https://facebook.com/assetlog_co" target="_blank">
                <svg class="h-5 w-5 inline-block mr-1" width="13" height="22" viewBox="0 0 13 22" fill="#1d57bb" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1H9C7.67392 1 6.40215 1.52678 5.46447 2.46447C4.52678 3.40215 4 4.67392 4 6V9H1V13H4V21H8V13H11L12 9H8V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H12V1Z" stroke="#1d57bb" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="md:inline-block hidden">Facebook</span>
              </a>
            </li>

            <li class="inline-block">
              <a href="https://twitter.com/assetlog_co" target="_blank">
                <svg class="h-5 w-5 inline-block mr-2" width="24" height="21" viewBox="0 0 24 21" fill="#5ea1f5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 2.00005C22.0424 2.67552 20.9821 3.19216 19.86 3.53005C19.2577 2.83756 18.4573 2.34674 17.567 2.12397C16.6767 1.90121 15.7395 1.95724 14.8821 2.2845C14.0247 2.61176 13.2884 3.19445 12.773 3.95376C12.2575 4.71308 11.9877 5.61238 12 6.53005V7.53005C10.2426 7.57561 8.50127 7.18586 6.93101 6.39549C5.36074 5.60513 4.01032 4.43868 3 3.00005C3 3.00005 -1 12 8 16C5.94053 17.398 3.48716 18.099 1 18C10 23 21 18 21 6.50005C20.9991 6.2215 20.9723 5.94364 20.92 5.67005C21.9406 4.66354 22.6608 3.39276 23 2.00005V2.00005Z" stroke="#5ea1f5" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <span class="md:inline-block hidden">Twitter</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
<!--    &lt;!&ndash;      <p>&ndash;&gt;-->
<!--&lt;!&ndash;        Asset log helps you log/keep track of all your financial/xxx assets e.g Digital Currency, real estate, foreign exchange, stocks, etc.&ndash;&gt;-->
<!--        Out robust analytical AI tool stays ahead of time to assists you to plan and prepare your future investments and avoidance of potential risks.-->
<!--&lt;!&ndash;      </p>&ndash;&gt;-->
</template>

<script>
import Axios from "../../config/axios";

export default {
  name: "Home",
  data() {
    return {
      email: null,
      referralCode: null
    }
  },

  mounted() {
    this.referralCode = window.location.hash.split('ref=')[1];
  },

  methods: {
    addToWaitlist() {
      this.showLoader();
      let requestData = {
        email: this.email,
        ref: this.referralCode
      };

      Axios.post('waitlist', requestData)
        .then(response => {
          this.$swal({
            title: response.data.message,
            html: '<small>One last thing? Kindly help us fill out <a target="_blank" style="color:#5380cf" href="https://forms.gle/AdU2M6ZJFwYTh7V99">this short survey</a></small>',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: '#2869cb'
          })
        })
        .catch(err => console.error(err))
        .finally(() => this.hideLoader())
    }
  }
}
</script>

<style scoped>
  #signup-box {
    background-color: #1d57bb;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%234f80e6' fill-opacity='0.24' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
</style>
