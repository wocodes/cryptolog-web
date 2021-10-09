<template>
  <div class="p-6 w-1/2 mx-auto bg-white rounded-xl flex flex-col items-center justify-center shadow-lg">
    <img src="images/welcome.svg" alt="welcome" class="my-2"/>

    <h3 class="font-bold text-lg my-4">Welcome to Assetlog</h3>

    <p class="w-3/4 text-gray-500">You're all good to go! Hit the ground running and log in your first asset.</p>

    <router-link :to="{name: 'add-log'}" class="w-2/3 float-right rounded bg-blue-600 py-2 px-6 my-4 text-white">
      Log your first asset manually
    </router-link>

    <small class="text-gray-500">or fetch automatically</small>

    <button @click="$parent.gotoSetupStep('apiKeys')"
            class="flex items-center justify-center w-2/3 float-left rounded py-2 border-2 border-blue-600 my-4 text-blue-600">
      <img src="images/bitcoin_icon.svg" alt="bitcoin_icon" class="w-4 h-4 m-2"/>
      <span class="my-auto">Log assets from Binance</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SelectSetupAssetLogger",
}
</script>

<style scoped>

</style>