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
        </ul>

      <ul class="list-none" v-if="user.is_admin">
        <li class="p-4" v-for="(menu, index) in adminMenu" :key="index">
          <router-link :to="{name: menu.to}" class="no-underline">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-5 w-5 text-white float-left"
                 viewBox="0 0 20 20" fill="currentColor"
                 v-html="menu.iconPath">
            </svg>
            <span :class="sideBarMenuHoverEffect">{{ menu.name }}</span>
          </router-link>
        </li>
      </ul>

      <ul class="list-none" v-if="!user.is_admin">
        <li class="p-4" v-for="(menu, index) in userMenu" :key="index">
          <router-link :to="{name: menu.to}" class="no-underline">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-5 w-5 text-white float-left"
                 viewBox="0 0 20 20" fill="currentColor"
                 v-html="menu.iconPath">
            </svg>
            <span :class="sideBarMenuHoverEffect">{{ menu.name }}</span>
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
              user: this.user,
              userMenu: this.$store.state.userMenu,
              adminMenu: this.$store.state.adminMenu,
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