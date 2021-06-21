<template>
  <div class="page-right">
      <!--歌曲-->
      <h3 class="name flex-between">{{$store.state.DetailsSong.songname}}
        <i class="el-icon-arrow-down jianlai" @click="shut"></i>
      </h3>
      <!--作者-->
      <p>{{$store.state.DetailsSong.name}}</p>
      <!--歌词内容-->
      <div class="lyric-wrap">
          <div class="lyric-box">

            <div class="lyric">
              <!--歌词显示-->
              <div>
                <p class="lyric-text"
                   v-if="load"
                   v-for="(item,index) in currentLyricgec"
                   :class="{xuanz:inx==index}">{{item}}</p>
                <!--无歌词显示-->
                <p v-if="!load">{{message}}</p>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import {geci} from 'network/home.js'
  import BScroll from 'better-scroll'
  export default {
    name: "index",
    data(){
      return{
        currentLyricNum:null,
        currentLyricgec:null,
        load:false,
        message:'',
        id:0,
        inx:0,
        scroll:null
      }
    },
    /*挂载结束*/
    mounted() {
      this.scroll=new BScroll(document.querySelector(".lyric"),{
        probeType:3
      })
      this.scroll.on('scroll',(z)=>{
        console.log(z)
      })
    },
    methods: {
      shut(){
        let ip=!this.$store.state.SongPage
        this.$store.commit('SgPg',ip)
      },
      kou(z){
        geci("/lyric?id="+z).then(res=>{
          if(res.lrc.lyric.length==0){
            this.load=false
            this.message='暂无歌词请欣赏音乐'
            return
          }
          let lyric=res.lrc.lyric
          let sum = lyric.split("\n");
          let Num=new Array();
          let gec=new Array();
          for (let i=0; i<sum.length;i++){
            let j=sum[i]
            Num[i]= j.substring( j.indexOf("[") + 1, j.indexOf("."));
            gec[i]=j.substring( j.indexOf("]") + 1, j.length);
            if(gec[i].length==0){
              gec[i]='...'
            }
          }
          this.currentLyricgec=gec
          this.currentLyricNum=Num
          this.load=true
        });
      }
    },
    computed:{
      idm(){
        return this.$store.state.MusicID
      },
      tim(){
        return this.$parent.$parent.playtime
      }
    },
    created() {
      this.id=this.$store.state.MusicID
    },
    watch:{
      idm(z){
        this.kou(z)
      },
      id(z){
        this.kou(z)
      },
      tim(z){
        let j=this.currentLyricNum
        let i=j.length
        for(var ji=0;ji<i;ji++){
            if(j[ji]==z){
                this.inx=ji
                break;
            }
        }
      }
    }
  }
</script>

<style scoped>
  .jianlai{
    font-size: 32px;
    color: #888;
    font-weight: 700;
  }
  ::-webkit-scrollbar{width:0;}
  .lyric{
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 430px;
    overflow: auto;
  }
.lyric-wrap{
  width: 100%;
  height: 480px;
  border-radius: 4px;
  padding: 30px;
  overflow: hidden;
  background: #f8f9ff;
  margin-top: 30px;
}


.page-right{
  width: 50%;
  margin-left: 175px;
}
.name{
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  justify-content: space-between;
}
.flex-between{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

  .lyric-text{
    margin: 5px 0;
    line-height: 24px;
    font-size: 14px;
    font-weight: 300;
  }
  .xuanz{
    color: #fa2800;
  }
  /*.lyric-box{*/
  /*  width: 345px;*/
  /*  height: 550px;*/
  /*  position: absolute;*/
  /*  right: 5px;*/
  /*  bottom: 50px;*/
  /*  border-radius: 3px;*/
  /*  padding: 30px;*/
  /*  !*overflow: hidden;*!*/
  /*  overflow-y:scroll;*/

  /*}*/
  /*.shadow{*/
  /*  background-color: #FFFFFF;*/
  /*  !*background: red;*!*/
  /*  -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);*/
  /*  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);*/
  /*}*/
</style>