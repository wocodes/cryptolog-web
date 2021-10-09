<template>
    <page-template>
        <form class="text-center md:text-left p-10 lg:text-left md:p-20 lg:p-28 xl:p-40 w-full lg:w-full"
              @submit.prevent="doRegister">
            <div class="flex flex-col space-y-3 pb-10">
                <h1 class="text-2xl font-bold">Sign Up</h1>
                <span class="text-sm text-gray-900">Create your assetlog account</span>
            </div>
            <!--Sign p with google-->
            <div
                class="flex space-x-2 justify-center items-end bg-white py-2 rounded-md transition duration-100 border-2 border-gray-200">
                <img alt="" class=" h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png">
                <button>Sign up with Google</button>
            </div>

            <div class="text-center my-6">
                <span class="text-mute">Or use your email</span>
            </div>

            <div class="flex flex-col space-y-6">
                <div class="">
                    <label class="block text-md mb-2" for="fullname">Full Name</label>
                    <input id="fullname" v-model="user.name"
                           class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                           name="password" placeholder="Eleanor Pena" required type="text">
                </div>
                <div class="">
                    <label class="block text-md mb-2" for="email">Email</label>
                    <input id="email" v-model="user.username"
                           class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                           name="password" placeholder="someone@example.com" required type="email">
                </div>
                <div class="">
                    <label class="block text-md mb-2" for="password">Password</label>
                    <input id="password" v-model="user.password"
                           class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                           name="password" placeholder="someone1234!8" required type="password">
                </div>
            </div>

            <div class="pt-6">
                <button class="auth-cta">Create Account</button>
                <p class="mt-6 text-xs text-center">Already have an account?
                    <router-link :to="{name: 'login'}" class="text-primary">Log in</router-link>
                </p>
            </div>
        </form>
    </page-template>
</template>

<script>
import Axios from "../../../config/axios";
import PageTemplate from "@/components/auth/pageTemplate";
// import SplashLoader from "@/components/Shared/SplashLoader"; NOT YET WORKING

export default {
    name: "Register",
    components: {PageTemplate},
    data() {
        return {
            user: {
                name: null,
                username: null,
                password: null
            }
        }
    },

    methods: {
        doRegister() {
            this.showLoader();
            Axios.post('/user/register', this.user)
                .then(resp => {
                    this.showSuccessToast(resp.data.message+"<br>You may now login");
                    this.$router.push('/login');
                })
                .catch(err => {
                  this.showErrorToast(err)
                })
                .finally(() => this.hideLoader())
        }
    }
}
</script>
