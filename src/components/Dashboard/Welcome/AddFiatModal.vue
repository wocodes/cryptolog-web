<template>
  <div class="p-6 w-1/2 mx-auto bg-white rounded-xl text-center shadow-lg">
    <h3 class="font-bold text-lg">Set up your local currency</h3>


    <div class="mt-8">
      <h6 class="text-sm text-left">Select Local Currency</h6>
      <Multiselect :options="fiats"
                   v-model="selectedFiat"
                   :searchable="true"
                   :required="true"
      >
      </Multiselect>
    </div>

    <div class="mt-12 flow-root">
      <button class="float-left rounded border-2 border-blue-600 py-2 px-6 w-24 text-blue-600" @click="$parent.gotoSetupStep('selectAssetLogger')">Skip</button>
      <button class="float-right rounded bg-blue-600 py-2 px-6 w-24 text-white" @click="saveSelectedFiat">Save</button>
    </div>
  </div>
</template>

<script>
import Axios from "../../../../config/axios";
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default {
  name: "AddFiatModal",
  components: { Multiselect },
  data() {
    return {
      fiats: [],
      selectedFiat: null
    }
  },
  async created() {
    try {
      const {data} = await Axios.get('fiats');

      this.fiats = data.data.map(fiat => {
        return {label: `${fiat.name} (${fiat.symbol})`, value: fiat.id};
      });
    } catch(e) {
      console.error(e)
    }
  },

  methods: {
    async saveSelectedFiat() {
      this.showLoader();

      try {
        await Axios.put('user', {fiat_id: this.selectedFiat});
        this.showSuccessToast("Fiat/local currency has been set.");

        this.$store.state.user.fiat_id = this.selectedFiat;
        this.gotoSetupStep('selectAssetLogger');
      } catch (e) {
        console.error(e);
      } finally {
        this.hideLoader();
      }
    }
  }
}
</script>

<style scoped>

</style>