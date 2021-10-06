<template>
  <div class="p-6 w-1/2 mx-auto bg-white rounded-xl text-center shadow-lg">
    <h3 class="font-bold">Add Fiat</h3>

    <select v-model="selectedFiat">
      <option v-for="(fiat, index) in fiats" :key="index" :value="fiat.id">
        {{ fiat.symbol }} - {{ fiat.name }}
      </option>
    </select>

    <button @click="saveSelectedFiat">Save</button>
  </div>
</template>

<script>
import Axios from "../../../../config/axios";

export default {
  name: "AddFiatModal",
  data() {
    return {
      fiats: [],
      selectedFiat: null
    }
  },
  async created() {
    try {
      const {data} = await Axios.get('fiats');

      this.fiats = data.data;
    } catch(e) {
      console.error(e)
    }
  },

  methods: {
    async saveSelectedFiat() {
      try {
        await Axios.put('user', {fiat_id: this.selectedFiat})
        this.showSuccessToast("Fiat/local currency has been set.");

        this.$store.state.user.fiat_id = this.selectedFiat;
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style scoped>

</style>