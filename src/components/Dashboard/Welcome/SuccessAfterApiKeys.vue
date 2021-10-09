<template>
  <div class="p-6 w-full md:w-1/2 mt-6 mx-4 md:mx-auto bg-white rounded-xl flex flex-col items-center justify-center shadow-lg">
    <img src="images/success.svg" alt="welcome" class="my-2"/>

    <h3 class="font-bold text-lg my-4">Success</h3>

    <p class="w-3/4 text-gray-500">Yay! Your assets have been successfully logged!</p>

    <button class="w-full md:w-1/2 rounded py-2 bg-blue-600 border-2 border-blue-600 mt-6 text-white">
      <span class="my-auto" @click="$parent.gotoSetupStep()">Go to my dashboard</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SuccessAfterApiKeys",
  created() {
    // this.gotoSetupStep('apiKeys');
  }
}
</script>

<style scoped>

</style>