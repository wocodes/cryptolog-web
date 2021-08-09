<template>
    <div :class="tipsStyle" role="alert">
        <img :src="imageIcon"  class="h-10 w-10 m-2"/>

        <div class="p-2 text-lg">
            <h3 class="font-bold text-2xl" v-if="title">{{ title }}</h3>
            <h3 class="font-bold text-xl" v-else>Pro Tip: Based On Analysis (BOA)</h3>

            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tip",
        props: ["icon", "title"],
        data() {
            return {
                imageIcon: this.icon ? this.icon : 'https://img.icons8.com/dusk/64/000000/idea.png'
            }
        }
    }
</script>

<style scoped>

</style>