<template>
    <AssetList :thStyle="'border-blue-200 bg-blue-100'"
               :tdStyle="'border-gray-300 bg-gray-200 font-md font-bold'"
               :cssStyle="'font-size:16px'"
               title="All Assets"
               :update-button-light="true"
    />
</template>

<script>
import AssetList from "../../AssetList";

export default {
    name: "Logs",
    components: {AssetList},
    data() {
        return {
            allAssets: null,
        }
    }
}
</script>

<style scoped>

</style>