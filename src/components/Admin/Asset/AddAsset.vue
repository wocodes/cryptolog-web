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
                                v-model="asset.type_id"
                                class="input-design"
                                name="asset-type"
                                @change="loadAssetsOfAssetType"
                        >
                            <option :value="null"></option>
                            <option v-for="assetType in assetTypes" :value="assetType.id" :key="assetType.id">{{ assetType.name }}</option>
                            <!--                                            All this will be changed later-->
                        </select>
                    </div>

                    <div class="" v-if="asset.type_id">
                        <label class="block text-sm font-medium text-gray-700" for="asset-name">Asset Name</label>
                        <input id="asset_name" v-model="asset.name"
                               class="input-design"
                               type="text"/>
                    </div>

                    <div class="" v-if="asset.type_id">
                        <label class="block text-sm font-medium text-gray-700" for="asset-symbol">Asset Symbol</label>
                        <input id="asset_symbol" v-model="asset.symbol"
                               class="input-design"
                               type="text"/>
                    </div>
                </div>
            </div>
        </form>
        <button class="change-button" @click="addAsset" type="submit">Add</button>
    </div>
</template>

<script>
import Axios from '../../../../config/axios';
// import TimeAgo from 'javascript-time-ago';
// import en from 'javascript-time-ago/locale/en';
//
// TimeAgo.addDefaultLocale(en);

export default {
    name: 'AddAsset',
    data() {
        return {
            assetTypes: [],
            asset: {}
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
        Axios.post('/assets', this.asset)
            .then(resp => {
              this.showSuccessToast(resp.data.message);
            })
            .catch(err => console.error(err))
        // .finally(() => this.hideLoader());
      },
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
