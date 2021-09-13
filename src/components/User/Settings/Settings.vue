<template>
 <div class="text-left">
     <div class="text-2xl font-bold mb-3">
         Visual Settings
     </div>
     <div class="row">
         <div class="col-md-6" v-for="(meta, index) in metas" :key="index">
             <div class="form-group">
                 <label class="flex justify-content-center items-center space-x-3">
                     <input type="checkbox"
                            name="meta"
                            v-model="meta.value"
                            @change="performSecondaryAction(meta)"
                            class="appearance-none checked:bg-blue-600 checked:border-transparent rounded focus:outline-none"
                     />
                     <span class="font-medium">{{ meta.name }}</span>
                 </label>

                 <div v-if="meta.id==='settings.hide_balance' && hideBalanceIsToggled"
                      class="ml-7 mt-1">
                     <small class="block font-bold">Duration (days)</small>
                     <input type="number"
                            v-model="meta.value"
                            class="rounded h-8 w-25 border-gray"
                     />
                     <small class="text-red-500 block leading-1" style="width: 250px">Note: You won't be able to see your balance for the duration of this setting</small>
                 </div>
             </div>
         </div>
     </div>
     <div class="mt-5">
         <button class="bg-blue-500 rounded text-white px-3 py-1" @click="saveSettings">Save</button>
     </div>
 </div>
</template>

<script>
import Axios from "../../../../config/axios";
export default {
    name: "Settings",
    data() {
        return {
            hideBalanceIsToggled: false,
            metas: []
        };
    },
    created() {
        this.getMetas()
    },
    methods: {
        performSecondaryAction(meta) {
            if(meta.id === 'settings.hide_balance') {
                this.hideBalanceIsToggled = !this.hideBalanceIsToggled;
            }
        },

        async saveSettings() {
            this.showLoader();
            try{
                const {data} = await Axios.post('user/metas', {
                    metas: this.metas
                });
                console.log(data)
                console.log(data.message)
                this.showSuccessToast(data.message);
            } catch (error) {
                console.error(error);
            } finally {
                this.hideLoader();
            }
        },

        async getMetas() {
            try {
                this.metas = []
                const {data} = await Axios.get('user/metas');
                let metas = Object.entries(data.data);

                metas.forEach(item => {
                    let name = item[0].split('.')[1].replace(/_/g, ' ');
                    let meta = {id: item[0], name: name.toUpperCase(), value: parseInt(item[1]) === 1};
                    this.metas.push(meta);
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style scoped>

</style>