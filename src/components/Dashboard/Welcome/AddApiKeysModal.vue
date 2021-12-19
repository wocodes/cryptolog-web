<template>
  <Dialog
      :open="modalIsOpen"
      @close="setIsOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
  >
    <div class="flex items-center justify-center min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-75" />

      <div class="relative md:w-1/4 mx-auto bg-white rounded-xl">
        <h3 class="font-medium text-md my-3 mx-8">New Connection</h3>

        <hr class="my-2">

        <div class="mx-8">
          <h3 class="font-bold my-2">Connect Assetlog to your {{ exchange }} </h3>
          <p class="text-gray-500 leading-normal text-xs">
            Your data is safe! We only require this step in order to read your existing assets.
            We WON'T perform any form of transaction!
          </p>

          <div class="mt-8">
            <h6 class="text-xs mb-1 text-left">API Key</h6>
            <input type="text" v-model="api.key" class="w-full rounded border-3 border-gray-300 mb-4"/>

            <h6 class="text-xs mb-1 text-left">Secret Key</h6>
            <input type="text" v-model="api.secret" class="w-full rounded border-3 border-gray-300"/>

            <div class="text-left my-3 text-gray-500">
              <input type="checkbox" checked> Accept <span class="text-blue-600">privacy policy</span>
            </div>
          </div>

          <button class="rounded bg-blue-600 py-2 px-6 mt-8 w-full text-white" @click="saveApiKeys">Log Assets</button>

          <a href="#" class="text-center text-xs my-6 block text-gray-500">Watch how to generate API Keys</a>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Axios from "../../../../config/axios";
import {
  Dialog,
  DialogOverlay,
} from "@headlessui/vue";


export default {
  name: "AddApiKeysModal",
  props: {
    isOpen: {
      type: Boolean
    },
    exchange: {
      type: String
    }
  },
  components: {Dialog, DialogOverlay},
  data() {
    return {
      modalIsOpen: this.isOpen,
      api: {
        key: '',
        secret: ''
      },
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
    setIsOpen(value) {
      this.modalIsOpen = value;
    },

    async saveApiKeys() {
      try {
        this.showLoader();

        await Axios.post('user/api-keys', {...this.api})
        this.showSuccessToast("API Keys has been set. Please wait while we fetch your assets.");

        setTimeout(() => {
          // this.gotoSetupStep('done');
          this.$emit('completedApiIntegration');
          this.hideLoader();
          }, 3000);
      } catch (e) {
        console.error(e);
      }
    },
  }
}
</script>

<style scoped>

</style>