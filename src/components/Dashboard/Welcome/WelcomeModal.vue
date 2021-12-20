<template>
  <div class="w-full">
    <div v-if="!isLogSelectorOpen" class="w-full md:w-full mt-6 mx-4 py-20 text-center md:mx-auto bg-white rounded-xl text-left shadow">
      <h1 class="text-gray-700 font-bold text-4xl">Welcome to Assetlog</h1>

      <h3 class="text-2xl text-gray-400 my-6">Great to have you on board! Feel free to explore, or get a head start below.</h3>

      <div class="grid grid-cols-2 m-20 gap-x-10">
        <div style="cursor: pointer" class="border-2 border-gray-300 hover:border-blue-500 rounded-3xl p-2 text-center">
          <img src="/images/options.png" class="m-auto" />

          <h3 class="mt-5 font-bold text-2xl">Take a mini tour</h3>
          <p class="text-xl text-gray-400 mx-10 my-5">Watch a walkthrough process of how assetlog works and how to use it.</p>
        </div>

        <div @click="openFiatSelector()"
             style="cursor: pointer"
             class="border-2 border-gray-300 hover:border-blue-500 rounded-3xl p-2 text-center">
          <img src="/images/layer.png" class="m-auto" />

          <h3 class="mt-5 font-bold text-2xl">Log your first asset</h3>
          <p class="text-xl text-gray-400 mx-10 my-5">Waste no time getting started. Proceed to log your first asset!</p>
        </div>
      </div>
    </div>

    <AddFiatModal :is-open="isFiatSelectorOpen"
                  v-if="isFiatSelectorOpen"
                  @savedFiatCurrency="handleSelectedFiat" />

    <LogSelector :is-open="isLogSelectorOpen"
                 v-if="isLogSelectorOpen" />
  </div>
</template>

<script>
import LogSelector from "@/components/Dashboard/Welcome/LogSelector";
import AddFiatModal from "@/components/Dashboard/Welcome/AddFiatModal";
export default {
  name: "WelcomeModal",
  components: {AddFiatModal, LogSelector},
  data() {
    return {
      isLogSelectorOpen: false,
      isFiatSelectorOpen: false
    }
  },

  methods: {
    openFiatSelector() {
      this.isFiatSelectorOpen = true;
    },

    handleSelectedFiat() {
      this.isFiatSelectorOpen = false;
      this.isLogSelectorOpen = true;

      console.log('asd', this.isLogSelectorOpen);
    }
  }
}
</script>

<style scoped>

</style>