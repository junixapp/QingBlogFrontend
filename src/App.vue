<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>

  export default {
    name: 'app',
    mounted(){
      let path = window.location.href.split("#")[1] || "/";
      if(!(path === "/")){
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
