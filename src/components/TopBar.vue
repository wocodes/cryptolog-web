<template>
    <div>
        <div class="bg-blue-900 flow-root p-3">
            <div class="text-white float-left">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg> LOGO
            </div>

            <span @click="logout" class="text-gray-400 text-sm font-medium float-right hover:text-white cursor-pointer">Logout</span>
        </div>
    </div>
</template>

<script>
    import {TOKEN_KEY} from "../../helpers/constants";
    import {deleteFromStorage} from "../../helpers/storage";

    export default {
        name: "TopBar",
        methods: {
            logout() {
                deleteFromStorage(TOKEN_KEY);

                // redirect to login page
                this.$router.replace({name: "login"});
            }
        }
    }
</script>

<style scoped>

</style>