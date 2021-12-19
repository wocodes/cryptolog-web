<template>
  <Dialog
      :open="modalIsOpen"
      @close="setIsOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
  >
    <div class="flex items-center justify-center min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-75" />

      <div class="relative w-4/12 mx-auto bg-white rounded-xl">
        <h3 class="font-medium text-md my-3 mx-8">Log Crypto Asset</h3>

        <hr class="my-2">

        <div class="mx-8">
          <h3 class="font-normal text-md text-gray-600">Choose your preferred step</h3>
          <small class="text-gray-400">Please select how you would like to log your assets.</small>

          <div class="my-8 pb-12">
            <div @click="selectedExchange"
                 style="cursor:pointer"
                 class="hover:border-blue-500 hover:bg-blue-100 grid grid-cols-8 border rounded-xl px-4 py-2 my-6 text-gray-500 shadow" >
              <svg width="45" height="45" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38 19V25H32" stroke="#005EF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 35V29H22" stroke="#005EF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 29.0001L20.64 33.3601C21.7147 34.4354 23.0444 35.2209 24.5048 35.6433C25.9652 36.0657 27.5089 36.1113 28.9917 35.7758C30.4745 35.4403 31.8482 34.7346 32.9845 33.7247C34.1209 32.7147 34.9828 31.4333 35.49 30.0001M18.51 24.0001C19.0172 22.5669 19.8791 21.2855 21.0155 20.2755C22.1518 19.2655 23.5255 18.5598 25.0083 18.2243C26.4911 17.8888 28.0348 17.9344 29.4952 18.3568C30.9556 18.7793 32.2853 19.5648 33.36 20.6401L38 25.0001L18.51 24.0001Z" stroke="#005EF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="0.5" y="0.5" width="53" height="53" rx="9.5" stroke="#005EF6"/>
              </svg>


              <div class="col-span-7">
                <h4 class="font-bold text-sm">Connect Exchange Account</h4>
                <small>Automatically sync crypto assets from your exchange accounts</small>
              </div>
            </div>

            <router-link :to="{name: 'add-log'}"
                         style="cursor:pointer"
                         class="hover:border-blue-500 hover:bg-blue-100 grid grid-cols-8 border rounded-xl px-4 py-2 my-6 text-gray-500 shadow" >
              <svg width="45" height="45" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 20V34" stroke="#005EF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 27H34" stroke="#005EF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="0.5" y="0.5" width="53" height="53" rx="9.5" stroke="#005EF6"/>
              </svg>


              <div class="col-span-7">
                <h4 class="font-bold text-sm">Log Manually</h4>
                <small>Add your assets by filling in data manually</small>
              </div>
            </router-link>
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
  name: "WelcomeCryptoLogOptions",
  props: {
    isOpen: {
      type: Boolean
    }
  },
  components: {Dialog, DialogOverlay },
  data() {
    return {
      modalIsOpen: this.isOpen,
    }
  },
  methods: {
    setIsOpen(value) {
      this.modalIsOpen = value;
    },

    selectedExchange() {
      this.$emit('cryptoSelectedLogType', 'exchange');
    }
  }
}
</script>

<style scoped>

</style>