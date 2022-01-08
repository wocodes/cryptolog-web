<template>
  <div>
    <span>{{ title }}</span>
    <div>
      <p class="font-bold inline-block mr-1 leading-none">${{ parseFloat(value).toLocaleString() }}</p>

      <p v-if="percChange" class="text-xs inline-block leading-none" :class="{'text-red-600': value < 0, 'text-green-600': value > 0}">
        <svg v-if="value > 0" class="inline-block align-middle" width="8" height="6" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.00004 0.5L12 8.5H0L6.00004 0.5Z" fill="#48BB78"/>
        </svg>
        <svg v-else class="inline-block align-middle" width="8" height="6" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.99996 8.5L-6.99382e-07 0.500001L12 0.5L5.99996 8.5Z" fill="#FF2D2E"/>
        </svg><span style="font-size: 10px">{{ percChange }}%</span>
      </p>

      <p class="font-bold text-left block text-gray-600 text-xs visible md:ml-0" v-if="showFiat">
        <span v-if="user.fiat.short_symbol" v-html="user.fiat.short_symbol"></span>
        <span v-else>{{ user.fiat.symbol }}</span>{{ parseInt(fiatValue).toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardAssetsValueType",
  props: {
    title: String,
    value: Number,
    fiatValue: Number,
    percChange: Number,
    showFiat: Boolean
  }
}
</script>

<style scoped>

</style>