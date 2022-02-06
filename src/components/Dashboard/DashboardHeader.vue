<template>
  <div class="md:grid md:grid-cols-2 justify-between items-center">
    <div class="text-left col-start-1 grid grid-cols-2">
      <div>
        <h2 class="font-bold m-0">Hello, {{ user.name.split(" ")[0] }}</h2>
        <small>Welcome to Assetlog!</small>
      </div>

      <div class="md:hidden uppercase rounded-full w-9 h-9 flex flex-col justify-self-end justify-center items-center bg-blue-600 text-white font-bold">
        {{ generateInitials(user.name) }}
      </div>
    </div>

    <div class="md:justify-self-end md:col-auto md:grid-cols-none col-start-1 grid grid-cols-2">
      <UpdateAssetsButtonComponent only-icon
                                   class="md:hidden justify-self-start"
                                   @assetsUpdated="catchAssetsUpdatedEvent "/>

      <router-link to="/logs/add" class="text-center justify-self-end w-28 md:w-36 rounded bg-blue-600 py-2 px-4 my-4 text-white">Log Asset</router-link>
    </div>
  </div>
</template>

<script>
import UpdateAssetsButtonComponent from "@/components/User/Logs/UpdateAssetsButtonComponent";

export default {
  name: "DashboardHeader",
  components: {UpdateAssetsButtonComponent},
  methods: {
    generateInitials(name) {
      return name.slice(0,2);
    },

    catchAssetsUpdatedEvent(value) {
      if (value) {
        this.getEarningsSummary();
      }
    }
  }
}
</script>

<style scoped>

</style>