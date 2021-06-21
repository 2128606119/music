<template>
  <div class="info">
    <h2 class="title">推荐新音乐</h2>
    <div class="left">
      <div class="list" v-for="(i,index) in this.$parent.newsong">
        <div class="avatar">
          <span class="bofangs"
                @click="but(i,index)"
                :class="{vb:transmit==index,vbs:transmit==index+100}">
            <i class="iconfont nicebofang2 play-btn"></i>
            <i class="iconfont nicezanting1 pause-btn"></i>
          </span>
          <img
               :key="i.picUrl + '?param=150y150'"
               :src="i.picUrl + '?param=150y150'">
        </div>
        <div class="avatar_1">
          <p class="name">{{i.name}}</p>
          <p class="author">
            <span class="ellipsis">{{i.song.artists[0].name}}</span>
          </p>
        </div>
        <p class="list_1">{{time(i.song.duration)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import instrument from 'instrument'
  /*请求数据*/
  import {MESSURL} from 'network/home'
  export default {
    name: "index",
    data(){
      return{
        indexs:1000
      }
    },
    computed:{
      transmit(){
       return this.$store.state.indexs
      },
      Endplayxsm(){
        return this.$store.state.Endplay
      },
      Playdownxs(){
        return this.$store.state.Playdown
      }
    },
    methods: {
      fklo(res){
        for(let j=0;j<this.$store.state.playList.length;j++){
          if(this.$store.state.playList[j].SongID==res.SongID){
            return false
          }
        }
        return true
      },
      /*歌曲时长*/
      time(res){
      let i=instrument.formatSecond(res)
      i=instrument.formatSecondTime(i)
      return i
    },
      /*歌曲数据*/
      but(res, index) {
        if (this.$store.state.indexs != index) {
          /*歌曲详情*/
          console.log(res)
          /*存储歌曲详情*/
          const DetailsSong={
                /*歌曲封面*/
                SongCover:res.picUrl,
                /*歌曲名*/
                songname:res.name,
                /*作者*/
                name:res.song.artists[0].name,
                /*歌曲时长*/
                songtime:res.song.duration
          }
          this.$store.commit('DetailsSongxs', DetailsSong)


          /*播放列表存储*/
          const DetailsSong_1={
            DetailsSong,
            /*歌曲名*/
            songname:res.name,
            /*歌曲ID*/
            SongID:res.id,
            /*下标*/
            index:index
          }

          if(this.fklo(DetailsSong_1)){
            this.$store.commit("playListxs",DetailsSong_1)
          }

          /*控制播放*/
          this.$store.commit('updatecoun', true)
          this.$store.commit('upindexs', index)
          if (this.$store.state.MusicID != res.id) {
            this.$store.commit('playmusic', res.id)
            MESSURL('/song/url?id=' + res.id).then(res => {
              console.log(res.data[0].url)
              /*存储音乐路径和下标*/
              this.$store.commit('updateURL', res.data[0].url)
              this.$store.commit('upindexs', index)
            })
          }
        }
        else {
          this.$store.commit('updatecoun', false)
          this.$store.commit('upindexs', index + 100)
        }
      },

    },
    watch:{
      /*播放顺序*/
      Endplayxsm(){
        let i = this.$store.state.indexs+1;
        let sum = this.$parent.newsong;

        switch (this.$store.state.Broadcastformat) {
            /*顺序*/
          case 'nicexunhuanbofang24':
            if (sum.length == i) {
              i = 0
            }
            this.but(sum[i], i)
            break;
            /*随机*/
          case 'nicebofangqisuijibofang':
            i = instrument.rodom()
            this.but(sum[i], i)
            break;
        }
      },
      Playdownxs(z){
        switch (z) {
          case 0:
            let i = this.$store.state.indexs-1;
            let sum = this.$parent.newsong;
            switch (this.$store.state.Broadcastformat) {
                /*顺序*/
              case 'nicexunhuanbofang24':
                if (i<0) {
                 i=sum.length-1
                }
                this.but(sum[i], i)
                break;
                /*随机*/
              case 'nicebofangqisuijibofang':
                i = instrument.rodom()
                this.but(sum[i], i)
                break;
            }

            break;
          case 1:
            this.$store.commit('Endplayxs',new Date().getTime());
            break;
        }
        this.$store.commit('Playdownxs',-1)
      }
    }
  }
</script>
<style scoped>
  .play-btn,.pause-btn{
    color: #fa2800;
    font-size: 30px;
    display: none;
    text-align: center;
    margin-top: 13px;
  }
  .bofangs:hover{
    background: rgba(0,0,0,0.5);
  }
  .bofangs:hover .play-btn{
    display: block;
  }
  .bofangs:hover .pause-btn{
    display: none;
  }
  .vb,.vbs{
    background: rgba(0,0,0,0.5);
  }
  .vb .pause-btn{
    display: block!important;
  }
  .vb .play-btn{
    display: none!important;
  }

  .vbs .play-btn{
    display: block!important;
  }
  .vbs .pause-btn{
    display: none!important;
  }



  .bofangs{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.15s;
    border-radius: 4px;
  }
  .author{
    font-size: 12px;
    color: #666;
    font-weight: bold;
    flex: 1;
  }
  .ellipsis{
    font-weight: 400;
  }
.name{
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}
  .list_1{
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-left: 80px;
    margin-top: 10px;
  }
  .avatar_1{
    flex: 1;
    margin-top: 10px;
  }
  .avatar{
    width: 70px;
    height: 70px;
    border-radius: 4px;
    margin-right: 15px;
    position: relative;
    line-height: 1.5;
  }

  .left{
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 50%;

  }

  .list{
    flex: 0 0 50%;
    max-width: 50%;
    padding-right: 30px;
    display: flex;
    margin-bottom: 20px;
  }
  .avatar img{
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  .info{
    margin-top: 15px;
    width: 102.5%;
  }
  .title{
    margin: 0 0 15px 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }

</style>