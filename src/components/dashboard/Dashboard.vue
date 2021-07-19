<template>
    <div class="bg-gray-100">
        <TopBar />

        <div class="grid grid-cols-5 gap-4">
            <SideBar />

            <div class="col-span-4 m-6">
                <StatCards />
                <hr class="m-8">
                <div class="text-left">
                    <h1 class="text-2xl font-bold mb-2 mr-2 inline-block">Top Performing Assets</h1>
                    <small><em>(Refreshes every 5 minutes)</em></small>

                    <button class="bg-green-700 font-bold py-1 px-2 rounded-md inline-block float-right text-sm text-white"
                            @click="fetchTopPerformingAssets">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                        </svg>
                    </button>

                    <table class="border-collapse border-1 border-blue-800 font-xs w-full" style="font-size:12px;">
                        <thead>
                        <tr>
                            <th :class="thClassStyle" scope="col">SN</th>
                            <th :class="thClassStyle" scope="col">Name</th>
                            <th :class="thClassStyle" scope="col">Exchange</th>
                            <th :class="thClassStyle" scope="col">Symbol</th>
                            <th :class="thClassStyle" scope="col">Qty</th>
                            <th :class="thClassStyle" scope="col">Init Value</th>
                            <th :class="thClassStyle" scope="col">Current Value</th>
                            <th :class="thClassStyle" scope="col">P/L</th>
                            <th :class="thClassStyle" scope="col">24Hr Change</th>
                            <th :class="thClassStyle" scope="col">Status</th>
                            <th :class="thClassStyle" scope="col">Bought</th>
                            <th :class="thClassStyle" scope="col">ROI</th>
                            <th :class="thClassStyle" scope="col">Daily ROI</th>
                            <th :class="thClassStyle" scope="col">Current Price</th>
                            <th :class="thClassStyle" scope="col">Updated</th>
                            <th :class="thClassStyle" scope="col">P/L (N)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(asset, index) in topPerformingAssets"
                            :key="index">
                            <td :class="tdClassStyle">{{ index+1 }}</td>
                            <td :class="tdClassStyle">{{ asset.asset.name }}</td>
                            <td :class="tdClassStyle">{{ asset.platform.name }}</td>
                            <td :class="tdClassStyle">{{ asset.asset.symbol }}</td>
                            <td :class="tdClassStyle">{{ asset.quantity_bought }}</td>
                            <td :class="tdClassStyle">{{ asset.initial_value }}</td>
                            <td :class="tdClassStyle">{{ asset.current_value }}</td>
                            <td :class="tdClassStyle">${{ asset.profit_loss }}</td>
                            <td :class="tdClassStyle">{{ asset['24_hr_change'] }}</td>
                            <td :class="tdClassStyle">{{ asset.status }}</td>
                            <td :class="tdClassStyle">{{ asset.date_bought }}</td>
                            <td :class="tdClassStyle">{{ asset.roi }}%</td>
                            <td :class="tdClassStyle">{{ asset.daily_roi }}%</td>
                            <td :class="tdClassStyle">${{ asset.current_price }}</td>
                            <td :class="tdClassStyle">{{ asset.last_updated_at }}</td>
                            <td :class="tdClassStyle">#{{ asset.profit_loss_naira }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TopBar from "../TopBar";
    import SideBar from "../SideBar";
    import StatCards from "./StatCards";
    import Axios from "../../../config/axios";

    export default {
        name: "Dashboard",
        components: {StatCards, SideBar, TopBar},
        data() {
            return {
                thClassStyle: 'p-2 border border-blue-200 bg-blue-100',
                tdClassStyle: 'p-2 border border-green-200 bg-green-100',
                topPerformingAssets: null,
            }
        },

        mounted() {
            this.fetchTopPerformingAssets();
        },

        methods: {
            fetchTopPerformingAssets() {
                Axios.get("/logs")
                    .then(resp => {
                        this.topPerformingAssets = resp.data.data
                    })
                    .catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>