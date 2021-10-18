<template>
  <div class="flex justify-between items-center text-left">
    <div class="">
      <h2 class="font-bold">Hello, {{ user.name }}</h2>
      <small>Welcome to Assetlog!</small>
    </div>
    <button class="w-full md:w-36 rounded bg-blue-600 py-2 px-6 my-4 text-white">Log Asset</button>
  </div>
</template>

<script>
export default {
  name: "DashboardHeader"
}
</script>

<style scoped>

</style>