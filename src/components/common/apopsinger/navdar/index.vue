<template>
  <div class="top">
    <div class="top-mask">
      <div class="singer-box flex-column flex-center">
        <!--头像-->
        <div class="avatar transition">
        <img :src="cover(sum)+'?param=200y200'">
        <div class="level flex-center transition" style="display: none">
          <i class="iconfont icon-level"></i>
        </div>
      </div>
        <!--歌手名-->
        <p class="nickname">{{name(sum)}}</p>
        <!--关注-->
        <div class="follow flex-center transition">
          <i class="iconfont niceIcon_add"></i>
          关注TA
        </div>
        <!--介绍-->
        <div class="desc ellipsis-two">{{briefDesc(sum)}}</div>
        <!--歌曲书 专辑数 MV数-->
        <ul class="info flex-center">
          <li>
            <p class="num">{{musicSize(sum)}}</p>
            <p class="text">单曲数</p>
          </li>
          <li>
            <p class="num">{{albumSize(sum)}}</p>
            <p class="text">专辑数</p>
          </li>
          <li>
            <p class="num">{{mvSize(sum)}}</p>
            <p class="text">MV数</p>
          </li>

        </ul>
      </div>
    </div>
    <div class="bottom-trangle"></div>
  </div>
</template>

<script>
  export default {
    name: "index",

    computed:{
      sum(){
        return (this.$parent.Detailsofthesinger.data || {}).artist
      }
    },
    methods:{
      cover(sum){
        return (sum || {}).cover
      },
      name(sum){
        return (sum || {}).name
      },
      briefDesc(sum){
        return (sum || {}).briefDesc
      },
      musicSize(sum){
        return (sum || {}).musicSize
      },
      albumSize(sum){
        return (sum || {}).albumSize
      },
      mvSize(sum){
        return (sum || {}).mvSize
      }


    }
  }
</script>

<style scoped>
  .bottom-trangle {
    background-image: url("../../../../assets/img/apopsinger/allkl.png");
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 137px;
    background-position: center;
    z-index: 1;
  }

  .info li .text{
    font-size: 14px;
    line-height: 14px;
    color: rgba(255,255,255,0.6);
  }
  .info li .num{
    margin-bottom: 8px;
    font-size: 24px;
    line-height: 24px;
    color: #fff;
  }
  .info li{
    margin: 0 50px;
    text-align: center;
  }
  .info{
    margin: 0 auto;
    width: 100%;
  }
   .flex-center {
     display: flex;
     justify-content: center;
     align-items: center;
   }

  .singer-box .desc{
    margin: 0 auto 24px;
    width: 740px;
    height: 48px;
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    line-height: 24px;
  }

   .ellipsis-two {
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 2;
     overflow: hidden;
     font-weight: 700;
     line-height: 18px;
   }

  .follow i {
    margin-right: 5px;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top-mask .singer-box .follow {
    margin: 24px 0 30px;
    padding: 0;
    height: 36px;
    width: 96px;
    font-size: 12px;
    line-height: 36px;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.6);
    cursor: pointer;
    border-radius: 18px;
  }

  .nickname{
    margin-top: 20px;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    line-height: 24px;
  }

  .avatar:hover {
    box-shadow: 0px 5px 20px 0px rgba(255, 255 ,255, 0.8);
  }
  .icon-level{
    font-size: 25px;
    color: #fa2800;
    margin-left: 8px;
  }

  .avatar .level{
    width: 100%;
    height: 25px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.8);
  }

  .avatar img{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid rgba(255,255,255,0.6);
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
  }

    .top-mask .singer-box {
    height: 100%;
    position: relative;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
    z-index: 2;
  }
   .flex-column {
     display: flex;
     flex-direction: column;
     align-items: center;
   }
   .flex-center {
     display: flex;
     justify-content: center;
     align-items: center;
   }




  .top {
    position: relative;
    width: 100%;
    height: 580px;
    background: url(../../../../assets/img/apopsinger/top-bg.5c3d6989.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .top .top-mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }
</style>