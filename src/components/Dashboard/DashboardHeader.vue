<template>
  <div class="flex flow-root text-left">
    <div class="float-left">
      <h2 class="font-bold">Hello, {{ user.name }}</h2>
      <small>Welcome to Assetlog!</small>
    </div>
    <button class="float-right w-full md:w-36 float-right rounded bg-blue-600 py-2 px-6 my-4 text-white">Log Asset</button>
  </div>
</template>

<script>
export default {
  name: "DashboardHeader"
}
</script>

<style scoped>

</style>