<template>
  <div class="home">
    <navMenu></navMenu>
    <mainContainer></mainContainer>
  </div>
</template>

<script>
import navMenu from '@/components/navMenu.vue'
import mainContainer from '@/components/mainContainer.vue'
export default {
  name: 'Home',
  components: {
    navMenu,
    mainContainer
  }
}
</script>
<style scoped lang="scss">

</style>
