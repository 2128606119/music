<template>
  <div id="app">
    <!--头部菜单-->
    <navbar v-if="!this.$route.params.logid"></navbar>
    <!--路由-->
    <router-view v-show="!this.$store.state.SongPage"></router-view>
    <!--播放器-->
    <player v-if="this.$store.state.MusicID!=0&&!this.$route.params.logid"></player>
    <!--底部-->
    <bottombase></bottombase>
    <!--去顶部-->
    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
  </div>
</template>

<script>
  /*头部*/
  import navbar from "components/common/navbar"
  /*播放器*/
  import player from 'components/common/player'
  /*底部*/
  import bottombase from 'components/common/bottombase'
  export default {
    name: 'App',
    components: {
      navbar,
      player,
      bottombase
    }
  }
</script>`
<style>
  @import './assets/css/reset.css';
  @import './assets/css/icon.css';
  ::-webkit-scrollbar{width:0;}

  #app{
   width: 100%;
   height: 100%;
}
.fly {
  pointer-events: none;
  position: fixed;
  z-index: 100;
}
.bg-fly-circle1 {
  left: 40px;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.07) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 2.5s linear infinite;
}

.bg-fly-circle2 {
  left: 3%;
  top: 60%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.08) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 3s linear infinite;
}

.bg-fly-circle3 {
  right: 2%;
  top: 140px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.1) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
  right: 5%;
  top: 60%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.02) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 3.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(25px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
