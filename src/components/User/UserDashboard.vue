<template>
  <div>
    <div>
      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.welcome">
        <WelcomeModal class="m-auto" />
      </div>

<!--      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.fiat">-->
<!--        <AddFiatModal class="m-auto" />-->
<!--      </div>-->

<!--      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.selectAssetlogger">-->
<!--        <SelectSetupAssetlogger class="m-auto" />-->
<!--      </div>-->

<!--&lt;!&ndash;      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.selectAssetlogger">&ndash;&gt;-->
<!--      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.cryptoSetupLogger">-->
<!--        <CryptoSetupLogger class="m-auto" />-->
<!--      </div>-->

<!--      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.apiKeys">-->
<!--        <AddApiKeysModal class="m-auto"/>-->
<!--      </div>-->

<!--      <div class="flex" v-if="!user.finished_setup && $store.state.setupSteps.done">-->
<!--        <SuccessAfterApiKeys class="m-auto"/>-->
<!--      </div>-->
    </div>

    <div v-if="user.finished_setup || $store.state.setupSteps.done">
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
                <DashboardTotalAssetCard
                    class="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
                />
              </template>
            </vueper-slide>
          </vueper-slides>
        </div>

        <div class="flow-root">
          <h5 class="font-bold inline-block text-blue-800 float-left">Assets</h5>
          <div class="float-right">
            <small class="text-xs font-bold rounded bg-yellow-500 text-black p-1 mx-1" @click="showAssetType = 'Cryptocurrency'">Crypto</small>
            <small class="text-xs font-bold rounded bg-green-500 text-black p-1 mx-1" @click="showAssetType = 'Real Estate'">Real Estate</small>
            <small class="text-xs font-bold rounded text-black p-1 mx-1" @click="showAssetType = 'All'">See All</small>
          </div>
        </div>

        <!-- class attribute is intentionally spelled wrongly as clas in order to disable the effect -->
        <small class="font-bold block mt-2 mb-0" v-if="showAssetType !== 'All'">{{ showAssetType }}</small>
        <div v-if="showAssetType !== 'All'" class="block mt-2 mb-3 md:grid grid-cols-2 gap-4">
          <DashboardTotalAssetCard
              :type="showAssetType"
              class="h-20"
              clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
          />
          <DashboardAssetsValue
              :type="showAssetType"
              clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
          />
        </div>

        <div v-if="showAssetType === 'All'" class="block mt-2 mb-3">
          <h6 class="text-xs font-bold">Cryptocurrency</h6>
          <div class="md:grid grid-cols-2 gap-4">
            <DashboardTotalAssetCard
                type="Cryptocurrency"
                class="h-20"
                clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
            />
            <DashboardAssetsValue
                type="Cryptocurrency"
                clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
            />
          </div>
        </div>

        <div v-if="showAssetType === 'All'" class="block mt-2 mb-3">
          <h6 class="text-xs font-bold">Real Estate</h6>
          <div class="md:grid grid-cols-2 gap-4">
            <DashboardTotalAssetCard
                type="Real Estate"
                class="h-20"
                clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
            />
            <DashboardAssetsValue
                type="Real Estate"
                clas="bg-gradient-to-b from-blue-600 to-blue-800 text-white"
            />
          </div>
        </div>



          <!--          <span class="block md:hidden float-right text-sm text-blue-800">See All</span>-->
<!--          <DashboardAssetsTickers class="mt-2 mb-1 md:mb-10" v-if="earningsSummary"-->
<!--                                  :default-icon="earningsSummary.default_icon"-->
<!--                                  :assets="earningsSummary" />-->
<!--        </div>-->
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
import AssetList from "@/components/AssetList";
import Tip from "@/components/Shared/Tip";
// import AddFiatModal from "@/components/Dashboard/Welcome/AddFiatModal";
// import SelectSetupAssetlogger from "@/components/Dashboard/Welcome/SelectSetupAssetlogger";
// import AddApiKeysModal from "@/components/Dashboard/Welcome/AddApiKeysModal";
// import SuccessAfterApiKeys from "@/components/Dashboard/Welcome/SuccessAfterApiKeys";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardTotalAssetCard from "@/components/Dashboard/DashboardTotalAssetCard";
import DashboardAssetsValue from "@/components/Dashboard/DashboardAssetsValue";
// import DashboardAssetsTickers from "@/components/Dashboard/DashboardAssetsTickers";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
// import CryptoSetupLogger from "@/components/Dashboard/Welcome/CryptoSetupLogger";
import WelcomeModal from "@/components/Dashboard/Welcome/WelcomeModal";

export default {
  name: "UserDashboard",
  components: {
    WelcomeModal,
    // CryptoSetupLogger,
    // DashboardAssetsTickers,
    DashboardAssetsValue,
    DashboardTotalAssetCard,
    DashboardHeader,
    // SuccessAfterApiKeys,
    // AddApiKeysModal,
    // SelectSetupAssetlogger, AddFiatModal,
    AssetList,Tip, VueperSlides, VueperSlide
  },
  data() {
    return {
      topPerformingAssets: null,
      showAssetType: 'Real Estate'
    }
  },

  async mounted() {
    // this.showLoader();
  },

  methods: {
    noPendingSetupStep() {
      return (!this.$store.state.setupSteps.fiat &&
          !this.$store.state.setupSteps.selectAssetlogger &&
          !this.$store.state.setupSteps.apiKeys &&
          !this.$store.state.setupSteps.done);
    },
  }
}
</script>

<style scoped>

</style>