<template>
  <page-template>
    <form class="text-center md:text-left lg:text-left md:p-20 lg:p-28 xl:p-40 lg:w-full w-full p-10" @submit.prevent="doLogin">
      <div class="flex flex-col space-y-3 pb-10">
        <h1 class="text-2xl font-bold">Welcome Back</h1>
        <span class="text-sm text-gray-900">Please, enter your details to proceed</span>
      </div>
      <!--Sign in with google-->
      <div
          class="flex space-x-2 justify-center items-end bg-white py-2 rounded-md transition duration-100 border-2 border-gray-200">
        <img alt="" class=" h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png">
        <button>Sign in with Google</button>
      </div>

      <div class="text-center my-6">
        <span class="text-mute">Or use your email</span>
      </div>

      <div class="flex flex-col space-y-6">
        <div class="">
          <label class="block text-md mb-2" for="email">Email</label>
          <input id="email" v-model="user.username"
                 class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" name="email"
                 placeholder="email" required type="email">
        </div>
        <div class="">
          <label class="block text-md mb-2" for="password">Password</label>
          <input id="password" v-model="user.password"
                 class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" name="password"
                 placeholder="password" required type="password">
        </div>
      </div>

      <div class="w-full flex justify-between pt-3">
        <div class="flex items-center">
          <input id="rememberme" class="w-3 h-3 mr-2" name="rememberme" type="checkbox"/>
          <label class="text-xs" for="rememberme">Remember Me</label>
        </div>
        <router-link :to="{name: 'forgot-password'}" class="text-xs text-primary">Forgot Password?</router-link>
      </div>

      <div class="pt-6">
        <button class="auth-cta">Sign in</button>
<!--        <p class="mt-6 text-xs text-center">Don’t Have An Account?-->
<!--          <router-link :to="{name: 'register'}" class="text-primary">Create new account</router-link>-->
<!--        </p>-->
      </div>
    </form>
  </page-template>
</template>

<script>

import Axios from "../../../config/axios";
import PageTemplate from "@/components/auth/pageTemplate";

export default {
  name: "Login",
  components: {PageTemplate},
  data() {
    return {
      user: {
        username: null,
        password: null
      }
    }
  },

  methods: {
    doLogin() {
      this.showLoader();
      Axios.post('/user/login', this.user)
          .then(resp => {
            const user = resp.data.data;
            this.$store.commit('storeUser', user);

            if(!user.finished_setup) {
              this.gotoSetupStep('welcome');
            }

            this.showSuccessToast(resp.data.message);

            this.$router.replace({name: "dashboard"})
          })
          .catch(err => {
            console.log(err.response)
            this.showErrorToast(err);
          })
          .finally(() => {
            this.hideLoader();
          });
    }
  }
}
</script>

<style>
.text-mute {
    @apply text-gray-400;
}

.auth-cta {
    @apply py-2 w-full rounded text-white;
    background-color: #1565D8;
}
</style>
