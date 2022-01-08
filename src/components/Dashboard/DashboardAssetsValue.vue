<template>
  <div class="w-full md:text-black bg-white rounded-xl shadow-lg justify-center py-3 flow-root"
       :class="{'md:py-5' : selectedType !== undefined, 'md:py-10' : selectedType === undefined}">
    <div class="block md:float-left w-52">
      <svg title="Click to Show Fiat/Local Values" @click="showFiat = !showFiat" class="float-left mx-3 cursor-pointer bg-white rounded-lg" width="40" height="41" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.5" width="50" height="50" rx="10" fill="#1565D8" fill-opacity="0.1"/>
        <path d="M16.1251 32.375H34.2505C34.2505 33.4105 33.4111 34.25 32.3755 34.25H15.5001C14.1193 34.25 13 33.1306 13 31.75V21.125C13 20.0895 13.8395 19.25 14.8751 19.25V31.125C14.8751 31.8153 15.4347 32.375 16.1251 32.375ZM38 19.25V28C38 29.3807 36.8808 30.5 35.5 30.5H19.2501C17.8694 30.5 16.7501 29.3807 16.7501 28V19.25C16.7501 17.8692 17.8694 16.75 19.2501 16.75H35.5C36.8808 16.75 38 17.8692 38 19.25ZM36.125 19.25C36.125 18.9054 35.8446 18.625 35.5 18.625H19.2501C18.9055 18.625 18.6251 18.9054 18.6251 19.25V28C18.6251 28.3446 18.9055 28.625 19.2501 28.625H35.5C35.8446 28.625 36.125 28.3446 36.125 28V19.25ZM27.3748 19.875C25.6488 19.875 24.2497 21.5539 24.2497 23.625C24.2497 25.6961 25.6488 27.375 27.3748 27.375C29.1007 27.375 30.4998 25.6961 30.4998 23.625C30.4998 21.5539 29.1007 19.875 27.3748 19.875Z" fill="#1565D8"/>
      </svg>

      <DashboardAssetsValueType class="text-xs md:text-md"
                                :show-fiat="showFiat"
                                title="Total Value"
                                :value="totalValue.usd"
                                :fiat-value="totalValue.fiat"/>
    </div>

    <div class="ml-16 md:m-0 mt-3 md:mt-0 grid grid-cols-2 gap-4">
      <DashboardAssetsValueType class="text-xs md:text-md"
                                :show-fiat="showFiat"
                                :title="(selectedType === undefined ? 'Total ' : '') + 'Profit'"
                                :value="totalProfit.usd"
                                :fiat-value="totalProfit.fiat"/>

      <DashboardAssetsValueType class="text-xs md:text-md"
                                :show-fiat="showFiat"
                                :title="(selectedType === undefined ? 'Total ' : '') + 'Loss'"
                                :value="totalLoss.usd"
                                :fiat-value="totalLoss.fiat"/>
    </div>
  </div>
</template>

<script>
import DashboardAssetsValueType from "@/components/Dashboard/DashboardAssetsValueType";
import Axios from "../../../config/axios";

export default {
  name: "DashboardAssetsValue",
  components: {DashboardAssetsValueType},
  props: {
    type: String
  },
  data() {
    return {
      showFiat: false,
      totalAssets: 0,
      totalValue: {},
      totalProfit: {},
      totalLoss: {},
      selectedType: this.type
    }
  },

  // watch: {
  //   type: function(val) {
  //     this.type = val;
  //     return this.getDashboardStats();
  //   }
  // },

  methods: {
    getDashboardStats() {
      const assetType = this.selectedType !== undefined ? "/" + this.selectedType : "";

      Axios.get("/user/dashboard/stats" + assetType)
          .then(resp => {
            this.totalAssets = resp.data.data.assets_count;
            this.totalValue = resp.data.data.assets_value;
            this.totalProfit = resp.data.data.assets_profit;
            this.totalLoss = resp.data.data.assets_loss;
          })
          .catch(err => console.log(err));
    },
  },

  watch: {
    type: function(val) {
      this.selectedType = val;

      this.getDashboardStats();
    }
  },

  mounted() {
    this.getDashboardStats();
  }
}
</script>

<style scoped>

</style>