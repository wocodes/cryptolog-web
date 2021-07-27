<template>
<!--  <div id="nav">-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </div>-->

    <router-view/>

<!--  <router-view> can no longer be used directly inside <transition> or <keep-alive>.-->
<!--    Use slot props instead:-->
<!--  <router-view v-slot="{ Component }">-->
<!--    <transition>-->
<!--      <component :is="Component" />-->
<!--    </transition>-->
<!--  </router-view>-->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
