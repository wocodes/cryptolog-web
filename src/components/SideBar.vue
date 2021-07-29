<template>
    <div class="h-screen bg-blue-900 pt-20 text-left text-white">
        <ul class="list-none">
            <li class="p-4">
                <router-link class="no-underline" :to="{name: 'dashboard'}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white float-left " viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span :class="sideBarMenuHoverEffect">Home</span>
                </router-link>
            </li>

            <li class="p-4">
                <router-link :to="{name: 'add-asset'}" class="no-underline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white float-left" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                    <span :class="sideBarMenuHoverEffect">Log an Asset</span>
                </router-link>
            </li>

            <li class="p-4">
                <router-link :to="{name: 'logs'}" class="no-underline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white float-left" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span :class="sideBarMenuHoverEffect">Assets Logs</span>
                </router-link>
            </li>

<!--            <li class="p-4">-->
<!--                <a href="#" class="no-underline" @click.prevent="gotoHome">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white float-left" viewBox="0 0 20 20" fill="currentColor">-->
<!--                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />-->
<!--                    </svg>-->
<!--                    <span :class="sideBarMenuHoverEffect">Assets Summary</span>-->
<!--                </a>-->
<!--            </li>-->
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SideBar",
        data() {
            return {
                sideBarMenuHoverEffect: 'text-lg font-bold inline-block text-lg font-bold pl-2 transition duration-500 ease-in-out transform hover:translate-x-1'
            }
        },

        methods: {
            gotoHome() {
                console.log(2);
            }
        }
    }
</script>

<style scoped>

</style>