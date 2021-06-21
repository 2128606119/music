<template>
  <div class="overall-plan">
    <div class="caption">
      播放历史
      <i class="iconfont nicelajitong" @click="Emptyrecord"></i>
    </div>
    <div class="playlist">

      <div class="playin"
           v-for="(i,index) in this.$store.state.playList"
           :class="{poli:polid==index,polisum:polisum==index}"
           @mouseout="polidc"
           @mouseover="polidj(index)">
        <div class="item">

          <span class="num">{{cpros(index)}}</span>

          <i class="iconfont nicebofang2 play-btn gcy" @click="poif(index,i)"></i>

          <i class="iconfont nicezanting1 play-btn tup" @click="poifs()"></i>

        </div>

        <p class="itemp">{{i.songname}}</p>
        <i class="itemi iconfont niceIcon_cloose" @click="Emptysingle(i)"></i>
      </div>
    </div>
  </div>
</template>

<script>
  /*请求数据*/
  import {MESSURL} from 'network/home'
  export default {
    name: "index",
    data(){
      return{
        polid:-1,
        polisum:-1
      }
    },
    computed:{
      sjcxs(){
        return this.$store.state.sjc
      }
    },
    components:{
      inddp(){
        return this.$store.state.indexs
      }
    },
    methods:{
      Emptysingle(i){
        this.$store.commit('RemoveEmptyrecord',i);
        this.polid=-1
        this.polisum=-1
      },
      Emptyrecord(){
        this.$store.commit('Emptyrecordxs');
      },
      poifs(){
        this.polid=-1
        this.polisum=-1
        this.$store.commit('updatecoun', false)
      },
      poif(z,i){
        this.polisum=z

        this.$store.commit('DetailsSongxs', i.DetailsSong)
        /*控制播放*/
        this.$store.commit('updatecoun', true)
        if (this.$store.state.MusicID != i.SongID) {
          this.$store.commit('playmusic', i.SongID)
          MESSURL('/song/url?id=' +  i.SongID).then(res => {
            this.$store.commit('updateURL', res.data[0].url)
            this.$store.commit('upindexs', i.index)
          })
        }else {
          this.$store.commit('upindexs', i.index + 100)
        }
      },

      polidc(){
        this.polid=-1
      },
      polidj(z){
        if(this.polisum!=z){
          this.polid=z
        }
      },
      cpros(res){
        if((res+1)<10){
          return '0'+(res+1)
        }
        return (res+1)
      }
    },
    watch:{
      inddp(z){
          this.polid=-1
          this.polisum=-1
      },
      sjcxs(z){
        this.polid=-1
        this.polisum=-1
      }
    }
  }
</script>

<style scoped>
  .playlist{
    width: 100%;
    height: 90%;
    overflow-y: scroll;
  }

  .polisum .item .num,.polisum .item .num .gcy{
    display: none;
  }
  .polisum .item .tup{
    display:block;
  }
  .polisum .itemp{
    color: #fa2800;
  }

  .poli .item .num{
    display: none;
  }
  .poli .item .gcy{
    display: block;
  }

  .itemi:hover{
   color: #fa2800;
 }


  .play-btn{
    color: #fa2800;
    font-size: 28px;
    text-align: left;
    cursor: pointer;
    display: none;
  }
  .itemi{
    font-size: 20px;
    cursor: pointer;
  }
  .itemp{
    cursor: pointer;
    flex: 1;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item num{
    font-size: 14px;
    color: #4a4a4a;
  }
  .item{
    width: 30px;
    margin-right: 20px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .playin{
    padding: 8px 0;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .caption i:hover{
    color:#fa2800;
  }
  .overall-plan{
    width: 345px;
    height: 550px;
    position: absolute;
    right: 5px;
    border-radius: 3px;
    padding: 30px;
    background-color: #FFFFFF;
    box-shadow: 0px 5px 40px -1px rgba(2,10,18,0.1);
    bottom: 50px;
}
  .caption{
    margin: 10px 0 20px;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .caption i{
    font-size: 20px;
  }
</style>