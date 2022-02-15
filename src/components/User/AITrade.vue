<template>
  <div>
    <h1 class="font-semibold mb-5">AI Trade</h1>

    <div class="success-data text-white bg-green-600 rounded-xl p-2 font-bold shadow mb-10" v-if="successData" v-html="successData"></div>
    <div class="success-data text-white bg-red-600 rounded-xl p-2 font-bold shadow mb-10" v-if="errorData" v-html="errorData"></div>


    <div class="md:grid md:grid-cols-2" v-if="subscribedToAITrade">
      <div class="block w-full mb-10">
        <label class="text-lg mb-4 block">
          <input v-model="subscribedToAITrade"
                 class="appearance-none
             h-5 w-5
             checked:bg-blue-600
             checked:border-transparent
             rounded focus:outline-none"
                 name="autotrade"
                 type="checkbox"
          />
          Subscribe for AI Trade
          <a href="#" title="Subscribing for AI Trade requires a recurring charge of $10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="#999">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </label>

        <div v-if="subscribedToAITrade" class="md:bg-transparent bg-white opacity-80 rounded-xl p-2 md:p-0">
          <p class="mb-1">Choose trading strategy</p>
          <!--      <div class="grid grid-cols-4 text-center">-->
          <div class="flow-root">
            <div class="text-center p-1 float-left md:h-28 md:w-28 h-18 w-1/2">
              <label class="block rounded-xl bg-gray-200 p-1 shadow font-bold">
                <p class="my-2"><input type="radio" name="trading_mode" value="auto" v-model="tradingMode" checked/></p>
                MA Trader
<!--                <small style="font-size:8px" class="block font-bold italic text-xs text-gray-600 leading-tight">-->
<!--                  Assetlog trades on your behalf.<br />Doesn't require API Keys-->
<!--                </small>-->
              </label>
            </div>

<!--            <div class="text-center p-1 float-left md:ml-4 md:h-28 md:w-28 h-18 w-1/2">-->
<!--              <label class="block rounded-xl bg-gray-200 p-1 shadow">-->
<!--                <p><input type="radio" name="trading_mode" value="auto" v-model="tradingMode" /></p>-->
<!--                DCA Trader-->
<!--                <small style="font-size:8px" class="block font-bold italic text-xs text-gray-600 leading-tight">You're in charge of your trades!<br /> Requires API Keys</small>-->
<!--              </label>-->
<!--            </div>-->
          </div>


          <small class="text-xs">Enter Trading Amt (min. ${{ minTradingAmountUsd }} ~{{ user.fiat.symbol }}{{ minTradingAmount }}) rate $1/{{ user.fiat.symbol }}{{user.fiat.usdt_buy_rate.toFixed()}}</small>
          <div class="grid grid-cols-3 rounded-lg bg-white h-12 md:w-80 p-1">
            <div class="relative text-gray-400 focus-within:text-gray-600 col-span-2">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              <input id="amount" required
                     class="md:text-lg h-full placeholder-gray-400 text-gray-900 rounded-lg w-full block pl-12 focus:outline-none"
                     placeholder="Enter Amount"
                     v-model="tradingAmount">
            </div>
          </div>
          <!--      <small class="text-red-900">Total charge = {{ user.fiat.symbol }}{{ subscriptionFee + tradingAmount }} <span style="font-size:10px;">(Fee - {{ subscriptionFee }} + Trading Amount - {{ tradingAmount }})</span></small>-->

        </div>

        <div class="block mt-8">
          <button class="change-button lg:w-1/4" type="submit" @click="saveSetting">Save</button>
        </div>
      </div>

      <div class="text-xs md:text-md">
        <ul v-if="logs.length">
          <li class="grid grid-cols-4">
            <span class="font-bold bg-gray-400 p-1 rounded-tl-xl">Date</span>
            <span class="font-bold bg-gray-400 p-1">Bought</span>
            <span class="font-bold bg-gray-400 p-1">Sold</span>
            <span class="font-bold bg-gray-400 p-1 rounded-tr-xl">Difference</span>
          </li>

          <li v-for="(log, index) in logs" :key="index" class="grid grid-cols-4 p-1 border-gray-400 border-b">
            <span>{{ new Date(log.created_at).toLocaleString() }}</span>
            <span>${{ parseFloat(log.value_bought).toFixed(2) }}</span>
            <span>${{ parseFloat(log.value_sold).toFixed(2) }}</span>
            <span v-if="log.value_sold && log.value_sold - log.value_bought < 0" :class="{'text-red-700': log.value_sold - log.value_bought < 0}">
              ${{ parseFloat(log.value_bought - log.value_sold).toFixed(2) }}
            </span>
            <span v-if="log.value_sold && log.value_sold - log.value_bought > 0" :class="{'text-green-600': log.value_sold - log.value_bought > 0}">
              ${{ parseFloat(log.value_sold - log.value_bought).toFixed(2) }}
            </span>
            <span v-if="!log.value_sold">-</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import Axios from "../../../config/axios";
import Alerts from "@/utilities/alerts";
import WalletService from "@/services/wallet";
import BotTradeService from "@/services/BotTradeService";

export default {
  name: "AITrade",
  data() {
    return {
      minTradingAmountUsd: parseInt(process.env.MIN_TRADING_AMOUNT_USD),
      // minTradingAmount: Math.round((12 * this.$store.state.user.fiat.usdt_buy_rate)/1000)*1000,
      minTradingAmount: Math.round(parseInt(process.env.MIN_TRADING_AMOUNT_USD) * this.$store.state.user.fiat.usdt_buy_rate),
      // subscriptionFee: parseInt(process.env.TRADING_BOT_FEE),
      tradingAmount: 0,
      successData: null,
      errorData: null,
      subscribedToAITrade: false,
      tradingMode: 'auto',
      subscriptionStatus: null,
      walletBalance: 0,
      logs: []
    }
  },

  async created() {
    try {
      const statusResponse = await Axios.get('/assets/bot-trade/status');

      this.subscriptionStatus = statusResponse.data.data;
      this.subscribedToAITrade = !!this.subscriptionStatus;

      if(!this.subscribedToAITrade) {
        this.errorData = `<ul class="m-0 p-0 font-light"><li><span class="fas fa-times"></span> Can't use AI Trade as you don't have an active subscription. Please subscribe.</li></ul>`
      }

      this.walletBalance = await WalletService.getBalance();

      let vuex = JSON.parse(localStorage.getItem('vuex'));
      this.$store.commit('storeUser', vuex.user);

      this.logs = await BotTradeService.getLogs();

    } catch (e) {
      Alerts.showErrorToast(e);
    }
  },

  methods: {
    saveSetting() {
      // if(this.minTradingAmount + this.subscriptionFee > this.walletBalance) {
      if(this.minTradingAmount > this.walletBalance) {
        return Alerts.showErrorToast("Insufficient Wallet Balance");
      }

      // const alertMsg = `${this.user.fiat.symbol}${parseInt(this.subscriptionFee) + parseInt(this.tradingAmount)} (Fee: ${this.subscriptionFee} + Trading Amount: ${this.tradingAmount}) will be deducted from your wallet`;
      const alertMsg = `${this.user.fiat.symbol}${parseInt(this.tradingAmount)} will be deducted from your wallet`;
      let confirmationResponse = confirm(alertMsg);

      if (confirmationResponse) {
        const data = {
          mode: this.tradingMode,
          user_id: this.user.id,
          trading_amount: this.tradingAmount
        }

        Axios.post('/assets/bot-trade/activate', data)
        .then(response => {
          let details;
          if (response.data.data.length) {
            details = '<ul class="m-0 p-0 font-light">';
            const detailsArr = Object.values(response.data.data).flat();
            detailsArr.forEach(detail => details += `<li><span class="fas fa-check"></span> ${detail}</li>`);
            details += '</ul>';
          }

          this.successData = details;
          Alerts.showSuccessToast(response.data.message);
        })
        .catch(e => Alerts.showErrorToast(e.response.data.message, e))
      }
    },
  }
}
</script>

<style scoped>

</style>