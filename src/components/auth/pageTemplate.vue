<template>
    <section class="bg-white h-screen">
        <div class="mx-auto flex lg:justify-center h-full flex-col lg:flex-row">
            <div class="lg:w-1/2 lg:h-full w-full">
                <div :style="{'background-image': 'url(' + require('../../assets/img/BG.png') + ')'}"
                     class="hidden lg:block h-full w-full bg-cover bg-center"
                     style="background-size: auto 100%;">
                    <div class="flex h-full items-center justify-center w-full">
                        <div class="text-white text-left">
                            <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider antialiased">AssetLog</h1>
                            <p class="md:text-lg lg:text-xl xl:text-2xl tracking-tight">The smartest asset/investments tracker</p>
                        </div>
                    </div>
                </div>
                <div class="lg:hidden flex flex-col w-full bg-primary">
                    <div class="flex flex-col w-full tet-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
                        <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
                            <a href="#" class="text-lg text-white font-semibold tracking-widest uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">AssetLog</a>
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