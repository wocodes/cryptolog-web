<template>
    <div>
        <div class="bg-blue-900 flow-root p-3">
            <div class="text-white float-left">
                <img src="images/logo.png" alt="logo" style="width:150px" />
            </div>

            <span @click="logout" class="m-2 text-gray-400 text-md font-bold font-medium float-right hover:text-white cursor-pointer">Logout</span>
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

                // redirect to login page
                this.$router.replace({name: "login"});
            },
        },

    }
</script>

<style scoped>

</style>