<template>
    <div id="root-div" class="bg-gray-100">
        <sidebar-component></sidebar-component>
        <div class="relative md:ml-64 md:bg-blueGray-100 h-screen">
            <navbar-component class="sticky"></navbar-component>
            <div class="relative py-4 md:px-12 px-4 md:pt-6">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarComponent from "@/components/Layout/sidebarComponent";
import NavbarComponent from "@/components/Layout/NavbarComponent";

export default {
    name: "MainView",
    components: {
        NavbarComponent,
        SidebarComponent,
    }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  #root-div {
    /*background-image: url("/images/wp5511690.jpg");*/
    background-color: #dceaff;
    background-size: cover;
  }
}
</style>