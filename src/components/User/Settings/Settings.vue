<template>
    <div class="text-left">
        <div class="text-left bg-white rounded lg:w-3/4">

            <form class="">
                <div class="px-4 py-2 md:px-8 md:py-3">
                    <h1 class="text-xl inline-block">General Settings</h1>
                </div>

                <div class="border-b border-black border-opacity-10"></div>

                <div class="flex px-4 py-2 md:px-8 md:py-3">
                    <div class="w-2/6 font-bold">
                        <p>Visual Settings</p>
                    </div>
                    <div class="w-4/6">
                        <div v-for="(meta, index) in metas" :key="index" class="">
                            <div class="form-group">
                                <label class="flex justify-content-center items-center space-x-3">
                                    <input v-model="meta.value"
                                           class="appearance-none checked:bg-blue-600 checked:border-transparent rounded focus:outline-none"
                                           name="meta"
                                           type="checkbox"
                                           @change="performSecondaryAction(meta)"
                                    />
                                    <span class="font-medium capitalize">{{ meta.name }}</span>
                                </label>

                                <div v-if="meta.id==='settings.hide_balance' && hideBalanceIsToggled"
                                     class="space-y-3">
                                    <small class="" style="width: 250px">Note: You won't be able to see
                                        your balance for the duration of this setting</small>
                                    <div>
                                        <input v-model="meta.value"
                                               class="rounded h-8 w-25 border-gray-300" placeholder="Duration (days)"
                                               type="number"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="px-4 pt-2 pb-8 md:px-8 md:pt-3">
                <button class="change-button lg:w-1/4" type="submit" @click="saveSettings">Save Changes</button>
            </div>

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
            if (meta.id === 'settings.hide_balance') {
                this.hideBalanceIsToggled = !this.hideBalanceIsToggled;
            }
        },

        async saveSettings() {
            this.showLoader();
            try {
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
                    let meta = {id: item[0], name: name.toLowerCase(), value: parseInt(item[1]) === 1};
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