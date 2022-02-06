<template>
  <h1 class="font-bold mb-10">Wallet</h1>

  <h4 class="mb-4">Balance: <span class="font-bold">{{ user.fiat.symbol }} {{ wallet.current_balance.toLocaleString() }}</span></h4>
  <button class="text-blue-600 font-bold" @click="showFundBox">Fund Wallet</button>

  <div v-if="isFundBoxOpen">
    <small class="text-xs">Enter Amount</small>
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
               v-model="amount">
      </div>

      <paystack
          buttonClass="text-sm md:text-md bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          buttonText="Proceed"
          :publicKey="paystackPublicKey"
          :email="user.email"
          :amount="amount * 100"
          :reference="reference + (new Date().getMilliseconds())"
          :onSuccess="processPayment">
      </paystack>
    </div>
  </div>
</template>

<script>
import paystack from 'vue3-paystack';
import WalletService from "@/services/wallet";

export default {
  name: "Wallet",
  components: { paystack },
  data: () => {
    return {
      isFundBoxOpen: false,
      paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,
      amount: 0,
      full_name: null,
      wallet: {
        current_balance: 0
      }
    }
  },

  created() {
    this.getWalletBalance();
  },

  computed: {
    reference() {
      let text = "";
      let possible =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
  },
  methods: {
    async getWalletBalance() {
        const response = await WalletService.getBalance();

        if(response) {
          this.wallet.current_balance = response;
        }
    },

    showFundBox() {
      this.isFundBoxOpen = !this.isFundBoxOpen;
    },

    processPayment(trans) {
      this.saveWalletCredit(trans);
    },

    async saveWalletCredit(data) {
      this.showLoader();
      const response = await WalletService.creditUserWallet(data, this.amount);

      if(response) {
        await this.getWalletBalance();

        this.amount = 0;
        this.reference = "";
      }

      this.hideLoader();
    }
  },
}
</script>

<style scoped>

</style>