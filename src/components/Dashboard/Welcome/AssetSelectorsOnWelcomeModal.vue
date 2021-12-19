<template>
  <div :class="customClass + ' grid md:grid-cols-6 grid-cols-3 border-2 rounded-xl md:p-4 p-2 text-gray-500'" >
    <slot></slot>

    <div class="md:col-span-5 col-span-2">
      <h4 class="font-bold text-sm">{{ name }}</h4>
      <p class="md:text-sm text-xs leading-none text-gray-400 mt-1">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssetSelectorsOnWelcomeModal",
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    customClass: {
      type: String,
      required: true
    },
  }
}
</script>

<style scoped>

</style>