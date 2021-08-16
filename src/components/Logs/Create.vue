<template>
    <div class="text-left">
        <h1 class="text-2xl font-bold mb-2 mr-2 inline-block">Add Asset</h1>


        <form>
            <div class="px-4 py-5">
                <div class="grid grid-flow-row grid-cols-3 grid-rows-3 gap-6">
                    <div class="">
                        <label class="block text-sm font-medium text-gray-700" for="asset-name">Asset
                            Type</label>
                        <select id="asset-type"
                                v-model="selectedAssetType"
                                class="input-design"
                                name="asset-name"
                                @change="loadAssetsOfAssetType"
                        >
                            <option v-for="assetType in assetTypes" :value="assetType" :key="assetType.id">{{ assetType.name }}</option>
                            <!--                                            All this will be changed later-->
                        </select>
                    </div>

                    <div class="" v-if="assets.length">
                        <label class="block text-sm font-medium text-gray-700" for="asset-name">Asset</label>
                        <select  id="asset-name"
                                 v-model="selectedAsset"
                                 class="input-design"
                                 name="asset-name"
                                 @change="loadExchangesOfAsset"
                        >
                            <option v-for="asset in assets" :value="asset" :key="asset.id">{{ asset.name }}</option>
                            <!--                                            All this will be changed later-->
                        </select>
                    </div>

                    <div class="" v-if="assetPlatforms.length">
                        <label class="block text-sm font-medium text-gray-700" for="asset-name">Exchange/Platform</label>
                        <select id="exchange-name"
                                v-model="log.platform_id"
                                class="input-design"
                                name="asset-name">
                            <option :value="null"></option>
                            <option v-for="platform in assetPlatforms" :key="platform.id" :value="platform.id">
                                {{ platform.name }}
                            </option>
                            <!--                                            All this will be changed later-->
                        </select>
                    </div>

                    <div class="" v-if="selectedAssetType && selectedAsset">
                        <label class="block text-sm font-medium text-gray-700" for="quantity">Quantity</label>
                        <input id="quantity" v-model="log.quantity_bought"
                               class="input-design"
                               type="text"/>
                    </div>

                    <div class="" v-if="selectedAssetType && selectedAsset">
                        <label class="block text-sm font-medium text-gray-700" for="initial-value">Amount/Price</label>
                        <input id="initial-value" v-model="log.initial_value"
                               class="input-design"
                               type="text"/>
                    </div>

                    <div class="" v-if="selectedAssetType && selectedAsset">
                        <label class="block text-sm font-medium text-gray-700" for="dob">Date of
                            purchase</label>
                        <input id="dob"
                               v-model="log.date_of_purchase"
                               class="input-design"
                               type="date"/>
                    </div>
                </div>
            </div>
        </form>
        <button class="change-button" @click="addAsset" type="submit">Add</button>
    </div>
</template>

<script>
import Axios from '../../../config/axios';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

export default {
    name: 'AddAsset',
    data() {
        return {
            log: {},
            assetTypes: [],
            assets: [],
            assetPlatforms: [],
            platforms: [],
            selectedAssetType: null,
            selectedAsset: null,
            selectedExchange: null
        };
    },

    created() {
        this.showLoader('Fetching Asset Types');
        Axios.get('/assets/types')
            .then(resp => {
                this.assetTypes = resp.data.data;
            })
            .catch(err => console.error(err))
            .finally(() => this.hideLoader());
    },

    methods: {
        addAsset () {
            this.showLoader(`Saving Your ${this.selectedAssetType.name} Asset`);
            this.log.asset_id = this.selectedAsset.id;
            Axios.post('/logs', this.log)
                .then(resp => {
                    this.showSuccessToast(resp.data.message);
                })
                .catch(err => console.error(err))
                .finally(() => this.hideLoader());
        },

        loadAssetsOfAssetType () {
            this.showLoader(`Fetching ${this.selectedAssetType.name} Assets`);
            const data = {asset_type_id: this.selectedAssetType.id};

            Axios.get('/assets', { params: data})
                .then(resp => {
                    this.assets = resp.data.data;
                })
                .catch(err => console.error(err))
                .finally(() => this.hideLoader());
        },

        loadExchangesOfAsset () {
            this.showLoader(`Fetching ${this.selectedAsset.name} Platforms`);
            const data = {asset_id: this.selectedAsset.id};
            Axios.get('/platforms', {params: data})
                .then(resp => {
                    this.assetPlatforms = resp.data.data;
                })
                .catch(err => console.error(err))
                .finally(() => this.hideLoader());
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

.change-button {
    @apply inline-flex justify-center py-2 px-4 border border-transparent text-sm rounded-md self-end text-white bg-blue-700 font-medium;
}
</style>
