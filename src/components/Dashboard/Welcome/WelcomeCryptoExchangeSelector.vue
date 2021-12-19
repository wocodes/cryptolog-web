<template>
  <Dialog
      :open="modalIsOpen"
      @close="setIsOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
  >
    <div class="flex items-center justify-center min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-75" />

      <div class="relative w-1/4 mx-auto bg-white rounded-xl">
        <h3 class="font-medium text-md my-3 mx-8">New Connection</h3>

        <hr class="my-2">

        <div class="mx-8">
          <input type="text" class="mb-4 rounded border border-gray-300 w-full" placeholder="Search" />
          <small class="text-gray-400 block">Currently you can only connect to Binance. More exchange connections are coming soon.</small>

          <div class="my-8 pb-12">
            <div @click="selectedExchange('Binance')" style="cursor:pointer" class="flow-root text-gray-500 hover:text-black hover:underline" >
              <img src="/images/bsc-logo.png" class="align-middle w-8 h-8 float-left mr-4" />

              <h4 class="font-bold text-xl col-span-6">Binance</h4>
            </div>
          </div>
        </div>
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
  name: "WelcomeCryptoExchangeSelector",
  props: {
    isOpen: {
      type: Boolean
    }
  },
  components: {Dialog, DialogOverlay},
  data() {
    return {
      modalIsOpen: this.isOpen,
    }
  },

  methods: {
    setIsOpen(value) {
      this.modalIsOpen = value;
    },

    selectedExchange(value) {
      this.$emit('selectedApiExchange', value);
    }
  }
}
</script>

<style scoped>

</style>