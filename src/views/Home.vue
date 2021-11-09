<template>
  <div class="h-screen flow-root">
    <img src="/images/waitlist.png" class="absolute w-max md:w-screen h-screen fixed top-0"/>

    <div class="absolute">
      <router-link :to="{name: 'login'}" class="bg-white text-blue-600 rounded py-1 px-4 m-4 absolute font-bold right-2">Login</router-link>

      <h1 class="text-2xl font-bold text-white bg-blue-700 pt-24 font-sans" style="background-color: #1052b7">AssetLog</h1>

      <div class="p-6 w-full md:w-full mt-12 md:mt-10 md:mx-auto text-center">
        <h1 class="m-auto md:w-1/2 md:text-5xl text-white font-bold italic">The Smart Asset & Investment Service...</h1>

        <p class="m-auto mt-8 md:w-1/2 md:text-xl text-white">
          AssetLog is a smart asset/investments service that helps you analysis your investment portfolio and share insights on how you can maximise your wealth. <router-link to="about" class="text-blue-400">Read more...</router-link>
        </p>

        <p class="text-sm mt-10 text-white">Request an invite and get a chance to try out Assetlog!</p>
        <form class="grid grid-cols-3 rounded-lg bg-white h-16 md:w-2/4 m-auto p-2" @submit.prevent="addToWaitlist">
          <div class="relative text-gray-400 focus-within:text-gray-600 col-span-2">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5L11.5 13L21 5" stroke="#CDCCD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="1" y="1" width="20" height="16" rx="2" stroke="#CDCCD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <input id="email" required class="md:text-lg h-full placeholder-gray-400 text-gray-900 rounded-lg w-full block pl-12 focus:outline-none" placeholder="Email address" v-model="email">
          </div>

          <button type="submit" class="text-sm md:text-md bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
            Request an Invite!
          </button>
        </form>

        <!--      <h2 class="text-sm md:text-lg mt-20 text-gray-300">-->
        <!--        Thank you. One last thing, please kindly help us fill-->
        <!--        <a class="underline text-gray-400 hover:text-gray-300" href="https://forms.gle/AdU2M6ZJFwYTh7V99" target="_blank">this short survey</a>-->
        <!--        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">-->
        <!--          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />-->
        <!--          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />-->
        <!--        </svg>-->
        <!--      </h2>-->

        <div class="fixed bottom-0">
          <img src="/images/gadgets.png" class="w-full md:w-2/3 m-auto">
        </div>
      </div>
    </div>
<!--    &lt;!&ndash;      <p>&ndash;&gt;-->
<!--&lt;!&ndash;        Asset log helps you log/keep track of all your financial/xxx assets e.g Cryptocurrency, real estate, foreign exchange, stocks, etc.&ndash;&gt;-->
<!--        Out robust analytical AI tool stays ahead of time to assists you to plan and prepare your future investments and avoidance of potential risks.-->
<!--&lt;!&ndash;      </p>&ndash;&gt;-->
    </div>
</template>

<script>
import Axios from "../../config/axios";

export default {
  name: "Home",
  data() {
    return {
      email: null,
    }
  },
  methods: {
    addToWaitlist() {
      this.showLoader();
      Axios.post('waitlist', {email: this.email})
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
