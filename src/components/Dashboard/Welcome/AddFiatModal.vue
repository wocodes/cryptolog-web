<template>
  <Dialog
      :open="modalIsOpen"
      @close="setIsOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
  >
    <div class="flex items-center justify-center min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-75" />

      <div class="relative md:w-4/12 mx-auto bg-white rounded-xl">
        <h3 class="font-medium text-md my-3 mx-8">&#128176; Set up your local currency</h3>

        <hr class="my-2">

        <div class="m-8">
          <h6 class="text-sm text-left">Select Local Currency</h6>
          <Multiselect :options="fiats"
                       v-model="selectedFiat"
                       :searchable="true"
                       :required="true"
          >
          </Multiselect>

          <div class="mt-12 flow-root">
<!--            <button class="float-left rounded border border-blue-600 py-2 px-6 w-24 text-blue-600" @click="$parent.gotoSetupStep('selectAssetlogger')">Skip</button>-->
            <button class="float-right rounded bg-blue-600 py-2 px-6 w-24 text-white" @click="saveSelectedFiat">Save</button>
          </div>
        </div>

      </div>
    </div>
  </Dialog>
</template>

<script>
import Axios from "../../../../config/axios";
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import {
  Dialog,
  DialogOverlay,
} from "@headlessui/vue";

export default {
  name: "AddFiatModal",
  props: {
    isOpen: {
      type: Boolean
    }
  },
  components: { Multiselect, Dialog, DialogOverlay },
  data() {
    return {
      fiats: [],
      selectedFiat: null,
      modalIsOpen: this.isOpen,
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
        this.$emit('savedFiatCurrency');
      } catch (e) {
        console.error(e);
      } finally {
        this.hideLoader();
      }
    },

    setIsOpen(value) {
      this.modalIsOpen = value;
    }
  }
}
</script>

<style scoped>

</style>