<template>
    <div class="mt-4 mb-4 grid grid-cols-2 gap-4">
        <StatCard card-title="Total Assets"
                  :value="totalAssets"
                  icon="https://img.icons8.com/cute-clipart/64/000000/business.png" />

        <StatCard card-title="Total Value"
                  :value="`$${totalValue}`"
                  :sub="`&#8358;${totalSubValue}`"
                  icon="https://img.icons8.com/cute-clipart/64/000000/economic-improvement.png">

          <div class="pt-4 w-auto float-right text-lg font-bold">
            <div class="float-left text-green-800">
              <span class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>

                <span>${{ totalProfit }} (&#8358; {{ totalProfitLocal }})</span>
              </span>
            </div>

            <div class="float-right text-red-800">
              <span class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>

                <span>${{ totalLoss }} (&#8358;{{ totalLossLocal }})</span>
              </span>
            </div>
          </div>
        </StatCard>
    </div>
</template>

<script>
    import Axios from "../../../config/axios";
    import StatCard from "@/components/Dashboard/StatCard";
    import {NAIRA_TO_DOLLAR_VALUE} from "../../../helpers/constants";

    export default {
      name: "Stats",
      components: {StatCard},
      data() {
            return {
                totalAssets: 0,
                totalValue: 0,
                totalProfit: 0,
                totalLoss: 0,
            }
        },

        computed: {
          totalSubValue() {
            return `${(this.totalValue * NAIRA_TO_DOLLAR_VALUE).toLocaleString()}`;
          },

          totalProfitLocal() {
            return `${(this.totalProfit * NAIRA_TO_DOLLAR_VALUE).toLocaleString()}`;
          },

          totalLossLocal() {
            return `${(this.totalLoss * NAIRA_TO_DOLLAR_VALUE).toLocaleString()}`;
          }
        },

        methods: {
            getDashboardStats() {
                Axios.get("/user/dashboard/stats")
                    .then(resp => {
                        this.totalAssets = resp.data.data.assets_count;
                        this.totalValue = resp.data.data.assets_value;
                        this.totalProfit = resp.data.data.assets_profit;
                        this.totalLoss = resp.data.data.assets_loss;

                    })
                    .catch(err => console.log(err));
            },
        },

        mounted() {
            this.getDashboardStats();
        }

    }
</script>

<style scoped>

</style>