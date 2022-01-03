<template>
    <div class="text-left bg-white rounded lg:w-3/4">

        <form class="">
            <div class="px-4 py-2 md:px-8 md:py-3">
                <h1 class="text-xl inline-block">New Asset - {{ $route.params.type}}</h1>
            </div>

            <div class="border-b border-black border-opacity-10"></div>

            <div class="grid grid-flow-row grid-cols-2 grid-rows-3 gap-6 px-4 py-2 md:px-8 md:py-3">
                <div class="">
                    <label class="block text-sm font-medium text-gray-700" for="asset-name">Asset Type</label>

                    <Multiselect :options="assetTypes"
                                 v-model="selectedAssetType"
                                 :searchable="true"
                                 :required="true"
                                 :allow-empty="false"
                                 @search-change="loadAssetsOfAssetType"
                    >
                    </Multiselect>
                </div>

                <div v-if="assets.length" class="">
                    <label class="block text-sm font-medium text-gray-700" for="asset-name">Asset</label>
                    <Multiselect :options="assets"
                                 v-model="selectedAsset"
                                 :searchable="true"
                                 :required="true"
                                 :block-keys="['Enter']"
                                 @change="loadExchangesOfAsset"
                    >
                    </Multiselect>

                </div>

                <div class="">
                    <label class="block text-sm font-medium text-gray-700" for="asset-name">Exchange/Platform</label>
                    <!--
                    TODO: The expected behaviour here is that when a user searches for a platform
                          and doesn't see/select it from the options, then the searched value should be added to the
                          empty options list and then allow the user select it, while the value will be passed to the
                          backend for adding to db. Currently not working
                    -->
                    <Multiselect v-model="log.platform.id"
                                 :options="assetPlatformsOptions"
                                 :required="true"
                                 :searchable="true"
                                 @search-change="addValueToOptions($event)"
                                 @close="closePlatformOptions"
                    >
                    </Multiselect>
                </div>

                <div v-if="selectedAssetType && selectedAsset" class="">
                    <label class="block text-sm font-medium text-gray-700" for="dob">Date of
                        purchase</label>
                    <input id="dob"
                           v-model="log.date_of_purchase"
                           class="input-design"
                           type="date"/>
                </div>

                <div v-if="selectedAssetType && selectedAsset" class="">
                    <label class="block text-sm font-medium text-gray-700" for="quantity">Quantity</label>
                    <input id="quantity" v-model="log.quantity_bought"
                           class="input-design"
                           type="text"/>
                </div>

                <div v-if="selectedAssetType && selectedAsset" class="">
                    <label class="block text-sm font-medium text-gray-700" for="initial-value">Amount/Price</label>
                    <input id="initial-value" v-model="log.initial_value"
                           class="input-design float-left"
                           style="width:70%"
                           type="text"/>
                  <div class="p-2 font-bold float-left border-gray-300 rounded-md bg-gray-200 mt-1 w-1/6">
                    <span v-if="!fiatValue" class="float-left">USD</span>
                    <span v-else class="float-left">{{ $store.state.user.fiat ? $store.state.user.fiat.symbol : 'USD' }}</span>
                  </div>
                  <span class="m-1 mt-3 inline-block" style="cursor: pointer" title="Change Currency" @click="fiatValue = !fiatValue">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#999">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </div>

                <div v-if="selectedAssetType && selectedAsset && selectedAssetType !== 1" class="">
                    <label class="block text-sm font-medium text-gray-700" for="quantity">Location</label>
                  <Multiselect v-model="log.location.id"
                               :options="assetLocationOptions"
                               :required="true"
                               :searchable="true"
                               :loading="loadingLocations"
                               @search-change="addLocationValueToOptions($event)"
                               @close="closeLocationOptions"
                  >
                  </Multiselect>
                </div>

                <div v-if="selectedAssetType && selectedAsset && selectedAssetType !== 1" class="">
                    <label class="block text-sm font-medium text-gray-700" for="initial-value">Interest Rate (%)</label>
                    <input id="interest-rate" v-model="log.interest_rate"
                           class="input-design"
                           type="text"/>
                </div>
            </div>

          <div class="px-4 py-2 md:px-8 md:py-3" v-if="selectedAssetType && selectedAsset">
            <label class="block text-sm font-medium text-gray-700" for="initial-value">Other Detail</label>
            <textarea id="other-detail" v-model="log.detail" class="input-design"></textarea>
            <small class="text-red-800 leading-tight inline-block italic">For real estate assets, if you think the average interest rate is incorrect, please kindly let us know in the chat below</small>
          </div>

        </form>
        <div class="px-4 pt-2 pb-8 md:px-8 md:pt-3">
            <button class="change-button lg:w-1/4" type="submit" @click="addAsset">Add Asset</button>
        </div>

    </div>
</template>

<script>
import Axios from '../../../../config/axios';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

TimeAgo.addDefaultLocale(en);

export default {
    name: 'CreateLog',
    components: {Multiselect},
    data() {
        return {
            selectedPlatform: {},
            log: {
              platform: {},
              location: {},
              first_ever: false
            },
            fiatValue: false,
            assetTypes: [],
            assets: [],
            assetPlatformsOptions: [],
            assetLocationOptions: [],
            selectedAssetType: null,
            selectedAsset: null,
            selectedExchange: null,
            searchedPlatformKeywords: [],
            searchedLocationKeywords: [],
            loadingLocations: false
        };
    },

    created() {
        // this.showLoader('Fetching Asset Types');
        Axios.get('/assets/types')
            .then(resp => {
                resp.data.data.filter(asset => {
                  let item = {label: asset.name, value: asset.id};
                  this.assetTypes.push(item);

                  if (this.$route.params.type) {
                    this.log.first_ever = true;
                    if(asset.name === this.$route.params.type) {
                      this.selectedAssetType = asset.id;

                      this.loadAssetsOfAssetType();
                    }
                  }
                });
            })
            .catch(err => console.error(err))
        // .finally(() => this.hideLoader());
    },

    methods: {
        addAsset() {
            // this.showLoader(`Saving Your ${this.selectedAssetType.name} Asset`);
            this.log.asset_id = this.selectedAsset;

          this.log.currency_type = this.fiatValue ? 'fiat' : 'usd';

            Axios.post('/logs', this.log)
                .then(resp => {
                    let user = this.$store.state.user;
                    user.finished_setup = true;
                    this.$store.commit('storeUser', user);

                    this.showSuccessToast(resp.data.message);
                })
                .catch(err => console.error(err))
            .finally(() => this.hideLoader());
        },

        loadAssetsOfAssetType() {
            const data = {asset_type_id: this.selectedAssetType};
            this.assets = [];
            this.assetPlatformsOptions = [];

            Axios.get('/assets', {params: data})
                .then(resp => {
                  resp.data.data.filter(asset => {
                    let item = {label: asset.name, value: asset.id};
                    this.assets.push(item);
                  });
                })
                .catch(err => console.error(err))
            // .finally(() => this.hideLoader());
        },

        loadExchangesOfAsset() {
            // this.showLoader(`Fetching ${this.selectedAsset.name} Platforms`);
            const data = {asset_type_id: this.selectedAssetType};

            Axios.get('/platforms', {params: data})
                .then(resp => {
                    let options = resp.data.data.map(item => {
                        return {label: item.name, value: item.id};
                    });

                    if(options.length) {
                      this.assetPlatformsOptions = options;
                    }
                })
                .catch(err => console.error(err))
            // .finally(() => this.hideLoader());
        },

        addValueToOptions(e) {
              this.searchedPlatformKeywords.push({ label: e, value: 0 });
        },

        closePlatformOptions() {
          if(this.searchedPlatformKeywords.length) {
            let lastInsertedItem = this.searchedPlatformKeywords[this.searchedPlatformKeywords.length - 1];

            this.log.platform.id = lastInsertedItem.value;
            this.log.platform.name = lastInsertedItem.label;
            this.assetPlatformsOptions.push(lastInsertedItem);

            this.searchedPlatformKeywords = [];
          }
        },

        async addLocationValueToOptions(e) {
            if (e.length >= 2) {
              this.loadingLocations = true;
              try {
                let response = await Axios('assets/locations', {params: {search: e}});

                if (response.data.data.length) {
                  let options = response.data.data.map(item => {
                    return {label: item.name, value: item.id};
                  });

                  this.assetLocationOptions = options;
                  this.loadingLocations = false;
                } else {
                  this.searchedLocationKeywords.push({ label: e, value: 0 });
                }
              } catch (e) {
                console.error(e);
              }
            }
        },

        closeLocationOptions() {
          if(this.searchedLocationKeywords.length) {
            let lastInsertedItem = this.searchedLocationKeywords[this.searchedLocationKeywords.length - 1];

            this.log.location.id = lastInsertedItem.value;
            this.log.location.name = lastInsertedItem.label;
            this.assetLocationOptions.push(lastInsertedItem);

            this.searchedLocationKeywords = [];
          }
        }
    }
};
</script>

<style scoped>
.input-design {
    @apply mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md;
}

.mute {
    @apply capitalize text-xs text-gray-400;
}
</style>
