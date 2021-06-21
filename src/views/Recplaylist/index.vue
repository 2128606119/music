<template>
  <div class="layout">
    <div class="fluid">
      <div class="playlist-detail container">
        <!--歌单详情-->
        <div class="left shadow">
          <!--歌单介绍-->
          <div class="top">
            <div class="avatar">
              <span></span>

              <img class="lisc" :src="detail.coverImgUrl+'?param=200y200'">
            </div>
            <div class="info">
              <div class="title flex-between"><span>{{detail.name}}</span></div>
              <div class="user flex-row">
                <div class="avatars">

                  <img :src="(detail.creator || {}).avatarUrl+'?param=100y100'">
                </div>

                <p class="nickname">{{(detail.creator || {}).nickname}}</p>
                <p class="createTime">{{time}}创建</p>
              </div>
              <div class="tag flex-row">
                标签：<a v-for="i in detail.tags">{{i}}</a>
              </div>
              <div class="desc">
                <p class="ellipsis-two">{{detail.description}}</p>
                <span class="flex-row" @click="allshow">
                  全部 <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
                </span>
              </div>
            </div>
          </div>
          <!--歌曲列表-->
          <div class="content">
            <div class="artist-box">
              <!--播放收藏-->
              <div class="tool-head">
                <div class="item play-item" @click="playAllSong">
                  <i class="iconfont niceOutlined_Play"></i> 播放全部
                </div>
                <div class="item"
                     :style="{background:collectcoll,color:collectcoll_1}"
                     :plain="true" @click="collect()">
                  <i class="iconfont niceicon-heart"></i>
                  {{ collectText }}
                </div>
              </div>

              <!--播放列表-->
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
                      v-for="(i,index) in detail.tracks"
                      @mouseover="selectStyle(index)"
                      @mouseout="outStyle()"
                  >
                    <!--序号-->
                    <td :class="{condition:index==punk}">
                      <div class="index-container flex-center">
                        <span class="num" v-show="inp!=index">{{index+1<10?'0'+(index+1):(index+1)}}</span>
                        <i class="iconfont nicebofang2 play-btn"
                           v-show="inp==index"
                           @click="transmit(i,index)"></i>
                        <i class="iconfont nicezanting1 pause-btn" @click="transmit_1"></i>
                      </div>
                    </td>

                    <!--歌曲  i.tracks-->
                    <td>
                      <div class="name-container">
                        <div class="avatar">
                          <div class="el-image">
                            <img class="el-image__inner" :src="i.al.picUrl+'?param=100y100'">

                          </div>
                        </div>
                        <p class="name ellipsis">{{i.name}}</p>
                      </div>
                    </td>
                    <!--歌手-->
                    <td>
                      <div class="artist-container">
                        <p class="author ellipsis">{{i.ar[0].name}}</p>
                      </div>
                    </td>
                    <!--专辑-->
                    <td>
                      <div class="album-container">
                        <p class="ellipsis">{{i.al.name}}</p>
                      </div>
                    </td>
                    <!--时长-->
                    <td>
                      <div class="duration-container">
                        <p>{{thilm(i.dt)}}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--信息提示-->
          </div>

        </div>
        <!--歌单动态-->
        <div class="right">
          <!--收藏者-->
          <div class="like module shadow">
            <div class="card-header flex-row">
              <span>喜欢这个歌单的人</span>
            </div>
            <ul>
              <li v-for="i in subscribers" @click="uids(i)">
                <div class="avsum">
                  <img
                          :src="i.avatarUrl+'?param=150y150'"
                          :alt="i.nickname"
                          :title="i.nickname"
                  >
                </div>
              </li>
            </ul>
          </div>
          <!--相关推荐-->
          <div class="related module shadow">
            <div class="card-header flex-row">
              <span>相关推荐</span>
            </div>
            <ul>
              <li v-for="i in playlists"  @click="toDetail(i)">

                <div class="ppavatar">
                  <img :src="i.coverImgUrl+'?param=150y150'"
                       :alt="i.creator.nickname"
                       :title="i.creator.nickname"
                  >
                </div>

                <div class="info infovbb">
                  <h2 class="ellipsis">
                    {{i.name}}
                  </h2>
                  <span>By. {{i.creator.nickname}}...</span>
                </div>
              </li>
            </ul>
          </div>
          <!--精彩品论-->
          <div class="comment module shadow">
            <div class="card-header flex-row">
              <span>精彩评论</span>
            </div>
            <ul>
              <li class="llpo" v-for="i in comments" @click="uids_1(i)">
              <div class="avatar">
                <img :src="i.user.avatarUrl+'?param=150y150'">
              </div>
              <div class="info">
                <h2>{{i.user.nickname}}<small> · 1小时前</small></h2>
                <p>{{i.content}}</p>
              </div>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*请求数据*/
  import {Songlist,
    Playlist,
    creator,
    comments,
    songurl,
    scgd
  } from 'network'
  import {time} from 'instrument'
  import instrument from 'instrument'
  export default {
    name: "index",
    data() {
      return {
        // 歌单详情
        detail:{},
        //歌曲收藏
        subscribers:{},
        //歌单推荐
        playlists:{},
        //歌单评论
        comments:{},
        //下标_1
        inp:- 1,
        //下标_2
        punk:-1,
        //下标_3
        punkse:-1,
        collectText: "收藏",
        collectcoll:'#f2f2f2',
        collectcoll_1:'#333'
      }
    },
    computed:{
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
        let sum = this.detail.tracks;
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
            let sum = this.detail.tracks;
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

    methods: {
      uids_1(res){
        this.$router.push("/user/"+res.user.userId)
      },
      /*跳转用户*/
      uids(res){
        this.$router.push("/user/"+res.userId)
      },
      /*跳转歌单*/
      toDetail(ser){
        this.$router.push("/Recplaylist/"+ser.id)
        location.reload();
      },
      /*收藏*/
      scf(i, id, sun,sun_1) {
        scgd(i, id).then(res => {
          if (res.code == 200) {

            this.collectText =sun_1

            this.$message({
              message: sun,
              type: 'success'
            });
          } else {
            this.$message.error('出现异常');
          }
        })
      },
      collect(){
      if(window.localStorage.getItem('userId')!=null){
        if(this.collectText=='取消收藏'){
         this.scf(2,this.$route.params.Recid,'取消收藏成功','收藏')
          this.collectcoll='#f2f2f2'
          this.collectcoll_1='#333'
        }
        if(this.collectText=='收藏'){
          this.scf(1,this.$route.params.Recid,'收藏成功','取消收藏')
          this.collectcoll='#fa2800'
          this.collectcoll_1='#fff'
        }
      }else {
        this.$message.error('登录都没有  还想收藏');
      }
      },

      fklo(res){
        for(let j=0;j<this.$store.state.playList.length;j++){
          if(this.$store.state.playList[j].SongID==res.SongID){
            return false
          }
        }
        return true
      },

      /*暂停*/
      transmit_1(){
        this.punk=-1
        this.$store.commit('updatecoun', false)
      },
      /*播放*/
      transmit(i,index){
        if (this.$store.state.MusicID != i.id) {
              this.$store.commit('sjcxs' ,new Date().getTime())
              this.punk=index
              this.punkse=index
              /*存储歌曲详情*/
              const DetailsSong={
                /*歌曲封面*/
                SongCover:i.al.picUrl,
                /*歌曲名*/
                songname:i.name,
                /*作者*/
                name:i.ar[0].name,
                /*歌曲时长*/
                songtime:i.dt
              }
              this.$store.commit('DetailsSongxs', DetailsSong)
              /*播放列表存储*/
              const DetailsSong_1={
                DetailsSong,
                /*歌曲名*/
                songname:i.name,
                /*歌曲ID*/
                SongID:i.id,
                /*下标*/
                index:index
              }
              if(this.fklo(DetailsSong_1)){
                this.$store.commit("playListxs",DetailsSong_1)
              }
              /*控制播放*/
              this.$store.commit('updatecoun', true)
              this.$store.commit('playmusic', i.id)
              songurl(i.id).then(res=>{
                  this.$store.commit('updateURL', res.data[0].url)
              })
            }
        else{
              this.$store.commit('updatecoun', true)
              this.punk=index
              this.punkse=index
            }
      },
      selectStyle(i){
         this.inp=i
      },
      outStyle(){
        this.inp=-1
      },
      thilm(res){
        let i=instrument.formatSecond(res)
        let j=instrument.formatSecondTime(i)
        return  j
      },
      allshow(){
        this.$alert(this.detail.description, '全部介绍', {
          confirmButtonText: '确定'
        })
      },
      playAllSong(){
        this.transmit(this.detail.tracks[0],0);
      }




    },
    created() {
      /*请求数据*/
      /*歌单详情*/
      Playlist(this.$route.params.Recid).then(res=>{
        this.detail=res.playlist
        console.log(this.detail)
      });
      /*歌单收藏*/
      Songlist(this.$route.params.Recid).then(res=>{
        this.subscribers=res.subscribers
      });
      /*歌单推荐*/
      creator(this.$route.params.Recid).then(res=>{
        this.playlists=res.playlists
      });
      /*歌单评论*/
      comments(this.$route.params.Recid).then(res=>{
        this.comments=res.comments
      })
    }
  }
</script>

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
.left{
  flex: 1;
  width: 950px;
  padding: 15px;
  border-radius: 8px;
  margin-right: 20px;
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