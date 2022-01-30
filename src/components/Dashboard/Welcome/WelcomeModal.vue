<template>
  <div class="w-full">
    <div v-if="!isLogSelectorOpen" class="w-full mt-6 px-5 md:py-20 py-10 text-center md:mx-auto bg-white rounded-xl text-left shadow">
      <h1 class="text-gray-700 font-bold md:text-4xl text-2xl">Welcome to Assetlog</h1>

      <h3 class="md:text-2xl text-xl text-gray-400 my-6">Great to have you on board! Feel free to explore, or get a head start below.</h3>

      <div class="grid md:grid-cols-2 md:m-20 gap-x-10 gap-y-10">
        <div style="cursor: pointer" class="border-2 border-gray-300 hover:border-blue-500 rounded-3xl p-2 text-center">
          <img src="/images/options.png" class="m-auto" />

          <h3 class="mt-5 font-bold text-2xl">Take a mini tour</h3>
          <p class="text-xl text-gray-400 mx-10 my-5 md:block hidden">Watch a walkthrough process of how assetlog works and how to use it.</p>
        </div>

        <div @click="openFiatSelector()"
             style="cursor: pointer"
             class="border-2 border-gray-300 hover:border-blue-500 rounded-3xl p-2 text-center">
          <img src="/images/layer.png" class="m-auto" />

          <h3 class="mt-5 font-bold text-2xl">Log your first asset</h3>
          <p class="text-xl text-gray-400 mx-10 my-5 md:block hidden">Waste no time getting started. Proceed to log your first asset!</p>
        </div>
      </div>

      <div class="mt-12 flow-root">
<!--        <button class="float-right rounded border border-blue-600 py-2 px-6 w-24 text-blue-600" @click="gotoDashboard()">Skip</button>-->
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
import Axios from "../../../../config/axios";
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
    },

    async gotoDashboard() {
      await Axios.get('/user/complete-setup');

      this.gotoSetupStep('done');
    }
  }
}
</script>

<style scoped>

</style>