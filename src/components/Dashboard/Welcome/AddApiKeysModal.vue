<template>
  <div class="p-6 w-full md:w-1/2 mt-6 mx-4 md:mx-auto bg-white rounded-xl text-center shadow-lg">
    <h3 class="font-bold text-lg">Connect Assetlog to your Binance</h3>

    <p class="text-gray-500 leading-normal text-xs">
      Your data is safe! We only require this step in order to read your existing assets.<br>
      We WON'T perform any other form of transaction.
    </p>

    <div class="mt-8">
      <h6 class="text-sm text-left">API Key</h6>
      <input type="text" v-model="api.key" class="w-full rounded border-3 border-gray-300 mb-4"/>

      <h6 class="text-sm text-left">Secret Key</h6>
      <input type="text" v-model="api.secret" class="w-full rounded border-3 border-gray-300"/>

      <div class="text-left my-3 text-blue-600">
        <input type="checkbox"> Accept privacy policy
      </div>
    </div>

    <button class="rounded bg-blue-600 py-2 px-6 mt-8 w-1/2 text-white" @click="saveApiKeys">Log Assets</button>

    <a href="#" class="text-xs mt-6 block text-gray-500">Watch how to generate API Keys</a>
  </div>
</template>

<script>
import Axios from "../../../../config/axios";

export default {
  name: "AddApiKeysModal",
  data() {
    return {
      api: {
        key: 'LbcvrB9bNo0yY2Am7FlqKGW7qY2P9BMApf4dWe2CgZoTTZ0m5r46aSPkboP4nNPt',
        secret: 'TUoM5G9ArPctiQPOS6YutMXVskPXOGPpYMDfLaKggQodgIPAQGXb4rf4Xm6Za5Dt'
      },
    }
  },
  async created() {
    try {
      const {data} = await Axios.get('fiats');

      this.fiats = data.data.map(fiat => {
        return {label: `${fiat.name} (${fiat.symbol})`, value: fiat.id};
      });
    } catch(e) {
      console.error(e)
    }
  },

  methods: {
    async saveApiKeys() {
      try {
        this.showLoader();

        await Axios.post('user/api-keys', {...this.api})
        this.showSuccessToast("API Keys has been set. Please wait while we fetch your assets.");

        setTimeout(() => {
          this.gotoSetupStep('done');
          this.hideLoader();
          }, 3000);
      } catch (e) {
        console.error(e);
      }
    },
  }
}
</script>

<style scoped>

</style>