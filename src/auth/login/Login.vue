<template>
  <page-template>
    <form class="text-center md:text-left lg:text-left md:p-20 lg:p-28 xl:p-40 lg:w-full w-full p-10">
      <div v-if="noAccess" class="text-center text-sm bg-red-500 text-white rounded p-2 w-full mb-10 shadow-xl">
        Sorry you can't login now. Request an invite by <a class="underline" href="mailto:hello@assetlog.co" target="_blank"> sending a mail to hello@assetlog.co</a> or <a class="underline" target="_blank" href="//wa.me/+2347015795533?text=I'm%20interested%20in%20trying%20out%20Assetlog">Whatsapp: +2347015795533</a>
      </div>

      <div class="flex flex-col space-y-3 pb-10">
        <h1 class="text-2xl font-bold">Welcome Back</h1>
        <span class="text-sm text-gray-900">Please, enter your details to proceed</span>
      </div>
      <!--Sign in with google-->
<!--      <div-->
<!--          class="cursor-pointer flex space-x-2 justify-center items-end bg-white py-2 rounded-md transition duration-100 border-2 border-gray-200">-->
<!--        <img alt="" class=" h-5" src="https://i.imgur.com/arC60SB.png">-->
<!--        <div>Sign in with Google</div>-->
<!--      </div>-->

<!--      <div class="text-center my-6">-->
<!--        <span class="text-mute">Or use your email</span>-->
<!--      </div>-->

      <div class="flex flex-col space-y-6">
        <div class="">
          <label class="block text-md" for="email">Email</label>
          <input id="email" v-model="user.username"
                 class="px-4 w-full border-1 border-gray-300 py-2 rounded-md text-sm outline-none" name="email"
                 placeholder="email" required type="email">
        </div>
        <div class="">
          <label class="block text-md" for="password">Password</label>
          <div class="">
            <input id="password" v-model="user.password"
                   style="width: 90%"
                   class="px-4 w-80 border-1 border-gray-300 py-2 rounded-md text-sm outline-none"
                   :type="showPassword ? 'text' : 'password'"
                   name="password"
                   placeholder="someone1234!8" required>

            <svg xmlns="http://www.w3.org/2000/svg"
                 style="cursor:pointer;"
                 v-if="!showPassword"
                 @click="togglePassword()"
                 class="my-1 float-right h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg"
                 v-else
                 style="cursor:pointer;"
                 @click="togglePassword()"
                 class="my-1 float-right h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </div>
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
        <button class="auth-cta" @click.prevent="doLogin">Sign in</button>
        <p class="mt-6 text-xs text-center">Don’t Have An Account?
          <router-link :to="{name: 'register'}" class="text-primary">Sign Up</router-link>
<!--          <router-link :to="{name: 'home'}" class="text-primary">Get Started</router-link>-->
        </p>
      </div>
    </form>
  </page-template>
</template>

<script>

import Axios from "../../../config/axios";
import PageTemplate from "@/components/auth/pageTemplate";
import Alerts from "@/utilities/alerts";
import WalletService from "@/services/wallet";
import {DEV_WHITELIST} from "../../../helpers/constants";

export default {
  name: "Login",
  components: {PageTemplate},
  data() {
    return {
      showPassword: false,
      user: {
        username: null,
        password: null
      },
      noAccess: false
    }
  },

  methods: {
    doLogin() {
      if(!DEV_WHITELIST.includes(this.user.username)) {
        this.noAccess = true;
        return;
      }

      this.showLoader();

      Axios.post('/user/login', this.user)
          .then(resp => {
            const user = resp.data.data;
            this.$store.commit('storeUser', user);

            if(!user.finished_setup) {
              this.gotoSetupStep('welcome');
            }

            Alerts.showSuccessToast(resp.data.message);
          })
          .then(async () => {
            await WalletService.getBalance();
            const vuexUser = await JSON.parse(localStorage.getItem('vuex')).user;
            await this.$store.commit('storeUser', vuexUser);

            await this.$router.replace({name: "dashboard"});
          })
          .catch(err => {
            Alerts.showErrorToast(err);
          })
          .finally(() => {
            this.hideLoader();
          });
    },

    togglePassword()
    {
      this.showPassword = !this.showPassword;
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
