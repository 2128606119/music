<template>
  <div class="sum">
    <div class="fluid">
      <div class="personal-wrap">
        <div class="banner layer"></div>
        <div class="personal-main container">
          <div class="center shadow">
            <div class="card-header flex-between__1">
              <!--累计听歌-->
              <p class="flex-row">听歌排行
                <span>（累积听歌{{listenSongs}}首）</span>
              </p>
              <!--切换榜单-->
              <div class="tab flex-row">
                <span :class="{active:!Switchout}"
                      @click="week()">
                  最近一周
                </span>
                <span class="line"></span>
                <span :class="{active:Switchout}"
                      @click="thetime()">
                  所有时间
                </span>
              </div>
            </div>
            <!--播放全部-->
            <div class="artist-box">
              <div class="tool-head">
                <div class="item play-item">
                  <i class="iconfont niceOutlined_Play"></i>
                  播放全部
                </div>
              </div>

              <!--歌曲列表-->
              <table class="artist-table">
                <thead>
                <tr>
                  <th class="th-index">序号</th>
                  <th class="th-name">歌曲</th>
                  <th class="th-artist">歌手</th>
                  <th class="th-album">专辑</th>
                  <th class="th-duration">时长</th>
                </tr>
                </thead>

                <tbody >
                <tr :class="{singular:(index%2)!=0}"
                    v-for="(i,index) in detail"
                    @mouseover="selectStyle(index)"
                    @mouseout="outStyle()"
                >

                  <!--序号-->
                  <td :class="{condition:index==punk}">
                    <div class="index-container flex-center">
                      <span class="num" v-show="inp!=index">
                        {{index+1<10?'0'+(index+1):(index+1)}}
                      </span>
                      <i class="iconfont nicebofang2 play-btn"
                         v-show="inp==index"
                         @click="transmit(i,index)"
                      ></i>
                      <i class="iconfont nicezanting1 pause-btn"
                         @click="transmit_1"></i>
                    </div>
                  </td>

                  <!--歌曲-->
                  <td>
                    <div class="name-container">
                      <div class="avatar">
                        <div class="el-image">
                          <img class="el-image__inner" :src="i.song.al.picUrl+'?param=100y100'">
                        </div>
                      </div>
                      <p class="name ellipsis">{{i.song.name}}</p>
                    </div>
                  </td>

                  <!--歌手-->
                  <td>
                    <div class="artist-container">
                      <p class="author ellipsis">{{i.song.ar[0].name}}</p>
                    </div>
                  </td>

                  <!--专辑-->
                  <td>
                    <div class="album-container">
                      <p class="ellipsis">{{i.song.al.name}}</p>
                    </div>
                  </td>

                  <!--时长-->
                  <td>
                    <div class="duration-container">
                      <p>{{thilm(i.song.dt)}}</p>
                    </div>
                  </td>

                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="left">
            <div class="user-box shadow">
              <!--背景-->
              <div class="background layer" :style="{background:bakuige}" style="background-size:cover">
                <span></span>
              </div>
              <!--头像-->
              <div class="card flex-row">
                <!--头像-->
                <div class="avatar_1">
                  <img :src="avatarUrl">
                </div>
                <!--用户名-->
                <div class="flex-between">
                  <p class="name">{{nickname}}</p>
                  <div>
                    <button class="sign-btn">签到</button>
                  </div>
                </div>
              </div>
              <p class="desc"></p>
              <!--基本信息 -->
              <div class="profile">
                <div class="tag">
                  <span></span>等级： <i :class="level"></i>
                </div>
                <div class="tag">
                  <span></span>生日： {{itmll}}
                </div>
                <div class="tag">
                  <span></span>地区： -
                </div>
              </div>
              <ul class="follow">
                <li>
                  动态
                  <span>{{eventCount}}</span>
                </li>
                <li>
                  关注
                  <span>{{follows}}</span>
                </li>
                <li>
                  粉丝
                  <span>{{followeds}}</span>
                </li>
              </ul>
              <div class="foot flex-center">
                <a href="/" class="router-link-active">个人设置</a>
                <a href="/" class="router-link-active">我的等级</a>
              </div>
            </div>
            <div class="right">
              <!--个人创建-->
              <div class="my module shadow">
                <div class="card-header flex-row">
                  <span style="font-weight: bold;color: #4a4a4a;">我创建的歌单</span>
                </div>
                <div class="list">

                  <div class="item_1 two" v-for="i in playlist" @click="toDetail(i)">
                    <bynamic>
                    <div class="wrapper">
                      <span class="span_1"></span>
                      <div class="cover">
                        <!--歌单封面-->
                        <div class="imagesun">
                          <el-image :src="i.coverImgUrl" fit="cover">
                            <div slot="placeholder"
                                 class="image-slot">
                            加载中<span class="dot" >...</span>
                            </div>
                          </el-image>
                        </div>
                        <!--热门度-->
                        <div class="count">
                          <i class="arrow"></i>
                          <span>{{counts(i.playCount)}}</span>
                          <span class="jiao"> </span>
                        </div>
                      </div>
                      <span class="span_2"></span>
                    </div>
                    <div class="info_1">
                      <h2 class="lanworto">{{i.name}}</h2>
                    </div>
                    </bynamic>
                  </div>

                </div>
              </div>
              <!--个人收藏-->
              <div class="my collect module shadow">
                <div class="card-header flex-row">
                  <span style="font-weight: bold;color: #4a4a4a;">我收藏的歌单</span>
                </div>
                <div class="list">
                  <div class="item_1 two" v-for="i in Collecttheplaylist.playlist" @click="toDetail(i)">
                    <bynamic>
                    <div class="wrapper">
                      <span class="span_1"></span>
                      <div class="cover">
                        <!--歌单封面-->
                        <div class="imagesun">
                          <el-image :src="i.coverImgUrl" fit="cover">
                            <div slot="placeholder"
                                 class="image-slot">
                              加载中<span class="dot" >...</span>
                            </div>
                          </el-image>
                        </div>
                        <!--热门度-->
                        <div class="count">
                          <i class="arrow"></i>
                          <span>{{counts(i.playCount)}}</span>
                          <span class="jiao"> </span>
                        </div>
                      </div>
                      <span class="span_2"></span>
                    </div>
                    <div class="info_1">
                      <h2 class="lanworto">{{i.name}}</h2>
                    </div>
                    </bynamic>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { KinesisContainer, KinesisElement } from 'vue-kinesis'
  import bynamic from 'components/common/bynamic'
  import {songurl} from 'network'
  import {
    getUserDetail,
    getUserRecord,
    getUserArtist,
    getUserlist} from 'network/user_1.js'
  import instrument from 'instrument'
  import {time,calculate} from 'instrument'
  export default {
    name: "index",
    components: {
      KinesisContainer,
      KinesisElement,
      bynamic
    },
    data(){
      return {
        /*用户歌单*/
        playlist:[],
        /*用户收藏歌单*/
        Collecttheplaylist:{},
        // 歌单详情
        detail:{},
        //周
        thelist:{},
        //全部
        theall:{},
        //下标_1
        inp:- 1,
        //下标_2
        punk:-1,
        //下标_3
        punkse:-1,
        collectcoll:'#f2f2f2',
        collectcoll_1:'#333',

        /*用户ID*/
        uid:0,
        /*累计听歌*/
        listenSongs:0,
        /*用户名*/
        nickname:'',
        /*头像*/
        avatarUrl:'',
        /*等级*/
        level:0,
        /*背景图*/
        bakuige:'',
        /*排行切换*/
        Switchout:false,
        /*年龄*/
        updateTime:0,
        /*动态*/
        eventCount:0,
        /*关注*/
        follows:0,
        /*粉丝*/
        followeds:0,
        /*用户歌单*/
        playlistCount:0

      }
    },
    methods:{
      toDetail(ser){
        this.$router.push("/Recplaylist/"+ser.id)
      },
      counts(res){
        return calculate(res)
      },

      week(){
        this.detail=this.thelist
        this.Switchout=false
      },
      thetime(){
        this.detail=this.theall
        this.Switchout=true
      },
      thilm(res){
        let i=instrument.formatSecond(res)
        return instrument.formatSecondTime(i)
      },
      selectStyle(i){
        this.inp=i
      },
      outStyle(){
        this.inp=-1
      },
      playAllSong(){
        this.transmit(this.detail.tracks[0],0);
      },


      fklo(res){
        for(let j=0;j<this.$store.state.playList.length;j++){
          if(this.$store.state.playList[j].SongID==res.SongID){
            return false
          }
        }
        return true
      },
      /*开始*/
      transmit(i,index){
        if (this.$store.state.MusicID != i.song.id) {
          this.$store.commit('sjcxs' ,new Date().getTime())
          this.punk=index
          this.punkse=index

          /*存储歌曲详情*/
          const DetailsSong={
            /*歌曲封面*/
            SongCover:i.song.al.picUrl,
            /*歌曲名*/
            songname:i.song.name,
            /*作者*/
            name:i.song.ar[0].name,
            /*歌曲时长*/
            songtime:i.song.dt
          }
          this.$store.commit('DetailsSongxs', DetailsSong)

          /*播放列表存储*/
          const DetailsSong_1={
            DetailsSong,
            /*歌曲名*/
            songname:i.song.name,
            /*歌曲ID*/
            SongID:i.song.id,
            /*下标*/
            index:index
          }
          if(this.fklo(DetailsSong_1)){
            this.$store.commit("playListxs",DetailsSong_1)
          }

          /*控制播放*/
          this.$store.commit('updatecoun', true)
          this.$store.commit('playmusic', i.song.id)
          songurl(i.song.id).then(res=>{
            this.$store.commit('updateURL', res.data[0].url)
          })
        }
        else{
          this.$store.commit('updatecoun', true)
          this.punk=index
          this.punkse=index
        }
      },
      /*暂停*/
      transmit_1(){
        this.punk=-1
        this.$store.commit('updatecoun', false)
      }
    },
    computed:{
      itmll(){
        return time(this.updateTime)
      },
      inddp(){
        return this.$store.state.indexs
      },
      punks(){
        return this.$store.state.control
      },
      time(){
        return time(this.detail.createTime)
      },
      Endaa(){
        return this.$store.state.Endplay
      },
      Plaaa(){
        return this.$store.state.Playdown
      }
    },
    watch: {
      inddp(z){
        this.punk=-1
      },
      /*播放顺序*/
      Endaa(){
        let i = this.punk+1;
        let sum = this.detail;
        switch (this.$store.state.Broadcastformat) {
            /*顺序*/
          case 'nicexunhuanbofang24':
            if (sum.length == i) {
              i = 0
            }
            this.transmit(sum[i], i)
            break;
            /*随机*/
          case 'nicebofangqisuijibofang':
            i = parseInt(sum.length*Math.random())
            this.transmit(sum[i], i)
            break;
        }
      },
      Plaaa(z){
        switch (z) {
          case 0:
            let i = this.punk-1;
            let sum = this.detail;
            switch (this.$store.state.Broadcastformat) {
                /*顺序*/
              case 'nicexunhuanbofang24':
                if (i<0) {
                  i=sum.length-1
                }
                this.transmit(sum[i], i)
                break;
                /*随机*/
              case 'nicebofangqisuijibofang':
                i = instrument.rodom()
                this.transmit(sum[i], i)
                break;
            }

            break;
          case 1:
            this.$store.commit('Endplayxs',new Date().getTime());
            break;
        }
        this.$store.commit('Playdownxs',-1)
      },
      punks(z){
        if(z){
          this.punk=this.punkse
        }else {
          this.punk=-1
        }
      },
    },
    created() {
      this.uid=this.$route.params.uid
      // 用户详情
      getUserDetail(this.uid).then(res=>{
        this.nickname=res.profile.nickname
        this.avatarUrl=res.profile.avatarUrl
        this.level="iconfont lv-icon nicelevel-"+res.level
        this.listenSongs=res.listenSongs
        this.bakuige='url('+res.profile.backgroundUrl+')'
        this.updateTime=res.userPoint.updateTime
        this.follows=res.profile.follows
        this.followeds=res.profile.followeds
        this.eventCount=res.profile.eventCount
        this.playlistCount=res.profile.playlistCount
        /*用户收藏歌单*/
        getUserArtist(this.uid,this.playlistCount-1).then(res=>{
          this.Collecttheplaylist=res
          console.log(res)
        })
      })
      /*用户创建歌单*/
      getUserlist(this.uid).then(res=>{
        console.log(res)
       for (let i=0;i<res.playlist.length;i++){
         if(!res.playlist[i].subscribed){
            this.playlist[i]=res.playlist[i]
         }
       }
      })
      console.log(this.playlist)

      /*历史播放 周*/
      getUserRecord(this.uid,1).then(res=>{
        this.thelist=res.weekData
        this.detail=this.thelist
      })

      /*历史播放 全*/
      getUserRecord(this.uid,0).then(res=>{
        this.theall=res.allData
      })

    }
  }
</script>
<style scoped>
  .lanworto {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 700;
    line-height: 18px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  .info_1{
    margin-top: 15px;
  }
  .span_2{
    right: 1px;
    transform: scale(0.73);
    transform-origin: 100% 50%;
    z-index: 1;
    border-radius: 2px;
    opacity: 0.5;
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    position: absolute;
    top: 0;
    transition: all 0.4s;
  }
.span_1{
  right: 6px;
  transform: scale(0.85);
  transform-origin: 100% 50%;
  z-index: 2;
  border-radius: 2px;
  opacity: 0.9;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
  position: absolute;
  top: 0;
  transition: all 0.4s;
}
  .image-slot{
    width: 100%;
    height: 100%;
  }

  .imagesun{
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  .count{
    position: absolute;
    right: 16px;
    top: 1px;
    height: 24px;
    padding-left: 9px;
    background: url(../../assets/img/home/Heatsetting.png) no-repeat 0;
    background-size: cover;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
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

  .jiao{
    content: "";
    position: absolute;
    right: -14px;
    top: 0;
    width: 14px;
    height: 24px;
    background: url(../../assets/img/home/Heatsetting.png) no-repeat 100%;
    background-size: cover;
  }

  .list .item_1 .wrapper .cover{
    position: relative;
    z-index: 2;
    padding-top: 100%;
    border-radius: 2px;
    background-color: #d9d9d9;
  }


  .list .item_1 .wrapper{
    position: relative;
    padding-right: 10px;
  }
  .list .item_1.two {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .list .item_1 {
    flex: 0 0 12.5%;
    max-width: 12.5%;
    padding: 0 10px 25px;
    cursor: pointer;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
</style>

<style scoped>

  .right{
    width: 340px;
    flex-shrink: 0;
    border-radius: 5px;
    background: #fff;
    position: relative;
    padding-bottom: 30px;
    margin-top: 20px;
  }

  .my{
    padding-bottom: 5px;
  }
  .foot a {
    display: block;
    width: 50%;
    text-align: center;
    margin: 0 3% 10px 3%;
    padding: 10px 0;
    background: #ff416c;
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
  }
  .foot {
    width: 100%;
    padding: 0 30px;
    margin-top: 30px;
  }

  .follow li span {
    display: block;
  }
  .follow li {
    width: 33%;
    text-align: center;
    font-size: 14px;
    color: #958ebb;
  }
  .follow{
    list-style: none;
    display: flex;
    margin: 0 30px;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #f9f9ff;
  }
  .flex-between__1{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tag .lv-icon {
    font-size: 22px;
    position: relative;
    top: 1px;
  }
  .flex-between .name{
    font-weight: 600;
    font-size: 16px;
  }
  .tag span{
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fa2800;
    position: absolute;
    top: 50%;
    left: 0px;
    margin-top: -3px;
  }
  .tag{
    position: relative;
    font-size: 13px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .profile{
    padding: 0 40px;
    margin-top: 10px;
  }
  .desc {
    padding: 0 40px;
    font-size: 13px;
    margin-top: 10px;
    color: #666;
  }

  .sign-btn {
    padding: 3px 15px;
    font-size: 12px;
    color: #fff;
    border-radius: 30px;
    background: linear-gradient(to right, #ff4b2b, #ff416c);
  }

  .card .info .name {
    font-weight: 600;
    font-size: 16px;
  }
  .flex-between {
    width: 100%;
    padding-top: 20px;
    margin-left: 15px;
  }


  .card .avatar img {
    width: 64px;
    height: 64px;
    border-radius: 3px;
  }

  .card .avatar_1 {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    z-index: 2;
    position: relative;
  }

  .left .user-box .card {
    margin-top: -20px;
    padding: 0 15px 0 30px;
    width: 100%;
  }

  .user-box .background span{
    border-radius: 5px 5px 0 0;
    content: "";
    width: 100%;
    height: 100%;
    background: #8A2387;
    background: linear-gradient(to left, #F27121, #E94057, #8A2387);
    opacity: 0.3;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .user-box .background{
    width: 100%;
    height: 140px;
    position: relative;
    border-radius: 5px 5px 0 0;
    background-size: cover;
  }

  .left .user-box{
    background: #fff;
    border-radius: 5px;
    padding-bottom: 30px;
  }
  .artist-table{
    width: 100%;
  }
  .th-album{
    width: 15%;
  }
  .th-artist{
    width: 25%;
  }
  .th-name{
    width: 40%;
  }
  .th-index{
    width: 10%;
    text-align: center!important;
  }
  .artist-table thead th {
    padding: 0 9px;
    text-align: left;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item i {
    margin-right: 5px;
  }
  .tool-head .play-item{
    background: #fa2800!important;
    color: #fff!important;
  }
  .artist-box .tool-head .item{
    background: #f2f2f2;
    color: #333;
    padding: 7px 15px;
    border-radius: 50px;
    cursor: pointer;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
  }



  .artist-box .tool-head{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 15px 0;
  }

  .tab .line {
    width: 1px;
    height: 13px;
    background: #999;
    display: block;
    margin: 0 10px;
  }

  .tab span.active{
    color: #fa2800;
  }

  .tab span{
    font-size: 12px;
    cursor: pointer;
  }

  .flex-row span{
    font-weight: 100;
    color: #666;
    font-size: 12px;
  }

  .left{
    width: 340px;
    position: relative;
    margin-top: 40px;
    flex-shrink: 0;
  }


  .center{
    flex: 1;
    background: #fff;
    position: relative;
    margin-top: 40px;
    margin-right: 20px;
    border-radius: 5px;
    padding: 15px;
  }
  .shadow {
    background-color: #FFFFFF;
    box-shadow: 0px 5px 40px -1px rgba(2,10,18,0.1);
  }


  .personal-wrap .personal-main{
    display: flex;
    align-items: flex-start;
  }
  .container {
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }

  .personal-wrap .banner{
    width: 100%;
    height: 350px;
    background: url(../../assets/img/user/badolg.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
  .layer {
    position: relative;
  }

  .personal-wrap{
    margin-top: -20px;
  }
  .fluid{
    padding: 20px 0;
  }
  .sum{
    min-height: calc(100vh - 252px);
    z-index: 998;
    width: auto;
    min-width: 1024px;
    padding-top: 70px;
  }
</style>

<style scoped>
  .infovbb{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pause-btn {
    color: #fa2800;
    font-size: 30px;
    display: none;
    text-align: left;
    cursor: pointer;
  }
  .condition .pause-btn{
    display: block;
  }
  .condition .play-btn{
    display: none;
  }
  .condition .num{
    display: none;
  }
  .play-btn{
    color: #fa2800;
    font-size: 28px;
    text-align: left;
    cursor: pointer;
  }
  .info h2{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .artist-box .artist-table tbody tr:hover {
    background: #e8e9ed!important;
  }
  .artist-box .artist-table tbody tr:hover {
    background: #e8e9ed;
  }
  .singular{
    background: #f7f7f7!important;
  }
  .desc p {
    line-height: 1.6;
    font-weight: 400;
    flex: 1;
    font-size: 14px;
  }

  .ellipsis-two {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .comment ul li .info p{
    width: 100%;
    font-size: 12px;
    color: #666;
    line-height: 1.6;
    padding: 5px 10px;
    background: #f5f5f5;
    margin-top: 5px;
    border-radius: 3px;
  }
  .info h2 small{
    font-size: 12px;
    color: #a5a5c1;
    font-weight: 200;
  }
  .comment ul li .info{
    flex: 1;
  }
  .comment ul li .avatar img{
    width: 100%;
    border-radius: 50%;
  }
  .comment ul li .avatar{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
    cursor: pointer;
  }

  .comment ul li{
    padding: 10px 0;
    width: 100%;
    display: flex;
  }

  .related ul li .info:hover h2{
    color: #fa2800;
  }
  ul li .info span{
    font-size: 12px;
    color: #a5a5c1;
  }
  .info h2{
    font-size: 14px;
    margin-bottom: 10px;
    width: 100%;
    font-weight: 500;
  }
  .ppavatar img {
    width: 100%;
    border-radius: 3px;
  }
  ul li .ppavatar{
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin-right: 15px;
    flex-shrink: 0;
  }
  .related ul li{
    display: flex;
    margin-bottom: 15px;
    cursor: pointer;
  }
  .like ul li .avsum{
    width: 100%;
    border-radius: 3px;
  }
  .like ul li .avsum img{
    width: 100%;
    border-radius: 3px;
  }
  .like ul li{
    flex: 0 0 14.285714285714%;
    max-width: 14.285714285714%;
    padding: 0 5px 5px;
  }
  .like ul{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
  }

  .card-header{
    border-left: 3px solid #fa2800;
    height: 20px;
    padding-left: 1rem;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .right .like {
    padding-bottom: 5px;
  }

  .module{
    padding: 15px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .shadow {
    background-color: #FFFFFF;
    box-shadow: 0px 5px 40px -1px rgba(2 10 18 0.1);
  }

  .num{
    color: #4a4a4a;
    font-weight: 500;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  tr{
    height: 50px;
    line-height: 50px;
    transition: background-color 0.2s linear;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-image__inner {
    vertical-align: top;
    border-radius: 5px;
  }
  .el-image {
    width: 100%;
    height: 100%;
  }
  .name-container{
    display: flex;
    align-items: center;
  }
  .name-container .avatar{
    width: 35px;
    height: 35px;
    border-radius: 5px;
    flex-shrink: 0;
    margin-right: 10px;
  }

  td{
    padding: 0 9px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .th-duration{
    width: 15%;
    text-align: right;
    padding-right: 40px;
  }
  .th-album{
    width: 15%;
  }
  .th-artist{
    width: 25%;
  }
  .th-name{
    width: 40%;
  }
  .th-index{
    width: 10%;
    text-align: center!important;
  }
  .artist-table thead th {
    padding: 0 9px;
    text-align: left;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist-table thead{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fafafa;
    color: #999;
  }

  .artist-table{
    width: 100%;
  }
  .avatar span{
    content: '';
    width: 95%;
    height: 95%;
    background: rgba(0,0,0,0.2);
    display: block;
    position: absolute;
    top: 15px;
    right: -5px;
    z-index: 0;
    border-radius: 8px;
  }
  .tool-head{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 15px 0;
  }

  .play-item{
    background: #fa2800!important;
    color: #fff!important;
  }

  .item {
    padding: 10px 15px;
    border-radius: 50px;
    cursor: pointer;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
  }
  .item i{
    margin-right: 5px;
  }

  .content{
    margin-top: 20px;
  }
  .desc span{
    flex-shrink: 0;
    color: #fa2800;
    cursor: pointer;
  }
  .desc{
    display: flex;
    flex-direction: column;
    line-height: 1.6;
    margin-top: 15px;
  }
  .tag a{
    color: #fff;
    background: #fa2800;
    margin-right: 15px;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 15px;
  }
  .right{
    width: 350px;
    flex-shrink: 0;
  }
  .lisc{
    width: 100%;
    height: 100%;
    border-radius: 8px;
    position: relative;
  }
  .createTime{
    font-size: 14px;
    color: #808080;
  }
  .nickname{
    font-size: 14px;
    margin-right: 30px;
    cursor: pointer;
  }

  .user .avatar  {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    margin-right: 15px;
    cursor: pointer;
  }
  .user{
    margin-bottom: 15px;
  }
  .title{
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 20px;
    margin-top: 10px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 8px;
    position: relative;
    margin-right: 30px;
    flex-shrink: 0;
  }
  .top{
    display: flex;
  }
  .shadow {
    background-color: #FFFFFF;
    box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  }
  .playlist-detail{
    display: flex;
    align-items: flex-start;
  }
  .container {
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .fluid{
    padding: 20px 0;
  }
  .layout{
    width: 100%;
    min-height: calc(100vh - 252px);
    z-index: 998;
    width: auto;
    min-width: 1024px;
    padding-top: 70px;
  }


  .flex-row{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .avatars{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    margin-right: 15px;
    cursor: pointer;
  }
  .avatars img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
  }
</style>