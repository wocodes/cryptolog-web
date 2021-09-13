<template>
    <div class="mt-4 mb-4 grid grid-cols-2 gap-4">
        <StatCard card-title="Total Assets"
                  :value="totalAssets"
                  icon="https://img.icons8.com/cute-clipart/64/000000/business.png" />

        <StatCard card-title="Total Value"
                  :value="`$${totalValue}`"
                  :sub="`&#8358;${totalSubValue}`"
                  icon="https://img.icons8.com/cute-clipart/64/000000/economic-improvement.png" />
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
            }
        },

        computed: {
          totalSubValue() {
            return `${(this.totalValue * NAIRA_TO_DOLLAR_VALUE).toLocaleString()}`;
          }
        },

        methods: {
            getDashboardStats() {
                Axios.get("/user/dashboard/stats")
                    .then(resp => {
                        this.totalAssets = resp.data.data.assets_count;
                        this.totalValue = resp.data.data.assets_value;

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