<template>
  <VueSplash
      :show="true"
      :logo="logo"
      title="Your Magnificent App Name"
      color="#00bfa5"
      :size="300"
      :fixed="true"
  />
</template>

<script>
export default {
  name: "SplashLoader",
  computed: {
    logo() {
      return 'https://www.mindinventory.com/blog/wp-content/uploads/2020/09/logo-mind-inventory.d811990c.png';
    }
  }
}
</script>

<style scoped>

</style>