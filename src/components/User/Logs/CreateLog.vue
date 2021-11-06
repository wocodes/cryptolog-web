<template>
    <div class="text-left bg-white rounded lg:w-3/4">

        <form class="">
            <div class="px-4 py-2 md:px-8 md:py-3">
                <h1 class="text-xl inline-block">New Asset</h1>
            </div>

            <div class="border-b border-black border-opacity-10"></div>

            <div class="grid grid-flow-row grid-cols-2 grid-rows-3 gap-6 px-4 py-2 md:px-8 md:py-3">
                <div class="">
                    <label class="block text-sm font-medium text-gray-700" for="asset-name">Asset
                        Type</label>
                    <select id="asset-type"
                            v-model="selectedAssetType"
                            class="input-design"
                            name="asset-name"
                            @change="loadAssetsOfAssetType"
                    >
                        <option :value="null">Select Asset Type</option>
                        <option v-for="assetType in assetTypes" :key="assetType.id" :value="assetType">{{
                                assetType.name
                            }}
                        </option>
                        <!--                                            All this will be changed later-->
                    </select>
                </div>

                <div v-if="assets.length" class="">
                    <label class="block text-sm font-medium text-gray-700" for="asset-name">Asset</label>
                    <select id="asset-name"
                            v-model="selectedAsset"
                            class="input-design"
                            name="asset-name"
                            @change="loadExchangesOfAsset"
                    >
                        <option :value="null">Select Asset</option>
                        <option v-for="asset in assets" :key="asset.id" :value="asset">{{ asset.name }} ({{
                                asset.symbol
                            }})
                        </option>
                        <!--                                            All this will be changed later-->
                    </select>
                </div>

                <div v-if="assetPlatformsOptions.length" class="">
                    <label class="block text-sm font-medium text-gray-700" for="asset-name">Exchange/Platform</label>
                    <!--
                    TODO: The expected behaviour here is that when a user searches for a platform
                          and doesn't see/select it from the options, then the searched value should be added to the
                          empty options list and then allow the user select it, while the value will be passed to the
                          backend for adding to db. Currently not working
                    -->
                    <Multiselect v-model="log.platform_id"
                                 :options="assetPlatformsOptions"
                                 :required="true"
                                 :searchable="true"
                                 @search-change="addValueToOptions($event)"
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
                           class="input-design"
                           type="text"/>
                </div>

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
            log: {},
            assetTypes: [],
            assets: [],
            assetPlatformsOptions: [],
            platforms: [],
            selectedAssetType: null,
            selectedAsset: null,
            selectedExchange: null
        };
    },

    created() {
        // this.showLoader('Fetching Asset Types');
        Axios.get('/assets/types')
            .then(resp => {
                this.assetTypes = resp.data.data;
            })
            .catch(err => console.error(err))
        // .finally(() => this.hideLoader());
    },

    methods: {
        addAsset() {
            // this.showLoader(`Saving Your ${this.selectedAssetType.name} Asset`);
            this.log.asset_id = this.selectedAsset.id;
            Axios.post('/logs', this.log)
                .then(resp => {
                    this.showSuccessToast(resp.data.message);
                })
                .catch(err => console.error(err))
            // .finally(() => this.hideLoader());
        },

        loadAssetsOfAssetType() {
            // this.showLoader(`Fetching ${this.selectedAssetType.name} Assets`);
            const data = {asset_type_id: this.selectedAssetType.id};

            Axios.get('/assets', {params: data})
                .then(resp => {
                    this.assets = resp.data.data;
                })
                .catch(err => console.error(err))
            // .finally(() => this.hideLoader());
        },

        loadExchangesOfAsset() {
            // this.showLoader(`Fetching ${this.selectedAsset.name} Platforms`);
            const data = {asset_type_id: this.selectedAssetType.id};
            Axios.get('/platforms', {params: data})
                .then(resp => {
                    let options = resp.data.data.map(item => {
                        return {label: item.name, value: item.id};
                    });

                    this.assetPlatformsOptions = options;
                })
                .catch(err => console.error(err))
            // .finally(() => this.hideLoader());
        },

        addValueToOptions(e) {
            // console.log('asd', this.selectedPlatform);
            console.log('eve', e);
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
