<template>
    <div class="bg-gray-100">
        <TopBar/>

        <div class="grid grid-cols-5 gap-4">
            <SideBar class="hidden md:block" />

            <div class="col-span-4 m-6">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from "@/components/Layout/TopBar";
import SideBar from "@/components/Layout/SideBar";
export default {
name: "MainView",
    components: {SideBar, TopBar}
}
</script>

<style scoped>

</style>