<template>
  <div>
    <div>
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
        <!-- class attribute is intentionally spelled wrongly as clas in order to disable the effect -->
        <div class="mt-4 mb-4 grid grid-cols-2 gap-4 mb-12">
          <DashboardTotalAssetCard
              v-if="earningsSummary"
              :chart-data="earningsSummary"
              clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
          />
          <DashboardAssetsValue
              clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
          />
        </div>

        <h5 class="font-bold">Assets</h5>
        <DashboardAssetsTickers class="mb-10" v-if="earningsSummary"
                                :default-icon="earningsSummary.default_icon"
                                :assets="earningsSummary" />


  <!--      <div v-if="topPerformingAssets">-->
          <AssetList title="Top Performing Assets"
                     type="top-performing"
                     :thStyle="'border-blue-200 bg-blue-100'"
                     :tdStyle="'border-green-200 bg-green-100'" />
        </div>
      </div>
      <hr class="m-8">
    </div>
</template>

<script>
import Axios from "../../../config/axios";
import AssetList from "@/components/AssetList";
import Tip from "@/components/Shared/Tip";
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
    SelectSetupAssetLogger, AddFiatModal,
    AssetList,
      Tip
  },
  data() {
    return {
      topPerformingAssets: null,
      earningsSummary: null
    }
  },

  mounted() {
    // this.showLoader();
    this.getEarningsSummary();
  },

  methods: {
    noPendingSetupStep() {
      return (!this.$store.state.setupSteps.fiat &&
          !this.$store.state.setupSteps.selectAssetLogger &&
          !this.$store.state.setupSteps.apiKeys &&
          !this.$store.state.setupSteps.done);
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