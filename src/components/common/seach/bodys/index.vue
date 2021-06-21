<template>
  <div class="main container">
    <div class="tab flex-row">
      <h2>搜索结果</h2>
      <a @click="danqu">单曲</a>
      <a @click="gesho">歌手</a>
      <a @click="album">专辑</a>
      <a @click="videotv">视频</a>
      <a @click="songlist">歌单</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "index",
    methods:{
      videotv(){
        let i='/seach/'+this.$route.params.myid+'/videotv'
        this.$router.push(i)
      },
      danqu(){
        let i='/seach/'+this.$route.params.myid+'/seachsingle'
        this.$router.push(i)
      },
      gesho(){
        let i='/seach/'+this.$route.params.myid+'/seachsinger'
        this.$router.push(i)
      },
      album(){
        let i='/seach/'+this.$route.params.myid+'/seachsalbum'
        this.$router.push(i)
      },
      songlist(){
        let i='/seach/'+this.$route.params.myid+'/seachssonglist'
        this.$router.push(i)
      }
    }
  }
</script>
<style scoped>
  .tab a{
    position: relative;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin-right: 34px;
    font-weight: 300;
    color: #333;
    z-index: 1;
    cursor: pointer;
  }
  .tab h2 {
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    margin-right: 40px;
  }

  .tab{
    display: flex;
    align-items: baseline;
    margin-top: 43px;
    margin-bottom: 42px;
  }

  .container {
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
</style>