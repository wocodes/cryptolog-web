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
                <router-link :to="{name: 'add-log'}" class="no-underline">
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

            <li class="p-4">
                <router-link :to="{name: 'settings'}" class="no-underline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white float-left" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                    <span :class="sideBarMenuHoverEffect">Settings</span>
                </router-link>
            </li>
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