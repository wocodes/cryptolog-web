<template>
  <div class="p-6 w-1/2 mx-auto bg-white rounded-xl text-center shadow-lg">
    <h3 class="font-bold">Add API Keys</h3>

    Key: <input type="text" v-model="api.key" /><br>
    Secret: <input type="text" v-model="api.secret" /><br>

    <button @click="saveApiKeys">Save</button>
  </div>
</template>

<script>
import Axios from "../../../../config/axios";

export default {
  name: "AddApiKeysModal",
  data() {
    return {
      api: {},
    }
  },

  methods: {
    async saveApiKeys() {
      try {
        await Axios.post('user/api-keys', {...this.api})
        this.showSuccessToast("API Keys has been set. Please wait while we fetch your assets.");
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style scoped>

</style>