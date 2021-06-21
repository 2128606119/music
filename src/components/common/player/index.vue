<template>
  <div>
      <!--歌词-->
      <SongPage></SongPage>
      <!--播放器-->
      <div class="mksup">
        <div class="sumpp rew">
          <!--上一曲，下一曲，暂停-->
          <div class="left rew">
            <div class="bun">
              <!--上一曲-->
              <i class="iconfont icon-prev nice1_music83 nivc" @click="Inasong"></i>
              <!--播放、暂停-->
              <div>
                <i class="iconfont nivv"
                   :class={niceicon_play:!yanzheng,nice07zanting:yanzheng}
                   @click="liub"></i>
              </div>
              <!--下一曲-->
              <i class="iconfont icon-next nice1_music82 nivc" @click="Thepiece"></i>
            </div>
          </div>
          <!--进度条-->
          <div class="center">
            <img :src="SongCovering.SongCover">
            <div class="info">

              <!--歌曲详情-->
              <div class="TheSong">
                <h2 class="name">{{SongCovering.songname}}
                  <span>{{SongCovering.name}}</span>
                </h2>
                <p>{{playtime+'  /  '+time}}</p>
              </div>

              <!--进度条-->
              <div class="progressbar">
                <el-slider v-model="value1" @change="chbu" :format-tooltip="formatTooltip"></el-slider>
              </div>
            </div>
          </div>
          <!--音量，歌词，歌曲列表-->
          <div class="right rew">
            <div class="right_1 rew">
              <i class="iconfont volume-icon iclaba"
                 :class="{niceshengyin1:volume,nicejingyin1:!volume}"
                 @click="thevolume"
              ></i>
              <div class="iclaba_1">
                <!--音量滑块-->
                <el-slider v-model="vol"></el-slider>
              </div>
            </div>
            <div class="right_2">
              <!--播放模式-->
              <i class="iconfont r_1" @click="Playbackevent" :class="Broadcastformatlist[index]"></i>
              <!--歌词-->
              <i class="iconfont nicegeci32 r_1" @click="lyrickong"></i>
              <!--播放列表-->
              <i class="iconfont nicebofangliebiao24 r_1" @click="history=!history"></i>
            </div>
          </div>
          <!--音乐元素-->
          <audio :src="MusisURLk"
                 id="myAudio"
                 @timeupdate="updateTime"
                 autoplay
          ></audio>
          <transition name="el-zoom-in-bottom">
            <liveband v-show="history"></liveband>
          </transition>
        </div>
      </div>
  </div>
</template>

<script>
  import instrument from 'instrument'
  import liveband from 'components/common/liveband'
  /*歌词*/
  import SongPage from 'components/common/SongPage'
  export default {
    name: "index",
    data(){
      return{
        /*播放历史*/
        history:false,
        /*控制播放形式*/
        PlayForm:'',
        /*音乐进度*/
        value1:0.0,
        /*音量*/
        vol:50,
        /*比例*/
        fenc:0,
        /*播放时间*/
        playtime:'00:00',
        /*音乐时长*/
        musicTime:0,
        /*控制音量*/
        volume:true,
        /*播放格式*/
        Broadcastformatlist:[
            /*顺序*/
          "nicexunhuanbofang24",
            /*循环*/
          "nicebofangqidanquxunhuan",
            /*随机*/
          "nicebofangqisuijibofang"
        ],
        index:0
      }
    },
    components:{
      SongPage,
      liveband
    },
    computed: {
      /*播放图标*/
      yanzheng() {
        return this.$store.state.control
      },
      /*歌曲URL*/
      MusisURLk() {
        return this.$store.state.MusisURL
      },
      /*歌曲详情*/
      SongCovering() {
        return this.$store.state.DetailsSong
      },
      /*歌曲时长*/
      time() {
        let i = instrument.formatSecond(this.$store.state.DetailsSong.songtime)
        this.musicTime = i
        this.fenc = i / 100
        i = instrument.formatSecondTime(i)
        return i
      },
      /*ID*/
      key() {
        return this.$store.state.MusicID;
      },
      /*播放器dom对象*/
      MyAudio() {
        return document.getElementById('myAudio');
      }
    },
    methods:{
      /*上一首*/
      Inasong(){
        this.$store.commit('Playdownxs',0)
        // this.$store.commit('Endplayxs',new Date().getTime());
        this.$store.commit('sjcxs',new Date().getTime());
      },
      /*下一曲*/
      Thepiece(){
        this.$store.commit('Playdownxs',1)
        this.$store.commit('sjcxs',new Date().getTime());
      },
      /*歌词显示*/
      lyrickong(){
        let ip=!this.$store.state.SongPage
        this.$store.commit('SgPg',ip)
      },
      /*播放格式事件*/
      Playbackevent(z){
        this.index++
        if(this.index==3){
          this.index=0
        }
        this.$store.commit('Broadcastformatxs',this.Broadcastformatlist[this.index])
        console.log(this.Broadcastformatlist[this.index])
        if(this.Broadcastformatlist[this.index]=='nicebofangqidanquxunhuan'){
          this.MyAudio.setAttribute('loop','loop')
        }else {
          this.MyAudio.removeAttribute('loop')
        }
      },
      /*控制音量*/
      thevolume(){
        if(this.volume){
          this.volume=false
          this.vol=0
        }else {
          this.volume=true
          this.vol=50
        }
      },
      /*进度条显示*/
      formatTooltip(val){
        return this.playtime
      },
      /*进度条拖动*/
      chbu(){
          this.MyAudio.currentTime=(this.value1)*this.fenc
      },
      /*播放位置改变时触发*/
      updateTime(){
        this.playtime=instrument.formatSecondTime(this.MyAudio.currentTime)
      },
      /*控制播放*/
      liub(){
        this.$store.commit('updatecoun',!this.$store.state.control)
        if(this.MyAudio.paused)
        {
          this.MyAudio.play();
          this.$store.commit('upindexs',this.$store.state.indexs-100)
        }else{
          this.MyAudio.pause();
          this.$store.commit('upindexs',this.$store.state.indexs+100)
        }
      }
    },
    watch:{
      vol(val){
        this.MyAudio.volume=val/100
      },
      key(val) {
        this.MyAudio.pause();
      },
      yanzheng(val){
        if(val){
          this.MyAudio.play();
        }else {
          this.MyAudio.pause();
        }
      },
      /*下一首*/
      playtime(val) {
        this.value1 = this.MyAudio.currentTime / this.fenc
        if(val==this.time){
          this.$store.commit('Endplayxs',new Date().getTime());
        }
      }
    }
  }
</script>

<style scoped>

  .iclaba_1{
    width: 100%;
  }

  .iclaba{
    font-size: 23px;
    font-weight: 700;
    cursor: pointer;
    margin-right: 10px;
  }

  .right{
    height: 72px;
  }
  .mksup{
    width: 100%;
    height: 72px;
    background: rgba(255,255,255,0.95);
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 20;
    padding: 0 10px 0 20px;
    justify-content: space-between;
    padding-left: calc(100vw - 100%);
  }
  .sumpp{
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .mksup{
    width: 100%;
  }
  .center{
    height: 72px;
    display: flex;
    align-items: center;
    flex: 1;
  }
  .rew{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .name{
    font-size: 13px;
    font-weight: bold;
    margin-right: 10px;
  }
  .name span{
    font-size: 12px;
    color: #888;
    font-weight: 200;
    margin-left: 10px;
  }
  .TheSong{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .r_1{
    font-size: 26px;
    margin: 0 10px;
    cursor: pointer;
  }
  .right_1{
    width: 150px;
    margin-right: 10px;
  }
  .info{
    width: 100%;
    margin: 0 20px 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 72px;
  }
  .center img{
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .nivv{
    font-size: 22px;
    color: #fff;
    position: relative;
    top: 10px;
    left: 10px;
  }
  .nivc{
    font-size: 20px;
    color: #fa2800;
  }
  .bun div{
    width: 43px;
    height: 43px;
    background: linear-gradient(
            110deg
            , #fa2800, #fb8974);
    border-radius: 50%;
    margin: 0 26px;
  }

  .bun{
    height: 40px;
    display: flex;
    align-items: center;
  }
  .left{
    margin-right: 20px;
    display: flex;
    align-items: center;
  }


</style>