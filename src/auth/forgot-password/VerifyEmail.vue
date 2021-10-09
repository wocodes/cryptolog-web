<template>
    <page-template>
        <div class="text-center md:text-left lg:text-left md:p-20 lg:p-28 xl:p-40 lg:w-full w-full p-10">
            <div v-if="email_sent">
                <div class="flex flex-col space-y-3">
                    <h1 class="text-2xl font-bold">Check your email</h1>
                    <span class="text-sm text-gray-700">We have sent a confimation email to {{ user.email }}. Please proceed to verify your email.
                    <br><br>
                    Please ensure to check your spam box incase you can’t find it in your inbox.
                </span>

                    <p class="lg:text-left flex space-x-2 mt-4 text-black">
                        <span>Wrong email address?</span>
                        <button class="text-primary cursor-pointer">Reset</button>
                    </p>
                </div>
            </div>
            <form v-if="!email_sent">
                <div class="flex flex-col space-y-3 pb-10">
                    <h1 class="text-2xl font-bold">Password Recovery</h1>
                    <span class="text-sm text-gray-900">Please enter the email associated with your account and
                    we'll send an email with instructions to reset your password
                </span>
                </div>

                <div class="flex flex-col">
                    <div class="">
                        <label class="block text-md mb-2" for="email">Email address</label>
                        <input id="email" v-model="user.email"
                               class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                               name="password" placeholder="someone@example.com" required type="email">
                    </div>
                </div>

                <div class="pt-8">
                    <button class="auth-cta">Send Instructions</button>
                    <p class="mt-6 text-xs text-center">
                        <router-link :to="{name: 'login'}" class="text-primary">Return to login</router-link>
                    </p>
                </div>
            </form>
        </div>



    </page-template>
</template>

<script>
import PageTemplate from "@/components/auth/pageTemplate";

export default {
    name: "VerifyEmail",
    components: {PageTemplate},
    data() {
        return {
            user: {},
            email_sent: false
        }
    }
}
</script>

<style scoped>

</style>