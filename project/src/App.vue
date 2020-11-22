<template>
  <div id="app" class="app-wrapper">
    <Head></Head>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
/* eslint-disable */
import Head from '@/components/head.vue'
  export default {
    components: {
      Head,
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      }
    }
  }
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
