<template>
    <nav
        class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 md:bg-primary bg-white text-white"
    >
        <div
            class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
        >
            <!-- Brand -->
            <a
                class="md:block text-left md:pb-2 text-primary md:text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                href="javascript:void(0)"
            >
                AssetLog
            </a>

            <!-- Toggler -->
            <button
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none rounded border border-solid border-transparent"
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
            <div
                class="md:flex md:flex-col md:items-stretch md:opacity-100 md:h-auto md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 pt-5 overflow-y-auto overflow-x-hidden h-screen items-center flex-1"
                v-bind:class="{'bg-primary py-3 px-6' :collapseShow, 'hidden': !collapseShow}"
            >
                <!-- Collapse header -->
                <div
                    class="md:min-w-full md:hidden block pb-4 mb-4"
                >
                    <div class="flex flex-wrap">
                        <div class="w-11/12">
                            <a
                                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                href="javascript:void(0)"
                            >
                                AssetLog
                            </a>
                        </div>
                        <div class="w-1/12 flex justify-end">
                            <button
                                type="button"
                                class="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                v-on:click="toggleCollapseShow()"
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
                            <li class="p-4 items-center">
                                <router-link :to="{name: 'dashboard'}" class="flex space-x-8 align-items-center py-3 capitalise font-bold block">
                                    <img :src="'images/home.svg'" alt="..."/>
                                    <div>
                                        <span>Dashboard</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>

                        <ul class="md:flex-col md:min-w-full flex flex-col list-none" v-if="!user.is_admin">
                            <li class="p-4 items-center" v-for="(menu, index) in userMenu" :key="index">
                                <router-link :to="{name: menu.to}" class="flex space-x-8 align-items-cente capitalise py-3 font-bold block">
                                    <img :src="'images/'+menu.iconName+'.svg'" alt="..."/>
                                    <div class="align-self-start">
                                        <span>{{ menu.name }}</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>

                        <ul class="md:flex-col md:min-w-full flex flex-col list-none" v-if="user.is_admin">
                            <li class="p-4 items-center" v-for="(menu, index) in adminMenu" :key="index">
                                <router-link :to="{name: menu.to}" class="flex space-x-8 align-items-cente capitalise py-3 font-bold block">
                                    <img :src="'images/'+menu.iconName+'.svg'" alt="..."/>
                                    <div class="align-self-start">
                                        <span>{{ menu.name }}</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="border-b border-white border-opacity-25 my-6"></div>

                    <div class="items-center ">
                        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                            <li class="p-4 items-center">
                                <router-link :to="{name: 'settings'}" class="flex space-x-8 align-items-center py-3 capitalise font-bold block">
                                    <img :src="'images/settings.svg'" alt="..."/>
                                    <div>
                                        <span>Settings</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>

                        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                            <li class="p-4 items-center">
                                <router-link class="flex space-x-8 align-items-center py-3 capitalise font-bold block" @click="logout" to="">
                                    <img :src="'images/log-out.svg'" alt="..."/>
                                    <div>
                                        <span>Logout</span>
                                    </div>
                                </router-link>
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
            user: this.user,
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
            this.$router.replace({name: "Home"});
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