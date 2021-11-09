<template>
  <div>
    <div>
      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.fiat">
        <AddFiatModal class="m-auto" />
      </div>

<!--      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.selectAssetLogger">-->
      <div class="flex" v-if="!user.finished_setup">
        <SelectSetupAssetLogger class="m-auto" />
      </div>

      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.apiKeys">
        <AddApiKeysModal class="m-auto"/>
      </div>

      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.done">
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

      <div v-show="false">
          <Tip v-if="allowedToViewDevUpdate">
              <em>Based On Analysis (BOA): We suggest you <strong>SELL/BUY 60%</strong> of DOGE...</em>
          </Tip>

          <Tip v-if="allowedToViewDevUpdate">
              <em>We suggest you <strong>HODL 20%</strong> of BTC for the next 2 months...</em>
          </Tip>

          <Tip v-if="allowedToViewDevUpdate">
              <em>Your ETH has grown over 20% in the last x days. This may be a good time to sell.</em>
          </Tip>
      </div>


      <DashboardHeader />


      <div class="text-left">
        <!-- class attribute is intentionally spelled wrongly as clas in order to disable the effect -->
        <div class="hidden mt-4 mb-12 md:grid grid-cols-2 gap-4">
          <DashboardTotalAssetCard
              v-if="earningsSummary"
              :chart-data="earningsSummary"
              clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
          />
          <DashboardAssetsValue
              clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
          />
        </div>


        <div class="block md:hidden mt-0 mb-2 grid gap-4">
          <vueper-slides class="no-shadow"
                         autoplay
                         fixed-height="130px"
                         :bullets="false"
                         :arrows="false"
                         :duration="7000"
                         transition-speed="1500"
                         :visible-slides="1"
                         :init-slide="1"
                         :gap="6">
              <vueper-slide>
                <template #content>
                  <DashboardAssetsValue class="bg-gradient-to-b from-blue-600 to-blue-800 text-white"/>
                </template>
              </vueper-slide>

            <vueper-slide>
              <template #content>
                <DashboardTotalAssetCard v-if="earningsSummary" :chart-data="earningsSummary"
                    class="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
                />
              </template>
            </vueper-slide>
          </vueper-slides>
        </div>

        <h5 class="font-bold inline-block text-blue-800">Assets</h5>
        <span class="block md:hidden float-right text-sm text-blue-800">See All</span>
        <DashboardAssetsTickers class="mt-2 mb-1 md:mb-10" v-if="earningsSummary"
                                :default-icon="earningsSummary.default_icon"
                                :assets="earningsSummary" />


  <!--      <div v-if="topPerformingAssets">-->
          <AssetList class="mt-0" title="Top Performing Assets"
                     type="top-performing"
                     :thStyle="'border-blue-200 bg-blue-100'"
                     :tdStyle="'border-green-200 bg-green-100'" />
        </div>
      </div>
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
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

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
    AssetList,Tip, VueperSlides, VueperSlide
  },
  data() {
    return {
      topPerformingAssets: null,
      earningsSummary: null
    }
  },

  async mounted() {
    // this.showLoader();
    await this.getEarningsSummary();
  },

  methods: {
    noPendingSetupStep() {
      return (!this.$store.state.setupSteps.fiat &&
          !this.$store.state.setupSteps.selectAssetLogger &&
          !this.$store.state.setupSteps.apiKeys &&
          !this.$store.state.setupSteps.done);
    },

    async getEarningsSummary() {
      await Axios.get("/assets/report/earnings-summary")
          .then(resp => {
            this.earningsSummary = resp.data.data;
          })
          .catch(err => console.log(err))
          // .finally(() => this.hideLoader())x
    }
  }
}
</script>

<style scoped>

</style>