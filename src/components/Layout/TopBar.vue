<template>
    <div>
        <div class="bg-blue-900 flow-root p-3">
            <div class="text-white float-left">
                <img src="images/logo.png" alt="logo" style="width:150px" />
            </div>

            <div class="m-2 text-md font-bold font-medium float-right text-white">
              <span class="mr-4">Hi, {{ user.name }}</span>
              <span @click="logout" class="text-gray-400 hover:text-white cursor-pointer">
                Logout
              </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {USER_TOKEN_KEY} from "../../../helpers/constants";
    import {deleteFromStorage} from "../../../helpers/storage";

    export default {
        name: "TopBar",
        methods: {
            logout() {
                deleteFromStorage(USER_TOKEN_KEY);
                deleteFromStorage('vuex')

                // redirect to login page
                this.$router.replace({name: "login"});
            },
        },

    }
</script>

<style scoped>

</style>