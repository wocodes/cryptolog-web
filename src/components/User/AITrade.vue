<template>
  <div>
    <h1 class="font-semibold mb-5">AI Trade</h1>

    <label class="text-lg mb-4 block">
      <input v-model="subscribedToAutoTrade"
             class="appearance-none
             h-5 w-5
             checked:bg-blue-600
             checked:border-transparent
             rounded focus:outline-none"
             name="autotrade"
             type="checkbox"
      />
      Subscribe for Auto Trade
      <a href="#" title="Subscribing for AI Trade requires a recurring charge of $10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="#999">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
      </a>
    </label>

    <div v-if="subscribedToAutoTrade" class="md:bg-transparent bg-white opacity-80 rounded-xl p-2 md:p-0">
      <p class="mb-1">Choose trading mode: (Auto or Manual)</p>
<!--      <div class="grid grid-cols-4 text-center">-->
      <div class="flow-root">
        <div class="text-center p-1 float-left md:h-28 md:w-48 h-18 w-1/2">
          <label class="block rounded-xl bg-gray-200 p-1 shadow">
            <p><input type="radio" name="trading_mode" value="auto" v-model="tradingMode" checked/></p>
            Auto Trader
            <small style="font-size:8px" class="block font-bold italic text-xs text-gray-600 leading-tight">Assetlog trades on your behalf.<br />Doesn't require API Keys</small>
          </label>
        </div>

        <div class="text-center p-1 float-left md:ml-4 md:h-28 md:w-48 h-18 w-1/2">
          <label class="block rounded-xl bg-gray-200 p-1 shadow">
            <p><input type="radio" name="trading_mode" value="manual" v-model="tradingMode" /></p>
            Manual Trader
            <small style="font-size:8px" class="block font-bold italic text-xs text-gray-600 leading-tight">You're in charge of your trades!<br /> Requires API Keys</small>
          </label>
        </div>
      </div>
    </div>

    <div class="block mt-8">
      <button class="change-button lg:w-1/4" type="submit" @click="saveSetting">Save</button>
    </div>
  </div>
</template>

<script>
import Axios from "../../../config/axios";
import Alerts from "@/utilities/alerts";

export default {
  name: "AITrade",
  data() {
    return {
      subscribedToAutoTrade: false,
      tradingMode: 'auto',
      subscriptionStatus: null
    }
  },

  created() {

    Axios.get('/assets/bot-trade/status')
        .then(response => {
          this.subscriptionStatus = response.data.data;
          this.subscribedToAutoTrade = !!this.subscriptionStatus;
        })
        .catch(e => console.error(e))
  },

  methods: {
    saveSetting() {
      let confirmationResponse = confirm(`NOTE: ${this.user.fiat.symbol}1000 amount will be deducted from wallet`);

      if (confirmationResponse) {
        const data = {
          mode: this.tradingMode,
          user_id: this.user.id
        }

        Axios.post('/assets/bot-trade/activate', data)
        .then(response => Alerts.showSuccessToast(response.data.message))
        .catch(e => Alerts.showErrorToast(e))
      }
    }
  }
}
</script>

<style scoped>

</style>