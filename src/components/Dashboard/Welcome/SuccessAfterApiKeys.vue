<template>
  <Dialog
      :open="modalIsOpen"
      @close="setIsOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
  >
    <div class="flex items-center justify-center min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-75" />

      <div class="relative md:w-1/4 text-center mx-auto bg-white rounded-xl">
        <img src="images/success.svg" alt="welcome" class="my-2 m-auto"/>

        <h3 class="font-bold text-lg my-4">Success</h3>

        <p class="w-4/5 mx-auto text-sm text-gray-400">Yay! Your assets have been successfully logged into your dashboard!</p>

        <button class="w-max md:w-1/2 rounded p-2 bg-blue-600 border-2 border-blue-600 my-10 text-white">
          <span class="my-auto" @click="gotoDashboard">Go to my dashboard</span>
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
} from "@headlessui/vue";


export default {
  name: "SuccessAfterApiKeys",
  props: {
    isOpen: {
      type: Boolean
    },
    exchange: {
      type: String
    }
  },
  components: {Dialog, DialogOverlay},
  created() {
    // this.gotoSetupStep('apiKeys');
  },

  data() {
    return {
      modalIsOpen: this.isOpen,
    }
  },

  methods: {
    setIsOpen(value) {
      this.modalIsOpen = value;
    },

    gotoDashboard() {
      this.gotoSetupStep('done');
      // this.gotoSetupStep('complete');
    }
  }
}
</script>

<style scoped>

</style>