<template>
    <nav class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden
                flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 md:sidebar-bg-primary bg-gradient-to-b from-blue-600 to-blue-900 text-white">
        <div class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap
                    px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            <!-- Brand -->
            <a class="md:block text-left md:pb-2 text-primary text-white
                      mr-0 inline-block whitespace-nowrap text-lg uppercase font-extrabold p-0 px-0"
                href="javascript:void(0)">
                Assetlog
            </a>

            <!-- Toggler -->
            <button
                class="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none rounded border border-solid border-transparent"
                type="button"
                v-on:click="toggleCollapseShow()"
            >
                <i class="fas fa-bars"></i>
            </button>

            <!-- User -->
<!--            <ul class="md:hidden items-center flex flex-wrap list-none">-->
<!--                <li class="inline-block relative">-->
<!--                    <notification-dropdown-component></notification-dropdown-component>-->
<!--                </li>-->
<!--                <li class="inline-block relative">-->
<!--                    <user-dropdown-component></user-dropdown-component>-->
<!--                </li>-->
<!--            </ul>-->
            <!-- Collapse -->

<!--          transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110-->
              <div
                  class="md:flex md:flex-col md:items-stretch md:opacity-100 md:h-auto md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 pt-5 overflow-y-auto overflow-x-hidden h-screen items-center flex-1"
                  v-bind:class="{'bg-primary opacity-97 py-3 px-6' :collapseShow, 'hidden': !collapseShow}"
              >
                <!-- Collapse header -->
                <div
                    class="md:min-w-full md:hidden block pb-4 mb-4"
                >
                    <div class="flex flex-wrap">
                        <div class="w-11/12">
                            <a
                                class="md:block text-left md:pb-2 text-primary mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                href="javascript:void(0)"
                            >
                                Assetlog
                            </a>
                        </div>
                        <div class="w-1/12 flex justify-end">
                            <button
                                type="button"
                                class="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                v-on:click="collapseShow = false"
                            >
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Menu items-->
                <div class="flex flex-col">
                    <div class="items-center">
                        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                            <li class="p-1 items-center">
                                <router-link :to="{name: 'dashboard'}" @click="collapseShow = false" class="flex space-x-8 align-items-center py-3 capitalise font-bold block">
                                    <img :src="'images/home.svg'" alt="..."/>
                                    <div>
                                        <span>Dashboard</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>

                        <ul class="md:flex-col md:min-w-full flex flex-col list-none" v-if="!user.is_admin && (user.finished_setup || $store.state.setupSteps.done)">
                            <li class="p-1 items-center" v-for="(menu, index) in userMenu" :key="index">
                                <router-link :to="{name: menu.to}" @click="collapseShow = false" class="flex space-x-8 align-items-cente capitalise py-3 font-bold block">
                                  <img v-if="menu.iconName" :src="'images/'+menu.iconName+'.svg'" alt="..."/>

                                    <svg v-if="menu.to == 'calculator'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>

                                    <svg v-if="menu.to == 'aitrade' || menu.to == 'wallet'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-75" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <div class="align-self-start">
                                        <span>{{ menu.name }}</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>

                        <ul class="md:flex-col md:min-w-full flex flex-col list-none" v-if="user.is_admin">
                            <li class="p-1 items-center" v-for="(menu, index) in adminMenu" :key="index">
                                <router-link :to="{name: menu.to}" @click="collapseShow = false" class="flex space-x-8 align-items-cente capitalise py-3 font-bold block">
                                    <img :src="'images/'+menu.iconName+'.svg'" alt="..."/>
                                    <div class="align-self-start">
                                        <span>{{ menu.name }}</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="border-b border-white border-opacity-25 my-6"></div>

                    <div class="items-center">
                        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                            <li class="p-1 items-center">
                                <router-link :to="{name: 'settings'}" @click="collapseShow = false" class="flex space-x-8 align-items-center py-3 capitalise font-bold block">
                                    <img :src="'images/settings.svg'" alt="..."/>
                                    <div>
                                        <span>Settings</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>

                        <ul class="md:flex-col md:min-w-full flex flex-col list-none cursor-pointer">
                            <li class="p-1 items-center" @click="logout">
                                <span class="flex space-x-8 align-items-center py-3 capitalise font-bold block">
                                    <img :src="'images/log-out.svg'" alt="..."/>
                                    <div>
                                        <span>Logout</span>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </nav>
</template>
<script>
// import NotificationDropdownComponent from "./NotificationDropdown.vue";
// import UserDropdownComponent from "./UserDropdown.vue";

import {deleteFromStorage} from "../../../helpers/storage";

export default {
    name: 'sidebarComponent',
    data() {
        return {
            collapseShow: false,
            userMenu: this.$store.state.userMenu,
            adminMenu: this.$store.state.adminMenu,
        };
    },
    methods: {
        toggleCollapseShow: function() {
            this.collapseShow =  !this.collapseShow;
        },

        logout() {
            deleteFromStorage('vuex');

            // redirect to login page
            this.$router.replace({name: "home"});
        },
    },
    // components: {
    //     NotificationDropdownComponent,
    //     UserDropdownComponent
    // }
};
</script>

<style scoped>

</style>