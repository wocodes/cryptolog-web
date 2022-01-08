<template>
  <h1 class="font-bold mb-3">Real Estate Value Calculator</h1>

  <h3 class="italic text-gray-700 text-sm">Can help you calculate the value of an asset in the
    future which in turn can help to make informed decision/actions. Data returned via the calculator is
    only a predictive result and not to be 100% relied upon. You are encouraged to do further analysis/research.
  </h3>

  <br>

  <div class="bg-blue-200 w-2/4 m-auto m-5 p-5 rounded-xl border border-gray-200">
    <label>Current Value</label>
    <input class="custom-input" type="text" v-model="currentValue" placeholder="Enter Asset Value">

    <label>Quantity</label>
    <input class="custom-input" type="text" v-model="quantity" placeholder="Asset Qty e.g 1 for full plot, 0.5 for half plot">

    <label>No. Years</label>
    <input class="custom-input" type="text" v-model="years" placeholder="Enter Number of Years">

    <select class="custom-input" v-model="direction">
      <option value="from_now">from now</option>
      <option value="ago">ago</option>
    </select>

    <label>avg. % change per year</label>
    <input class="custom-input" type="text" v-model="change" placeholder="Avg % growth e.g 75 for Ibeju-Lekki">

    <label>Price</label>
    <input class="custom-input" disabled type="text" v-model="total">
    <br>
    <br>
    <button @click="calculate" class="bg-blue-600 text-white font-bold px-4 py-1 rounded">Calculate</button>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      currentValue: null,
      quantity: null,
      years: null,
      direction: 'from_now',
      change: null,
      total: null
    }
  },

  methods: {
    calculate() {
      this.total = 0;

      const currentValue = parseInt(this.currentValue);
      const yearlyInterestRate = this.change;
      const interestAccrued = (1 + (yearlyInterestRate/100)) * currentValue;
      let differenceAmount = interestAccrued - currentValue;
      let subTotal = this.direction === 'ago' ? currentValue - differenceAmount : currentValue + differenceAmount;

      console.log('diff', subTotal);
      this.total = '~' + parseInt(subTotal * this.quantity, 10).toLocaleString();
    },
  }
}
</script>

<style scoped>
  .custom-input {
    @apply rounded border border-gray-100 w-full mb-4
  }

  label {
    @apply text-left block text-sm font-bold
  }
</style>