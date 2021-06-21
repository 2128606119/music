<template>
  <div class="bottom container">
    <ul class="nav flex-center">
      <li @click="works">作品</li>
      <li @click="albumson">专辑</li>
      <li @click="Deosinger">歌手详情</li>
      <li @click="Similartosinger">相似歌手</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "index",
    methods:{
      works(){
        this.$router.push("/apopsinger/"+this.$route.params.singerid+"/songlistson")
      },
      albumson(){
        this.$router.push("/apopsinger/"+this.$route.params.singerid+"/albumson")
      },
      Deosinger(){
        this.$router.push("/apopsinger/"+this.$route.params.singerid+"/Deosinger")
      },
      Similartosinger(){
        this.$router.push("/apopsinger/"+this.$route.params.singerid+"/Similartosinger")
      }
    }
  }
</script>

<style scoped>
  .nav li{
    margin: 0 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
  .nav {
    margin: 30px 0;
  }
   .flex-center {
     display: flex;
     justify-content: center;
     align-items: center;
   }
  .container {
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
</style>