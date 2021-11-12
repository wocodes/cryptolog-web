<template>
    <page-template>
        <div class="text-center md:text-left lg:text-left md:p-20 lg:p-28 xl:p-40 lg:w-full w-full p-10">
            <div v-if="email_sent">
                <div class="flex flex-col space-y-3">
                    <h1 class="text-2xl font-bold">Check your email</h1>
                    <span class="text-sm text-gray-700">We have sent a confirmation email to {{ user.email }}. Please proceed to verify your email.
                    <br><br>
                    Please ensure to check your spam box incase you can’t find it in your inbox.
                </span>

                    <p class="lg:text-left flex space-x-2 mt-4 text-black">
                        <span>Wrong email address?</span>
                        <button class="text-primary cursor-pointer">Reset</button>
                    </p>
                </div>
            </div>


          <div class="flex flex-col space-y-2 mb-8" v-if="!email_sent">
            <h1 class="text-2xl font-bold">Password Recovery</h1>
            <span class="text-sm text-gray-900" v-if="!token">
                Please enter the email associated with your account and we'll send an email with instructions to reset your password
            </span>
            <span class="text-sm text-gray-900" v-else>
              Please enter your new password and also confirm the password. Then Reset.
            </span>
          </div>

          <h3 class="text-1xl font-bold my-4" v-if="apiResponse">{{ apiResponse }}</h3>

          <form v-if="!success" @submit.prevent="doPasswordReset()">
              <div class="flex flex-col">
                <div v-if="!token">
                    <label class="block text-md mb-2" for="email">Email address</label>
                    <input id="email" v-model="user.email"
                           class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                           name="password" placeholder="someone@example.com" required type="email">
                </div>

                <div v-else>
                  <label class="block text-md mb-2" for="email">New Password</label>
                  <input id="new_password" v-model="user.new_password"
                         class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                         name="new_password" required type="password">

                  <label class="block text-md my-2" for="email">Confirm Password</label>
                  <input id="confirm_password" v-model="user.confirm_password"
                         class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                         name="confirm_password" required type="password">
                </div>
              </div>

              <div class="pt-8">
                  <button class="auth-cta" v-if="!token">Send Instructions</button>
                  <button class="auth-cta" v-else>Reset</button>
              </div>
          </form>

          <p class="mt-6 text-sm text-center">
            <router-link :to="{name: 'login'}" class="text-primary">Return to login</router-link>
          </p>
        </div>



    </page-template>
</template>

<script>
import PageTemplate from "@/components/auth/pageTemplate";
import Axios from "../../../config/axios";

export default {
    name: "VerifyEmail",
    components: {PageTemplate},
    data() {
        return {
            user: {},
            email_sent: false,
            token: null,
            apiResponse: null,
            success: false
        }
    },

  mounted() {
    this.token = window.location.hash.split('tk=')[1];
  },

  methods: {
    async doPasswordReset() {
      this.showLoader();
      try {
        let data = {};
        if(!this.token) {
          data.email = this.user.email;
        } else {
          data.token = this.token;
          data.new_password = this.user.new_password;
          data.confirm_password = this.user.confirm_password;
        }

        const response = await Axios.post('user/reset-password', data);

        this.showSuccessToast(response.data.message);
        this.email_sent = !this.token;
        this.success = true;
        this.apiResponse = this.token && response.data.message ? response.data.message : null;

        this.hideLoader();

      } catch (error) {
        this.showErrorToast(error);
        this.apiResponse = this.token && error ? error.response.data.message : null;
        this.hideLoader();
      }
    }
  }
}
</script>

<style scoped>

</style>