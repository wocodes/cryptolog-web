<template>
      <div class="p-6 w-full mx-auto bg-white rounded-xl shadow-lg flex">
          <div class="flex-shrink-0">
              <img :src="icon"/>
          </div>
          <div class="text-right w-full">
              <div class="text-gray-500 text-lg font-medium">{{ cardTitle }}</div>
              <p class="text-black text-5xl">{{ value }}</p>
              <small class="block text-base">{{ sub }}</small>

              <slot class="block"></slot>
          </div>
      </div>
</template>

<script>
    export default {
      name: "StatCard",
      props: {
        sub: {
          type: String
        },
        icon: {
          type: String
        },
        cardTitle: {
          type: String
        },

        value: {
          type: String
        }
      }
    }
</script>

<style scoped>

</style>