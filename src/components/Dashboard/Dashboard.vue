<template>
    <div class="bg-gray-100">
        <TopBar />

        <div class="grid grid-cols-5 gap-4">
            <SideBar />

            <div class="col-span-4 m-6">
                <StatCards />
                <hr class="m-8">
                <div class="text-left">
                    <div class="mt-4 mb-4 grid grid-cols-2 gap-4 mb-12">
                        <div class="w-full bg-white rounded-xl shadow-lg justify-center">
                            <h1 class="text-center text-xl font-bold mb-5 mr-2 block">Cryptos</h1>
                            <apexchart
                                    width="400"
                                    type="pie"
                                    :options="chartOptions"
                                    :series="series"
                            ></apexchart>
                        </div>

                        <div class="w-full mx-auto bg-white rounded-xl shadow-lg justify-center">
                            <h1 class="text-center text-xl font-bold mb-5 mr-2">Stocks</h1>
                            <apexchart
                                    width="400"
                                    type="pie"
                                    :options="chartOptions"
                                    :series="series"
                            ></apexchart>
                        </div>
                    </div>


                    <h1 class="text-2xl font-bold mb-2 mr-2 inline-block">Top Performing Assets</h1>
                    <small><em>(Refreshes every 30 minutes)</em></small>

                    <button class="bg-green-700 font-bold py-1 px-2 rounded-md inline-block float-right text-sm text-white"
                            @click="fetchUpdatedAssetsData">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                        </svg>
                    </button>

                    <AssetList :data="topPerformingAssets"
                               :thStyle="'border-blue-200 bg-blue-100'"
                               :tdStyle="'border-green-200 bg-green-100'" />
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
    import TimeAgo from 'javascript-time-ago'
    import en from 'javascript-time-ago/locale/en'
    import AssetList from "../AssetList";
    import VueApexCharts from "vue3-apexcharts";

    TimeAgo.addDefaultLocale(en)

    export default {
        name: "Dashboard",
        components: {AssetList, StatCards, SideBar, TopBar, apexchart: VueApexCharts},
        data() {
            return {
                topPerformingAssets: {},
                chartOptions: {
                    labels: ['BTC', 'ETH', 'DOGE', 'ADA', 'VET', 'ETC'],
                },
                series: [30, 40, 35, 50, 49, 60, 70, 91]
            }
        },

        mounted() {
            this.fetchTopPerformingAssets();
        },

        methods: {
            fetchTopPerformingAssets() {
                Axios.get("/logs", {params: {'mode': 'top-performing'}})
                    .then(resp => {
                        this.topPerformingAssets = resp.data.data.data
                    })
                    .catch(err => console.log(err));
            },

            fetchUpdatedAssetsData() {
                Axios.get("/logs/update")
                    .then(() => {
                        this.fetchTopPerformingAssets();
                    })
                    .catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>