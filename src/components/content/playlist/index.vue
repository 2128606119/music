<template>
  <div>
    <h2 class="lables">推荐歌单</h2>
    <div class="playlistsum">
    <div v-for="i in this.$parent.playlist" class="play" :key="i.id" @click="toDetail(i)">
      <bynamic>
        <!--图片加载-->
        <div class="play_1">
          <!--背景1-->
          <span class="setting_1 settingsum"></span>
          <!--图片-->
          <el-image lazy :src="i.picUrl+'?param=300y300'" slot="error" class="imagelist">
            <div slot="placeholder" v-loading="true" class="image-slot"></div>
          </el-image>
          <!--背景2-->
          <span class="setting_2 settingsum"></span>
          <!--热门度-->
          <div class="count">
          <i class="arrow"></i>
          <span>{{counts(i.playCount)}}</span>
          <span class="jiao"></span>
        </div>
        </div>
        <!--标题-->
        <div class="play_2">
          <h2 style="font-size: 14px;overflow: hidden;">{{i.name}}</h2>
        </div>
      </bynamic>
    </div>
  </div>
  </div>
  
</template>

<script>

  import { KinesisContainer, KinesisElement } from 'vue-kinesis'
  import bynamic from 'components/common/bynamic'
  import {calculate} from 'instrument'
  export default {
    name: "index",
    components: {
      KinesisContainer,
      KinesisElement,
      bynamic
    },
    methods:{
      toDetail(ser){
        this.$router.push("/Recplaylist/"+ser.id)
      },
      counts(res){
        return calculate(res)
      }
    }
  }
</script>

<style scoped>
  .image-slot{
    background: #F5F7FA;
    text-align: center;
    width: 112px;
    height: 112px;
    font-size: 14px;
    color: #C0C4CC;
  }
  .settingsum{
    border-radius: 2px;
    width: 5px;
    background: rgba(0,0,0,0.2);
    position: absolute;
  }
  .setting_2{
    right: -10px;
    top: 20px;
    z-index: -1;
    height: 89px;
    opacity: 0.5;
  }
  .setting_1{
    right: -5px;
    top: 10px;
    z-index: 0;
    height: 110px;
  }
  .jiao{
    content: "";
    position: absolute;
    right: -14px;
    top: 0;
    width: 14px;
    height: 24px;
    background: url(../../../assets/img/home/Heatsetting.png) no-repeat 100%;
    background-size: cover;
  }
  .lables{
    margin: 0 0 15px 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  .playlistsum{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
  .play{
    flex: 0 0 12.4%;
    max-width: 12.5%;
    padding: 0 10px 25px;
    cursor: pointer;
  }
  .play_2{
    margin-top: 15px;
  }
  .play_2 h2{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.85);
  }
  .imagelist{
    border-radius: 5px;
    width: 100%;
    height:130px ;
  }
  .image-slot{
    width: 100%;
    height:130px;
  }
  .arrow{
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 6px;
    border-color: transparent transparent transparent #fff;
    margin-right: 5px;
  }
  .count{
    position: absolute;
    right: 16px;
    top: 1px;
    height: 24px;
    padding-left: 9px;
    background: url(../../../assets/img/home/Heatsetting.png) no-repeat 0;
    background-size: cover;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>