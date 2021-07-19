<template>
    <div class="mt-4 mb-4 grid grid-cols-2 gap-4">
        <div class="p-6 w-full mx-auto bg-white rounded-xl shadow-lg flex">
            <div class="flex-shrink-0">
                <img src="https://img.icons8.com/cute-clipart/64/000000/business.png"/>
            </div>
            <div class="text-right w-full">
                <div class="text-gray-500 text-lg font-medium">Total Assets</div>
                <p class="text-black text-5xl">16</p>
            </div>
        </div>

        <div class="p-6 w-full mx-auto bg-white rounded-xl shadow-lg flex">
            <div class="flex-shrink-0">
                <img src="https://img.icons8.com/cute-clipart/64/000000/economic-improvement.png"/>
            </div>
            <div class="text-right w-full">
                <div class="text-gray-500 text-lg font-medium">Total Value</div>
                <p class="text-black text-5xl">#100,000</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StatCards"
    }
</script>

<style scoped>

</style>