<template>
    <hr class="m-8">
    <h2>View for showing performance of assets</h2>
</template>

<script>
import Axios from "../../../config/axios";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

export default {
    name: "Logs",
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