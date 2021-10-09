<template>
    <section class="bg-white h-screen">
        <div class="mx-auto flex lg:justify-center h-full flex-col lg:flex-row">
            <div class="hidden lg:block lg:w-1/2 h-2/5 lg:h-full w-full">
                <div :style="{'background-image': 'url(' + require('../../assets/img/BG.png') + ')'}"
                     class="h-full w-full bg-cover bg-center"
                     style="background-size: auto 100%;">
                    <div class="flex h-full items-center justify-center w-full">
                        <div class="text-white text-left">
                            <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider antialiased">AssetLog</h1>
                            <p class="md:text-lg lg:text-xl xl:text-2xl tracking-tight">The smartest asset/investments tracker</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-1/2 h-full flex items-center justify-center bg-white dark:bg-gray-900 pb-14">
                <slot></slot>
            </div>
        </div>
    </section>
</template>

<script>
export default {
name: "pageTemplate"
}
</script>

<style scoped>
</style>