<template>
  <div :class="customClass + ' grid grid-cols-6 border-2 rounded-xl p-4 text-gray-500'" >
    <slot></slot>

    <div class="col-span-5">
      <h4 class="font-bold text-sm">{{ name }}</h4>
      <small>{{ description }}</small>
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