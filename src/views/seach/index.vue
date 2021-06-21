<template>
  <div class="layout">
    <div class="fluid">
      <div class="search-wrap">
        <navbar></navbar>
        <bodys></bodys>
      </div>
    </div>
  </div>
</template>

<script>
  import bodys from 'components/common/seach/bodys'
  import navbar from 'components/common/seach/navbar'
  export default {
    name: "index",
    components:{
      navbar,
      bodys
    },
    // computed:{
    //   urlppn(){
    //     return this.$store.state.urlpath
    //   }
    // },
    // watch:{
    //   urlppn(z){
    //     window.location.href=z
    //     // this.$router.push(z)
    //   }
    // }
  }
</script>

<style scoped>
  .search-wrap {
    margin-top: -20px;
  }
  .fluid{
    padding: 20px 0;
  }
  .layout{
    padding-top: 70px;
  }
</style>