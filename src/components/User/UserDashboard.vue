<template>
  <div class="flex h-screen" v-if="!user.finished_setup && (!user.fiat_id || $store.state.setupSteps.fiat)">
    <AddFiatModal class="m-auto" />
  </div>

  <div class="flex h-screen" v-if="!user.finished_setup && $store.state.setupSteps.selectAssetLogger">
    <SelectSetupAssetLogger class="m-auto" />
  </div>

  <div class="flex h-screen" v-if="!user.finished_setup && $store.state.setupSteps.apiKeys">
    <AddApiKeysModal class="m-auto"/>
  </div>

  <div class="flex h-screen" v-if="!user.finished_setup && $store.state.setupSteps.done">
    <SuccessAfterApiKeys class="m-auto"/>
  </div>

  <div v-if="user.finished_setup">
    <!-- Tips -->

    <!-- if average of top 10 assets are positive, show this else show thumbs down -->
    <!--    <Tip v-if="allowedToViewDevUpdate"-->
    <!--         :title="'You are doing well'"-->
    <!--         :icon="'https://img.icons8.com/fluency/64/000000/thumb-up.png'">-->
    <!--    </Tip>-->

    <Tip v-if="allowedToViewDevUpdate">
      <em>Based On Analysis (BOA): We suggest you <strong>SELL/BUY 60%</strong> of DOGE...</em>
    </Tip>

    <Tip v-if="allowedToViewDevUpdate">
      <em>We suggest you <strong>HODL 20%</strong> of BTC for the next 2 months...</em>
    </Tip>

    <Tip v-if="allowedToViewDevUpdate">
      <em>Your ETH has grown over 20% in the last x days. This may be a good time to sell.</em>
    </Tip>


    <DashboardHeader />


    <div class="text-left">
      <div class="mt-4 mb-4 grid grid-cols-2 gap-4 mb-12"> <!-- DUMMY CHART DATA VIEW -->
        <DashboardTotalAssetCard v-if="earningsSummary" :chart-data="earningsSummary" />
        <DashboardAssetsValue />
      </div>

      <DashboardAssetsTickers class="mb-10" v-if="earningsSummary"
                              :default-icon="earningsSummary.default_icon"
                              :assets="earningsSummary" />


      <h1 class="text-2xl font-bold mb-2 mr-2 inline-block">Top Performing Assets</h1>
      <small><em>(Refreshes every 30 minutes)</em></small>

      <button class="bg-green-700 font-bold py-1 px-2 rounded-md inline-block float-right text-sm text-white"
              @click="fetchUpdatedAssetsData">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
      </button>

      <div v-if="topPerformingAssets">
        <AssetList :data="topPerformingAssets"
                   :thStyle="'border-blue-200 bg-blue-100'"
                   :tdStyle="'border-green-200 bg-green-100'" />
      </div>
    </div>
    <hr class="m-8">
  </div>
</template>

<script>
import AssetList from "@/components/AssetList";
import Tip from "@/components/Shared/Tip";
import Axios from "../../../config/axios";
import AddFiatModal from "@/components/Dashboard/Welcome/AddFiatModal";
import SelectSetupAssetLogger from "@/components/Dashboard/Welcome/SelectSetupAssetLogger";
import AddApiKeysModal from "@/components/Dashboard/Welcome/AddApiKeysModal";
import SuccessAfterApiKeys from "@/components/Dashboard/Welcome/SuccessAfterApiKeys";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardTotalAssetCard from "@/components/Dashboard/DashboardTotalAssetCard";
import DashboardAssetsValue from "@/components/Dashboard/DashboardAssetsValue";
import DashboardAssetsTickers from "@/components/Dashboard/DashboardAssetsTickers";

export default {
  name: "UserDashboard",
  components: {
    DashboardAssetsTickers,
    DashboardAssetsValue,
    DashboardTotalAssetCard,
    DashboardHeader,
    SuccessAfterApiKeys,
    AddApiKeysModal,
    SelectSetupAssetLogger, AddFiatModal, AssetList, Tip
  },
  data() {
    return {
      topPerformingAssets: null,
      earningsSummary: null
    }
  },

  mounted() {
    this.showLoader();
    this.fetchTopPerformingAssets();
    this.getEarningsSummary();
  },

  methods: {
    noPendingSetupStep() {
      return (!this.$store.state.setupSteps.fiat &&
          !this.$store.state.setupSteps.selectAssetLogger &&
          !this.$store.state.setupSteps.apiKeys &&
          !this.$store.state.setupSteps.done);
    },

    fetchTopPerformingAssets() {
      Axios.get("/logs", {params: {'mode': 'top-performing'}})
          .then(resp => {
            this.topPerformingAssets = resp.data.data.data
          })
          .catch(err => console.log(err))
          .finally(() => this.hideLoader());
    },

    fetchUpdatedAssetsData() {
      this.showLoader();
      Axios.get("/logs/update")
          .then(() => {
            this.fetchTopPerformingAssets();
          })
          .catch(err => console.log(err));
    },

    getEarningsSummary() {
      Axios.get("/assets/report/earnings-summary")
          .then(resp => {
            this.earningsSummary = resp.data.data;
          })
          .catch(err => console.log(err))
          .finally(() => this.hideLoader())
    }
  }
}
</script>

<style scoped>

</style>