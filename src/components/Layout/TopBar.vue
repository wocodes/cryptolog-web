<template>
      <div class="bg-blue-900 flow-root p-1 sticky top-0">
          <div class="text-white float-left">
              <img src="images/logo.png" alt="logo" style="width:150px" />
          </div>

          <div class="m-2 text-md font-bold font-medium float-right flex text-white">
            <span class="mr-4">Hi, {{ user.name }}</span>
            <span @click="logout" class="text-black hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </span>
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