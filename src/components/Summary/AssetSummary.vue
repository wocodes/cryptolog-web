<template>
    <div class="bg-gray-100">
        <TopBar />

        <div class="grid grid-cols-5 gap-4">
            <SideBar />

            <div class="col-span-4 m-6">
                <hr class="m-8">
                <h2>View for showing performance of assets</h2>
            </div>
        </div>
    </div>
</template>

<script>
    import TopBar from "../TopBar";
    import SideBar from "../SideBar";
    import Axios from "../../../config/axios";
    import TimeAgo from 'javascript-time-ago'
    import en from 'javascript-time-ago/locale/en'
    import AssetList from "../AssetList";

    TimeAgo.addDefaultLocale(en)

    export default {
        name: "Logs",
        components: {AssetList, SideBar, TopBar},
        data() {
            return {
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