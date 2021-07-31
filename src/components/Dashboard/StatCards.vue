<template>
    <div class="mt-4 mb-4 grid grid-cols-2 gap-4">
        <div class="p-6 w-full mx-auto bg-white rounded-xl shadow-lg flex">
            <div class="flex-shrink-0">
                <img src="https://img.icons8.com/cute-clipart/64/000000/business.png"/>
            </div>
            <div class="text-right w-full">
                <div class="text-gray-500 text-lg font-medium">Total Assets</div>
                <p class="text-black text-5xl">{{ totalAssets }}</p>
            </div>
        </div>

        <div class="p-6 w-full mx-auto bg-white rounded-xl shadow-lg flex">
            <div class="flex-shrink-0">
                <img src="https://img.icons8.com/cute-clipart/64/000000/economic-improvement.png"/>
            </div>
            <div class="text-right w-full">
                <div class="text-gray-500 text-lg font-medium">Total Value</div>
                <p class="text-black text-5xl">${{ totalValue }}</p>
                <small>&#8358;{{ (totalValue * 500).toLocaleString() }}</small>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from "../../../config/axios";

    export default {
        name: "StatCards",
        data() {
            return {
                totalAssets: 0,
                totalValue: 0,
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