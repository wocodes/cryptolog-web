<template>
    <!-- Navbar -->
    <nav
        class="absolute top-0 left-0 w-full z-10 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center md:p-0"
    >
        <div
            class="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
        >
            <!-- Brand -->
            <a
                class="p-2 text-primary text-sm uppercase hidden lg:inline-block font-semibold"
                href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/dashboard"
            >{{ $route.name }}</a
            >
            <!-- Form -->

          <div class="m-1 py-2 pl-4 bg-blue-200 shadow rounded md:flex hidden flex-row flex-wrap items-center lg:ml-auto">
            <router-link :to="{name: 'wallet'}"><i class="fas fa-wallet mr-1"></i></router-link>
            {{ walletBalance.toLocaleString() }}

            <select class="border-0 bg-transparent py-0" @change="toggleCurrencies()" v-model="selectedCurrency">
              <option v-for="(currency, index) in currencies" :key="index" :selected="!user.fiat ? true : currency.symbol === user.fiat.symbol" :value="currency.symbol">{{ currency.symbol }}</option>
            </select>
          </div>

            <!-- User -->
            <ul
                class="flex-col md:flex-row list-none items-center hidden md:flex space-x-4"
            >
                <notification-dropdown></notification-dropdown>
                <user-dropdown-component></user-dropdown-component>
                <div class="font-bold">
                    {{ user.name }}
                </div>
            </ul>
        </div>
    </nav>

    <!-- End Navbar -->
</template>
<script>
import UserDropdownComponent from "./UserDropdown.vue";
import NotificationDropdown from "@/components/Layout/NotificationDropdown";
export default {
    name: "NavbarComponent",
    components: {
        NotificationDropdown,
        UserDropdownComponent
    },
  data() {
      return {
        currencies: [
          {symbol: 'USD'}
        ],
        selectedCurrency: this.$store.state.user.fiat ? this.$store.state.user.fiat.symbol : "USD",
        walletBalance: this.$store.state.user.wallet.current_balance
      }
  },

  created() {
      this.currencies.push({symbol: this.user.fiat ? this.user.fiat.symbol : ""});
  },

  methods: {
      toggleCurrencies() {
        this.walletBalance = this.selectedCurrency === 'USD' ? this.walletBalance / (this.user.fiat ? this.user.fiat.usdt_buy_rate : 1) : this.$store.state.user.wallet.current_balance
      }
  }
};
</script>
