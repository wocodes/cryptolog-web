<template>
  <h2>Assets List</h2>
  <ul>
    <li v-for="(asset, index) in assets" :key="index">{{ asset.name }} ({{ asset.symbol }})</li>
  </ul>
</template>

<script>
import Axios from "../../../config/axios";

export default {
  name: "AdminDashboard",
  data() {
    return {
      assets: []
    };
  },

  mounted() {
    Axios.get("/assets")
        .then((resp) => {
          this.assets = resp.data.data
        })
        .catch(err => console.log(err))
  }
}
</script>

<style scoped>

</style>