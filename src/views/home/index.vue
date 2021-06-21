<template>
  <div class="sum">
    <!--轮播图-->
    <slideshow></slideshow>
    <!--推荐歌单-->
    <playlist></playlist>
    <!--推荐新歌曲-->
    <song></song>
    <!--推荐歌手-->
    <thesinger></thesinger>
  </div>
</template>

<script>
  /*请求数据*/
  import {HotSearch} from 'network/home'
  /*轮播图子组件*/
  import slideshow from 'components/content/slideshow'
  /*推荐歌单*/
  import playlist from 'components/content/playlist'
  // 推荐新歌曲
  import song from 'components/content/song'
  //推荐推荐歌手
  import thesinger from 'components/content/thesinger'

  export default {
    name: "index",
    data(){
      return {
        /*轮播图地址*/
        image:[],
        /*推荐歌单*/
        playlist:[],
        /*推荐心音乐*/
        newsong:[],
        /*推荐歌手*/
        artists:[]
      }
    },

    components:{
      slideshow,
      playlist,
      song,
      thesinger
    },
    created() {
      /*轮播图*/
      HotSearch('/banner').then(res=>{
        this.image=res.banners
      })
      /*请求推荐歌单*/
      HotSearch('/personalized?limit=24').then(res=>{
        this.playlist=res.result
      })
      /*请求推荐新歌曲*/
      HotSearch('/personalized/newsong').then(res=>{
        this.newsong=res.result
      })
      /*请求推荐新歌曲*/
      HotSearch('/top/artists?offset=0&limit=30').then(res=>{
        this.artists=res.artists
      })
    }
  }
</script>

<style scoped>
  .sum{
    padding-top: 70px;
    max-width: 1200px;
    width: 101%;
    margin: auto;
  }
</style>