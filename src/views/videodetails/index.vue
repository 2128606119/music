<template>
  <div class="layout">
    <div class="fluid">
      <div class="video-detail container">
        <!--视频-->
        <div class="left shadow">
          <!--视频播放器-->
          <div class="video-container">
            <video :src="Playturl"
                   controls="controls"
                   autoplay="autoplay"
                   controlslist="nodownload">
            </video>
          </div>
          <!--视频简介-->
          <div class="video-foot">
            <!--标题-->
            <h4 class="title flex-row">{{details.title}}</h4>
            <!--标签-->
            <div class="tag">
              <a v-for="i in details.videoGroup">#{{i.name}}</a>
            </div>
            <!--日期播放次数-->
            <p class="flex-row">
              <span>发布：{{items(details.publishTime)}}</span>
              <span>播放次数：{{details.playTime}}</span>
            </p>
            <div class="follow">
              <div class="box">
                <i data-v-eb357822="" class="iconfont nicexihuan3 icon-like"></i>
                {{details.praisedCount}}
              </div>
              <div class="box">
                <i data-v-eb357822="" class="iconfont niceshoucang2 icon-collection"></i>
                {{details.subscribeCount}}
              </div>
              <div class="box">
                <i data-v-eb357822="" class="iconfont nicefenxiang2 icon-share"></i>
                {{details.shareCount}}
              </div>
            </div>
          </div>
          <!--评论-->
          <div class="comments">
            <div class="title flex-row">
              <i  class="iconfont nicepinglun"></i>
              Comments |
              <span class="noticom">
                <a data-v-eb357822="">
                  {{details.commentCount}} 条评论</a>
              </span>
            </div>
            <div class="comment-box">
              <p class="flex-row">
                <span>
                <i data-v-50697e87="" class="iconfont niceuser"></i>
                  {{namekico}}，你好
                </span>
              </p>
              <div class="comment-form">
                <div class="avatar">
                  <img :src="mourl" :title="namekico">
                </div>
                <div class="comarea">
                <textarea
                        v-model="test"
                        placeholder="你看什么看！"
                        tabindex="4"
                        cols="50"
                        rows="5">
                </textarea>
                </div>
              </div>
              <div class="comment-foot flex-between">
                <div class="smile">
                </div>
                <button  type="button" class="comment-btn transition" @click="pinlun"> 评论 </button>
              </div>
            </div>
            <div class="comment-list">
              <h3>精彩评论</h3>
              <ul>
                <li class="item" v-for="i in comments">
                  <div class="avatar">
                    <img :src="i.user.avatarUrl+'?param=150y150'" :alt="i.user.nickname" :title="i.user.nickname">
                  </div>
                  <div class="info">
                    <h2 class="flex-between">
                      <span>
                        {{i.user.nickname}}
                        <small> · {{datannnk(i.time)}}</small>
                      </span>
                      <div class="tool flex-row">
                        <i  class="iconfont nicezan1 icon-zan"></i>
                        <span>({{i.likedCount}})</span>
                        <i class="iconfont nicevoice icon-comment"></i>
                      </div>
                    </h2>
                    <div class="content">{{i.content}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="right">
          <!--视频介绍-->
          <div class="profile module shadow">
            <div class="card-header flex-row">
              <span>视频简介</span>
            </div>
            <div class="content">
              <div class="author">
                <div class="avatar">
                  <img :src="avatarUrl">
                </div>
                <p class="nikname">{{nickname}}</p>
              </div>
              <p>{{details.title}}</p>
            </div>
          </div>
          <!--相关推荐-->
          <div class="related module shadow">
            <div class="card-header flex-row">
              <span>相关推荐</span>
            </div>
            <ul>
              <li v-for="i in getRted">
                <div class="llp" @click="tiaoz(i.vid)">
                  <img :src="i.coverUrl" :alt="i.title" :title="i.title">
                  <div class="actionmm">
                    <button title="播放" class="play flex-center">
                      <i style="font-size: 12px;" class="iconfont nicebofang1"></i>
                    </button>
                  </div>
                </div>
                <div class="info">
                  <h2 class="ellipsis">{{i.title}}</h2>
                  <span style="font-size: 12px;color: #a5a5c1;">By. {{i.creator[0].userName}}</span>
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
  import {Thevideodetails,
    Broadcastaddress,
    getcomments,
    getVideoRelatedspou,
    faoncomment
  } from 'network'
  import {time} from 'instrument'
  import util from 'instrument'
  export default {
    name: "index",
    data(){
      return{
        test:'',
        details:{},
        Playturl:'',
        comments:{},
        getRted:{},

      }
    },
    computed:{
      namekico(){
        return window.localStorage.getItem('cookie')
      },
      mourl(){
        return window.localStorage.getItem('avatarUrl')
      },
      nickname(){
        return (this.details.creator|| {}).nickname
      },
      avatarUrl(){
        return (this.details.creator|| {}).avatarUrl
      }
    },
    methods:{
      pinlun(){

        if(this.test.length!=0){

          faoncomment(this.$route.params.vid,this.test).then(res=>{
            // this.comments.unshift(res)
            console.log(res)
            this.$message({
              showClose: true,
              message: '提交成功！',
              type: 'success'
            });
            getcomments(this.$route.params.vid,0,20).then(res=>{
              console.log(res)
              this.comments=res.comments
            })
            this.test=""
          })
        }else {
          this.$message({
            showClose: true,
            message: '什么都没写，你点毛',
            type: 'error'
          });
        }
      },
      tiaoz(i){
        window.location.href=i
      },
      datannnk(i){
        if(util.dateDiff(time(i),util.datatimef(),"D天前")=="D天前"){
          return "刚刚"
        }
        return util.dateDiff(time(i),util.datatimef(),"D天前")
      },
      items(i){
        return time(i)
      }
    },
    created() {
      /*视频详情*/
      Thevideodetails(this.$route.params.vid).then(res=>{
        this.details=res.data
      })
      /*获取视频播放地址*/
      Broadcastaddress(this.$route.params.vid).then(res=>{
        this.Playturl=res.urls[0].url
      })
      /*获取视频评论*/
      getcomments(this.$route.params.vid,0,20).then(res=>{
        this.comments=res.comments
      })
      /*获取相关推荐视频*/
      getVideoRelatedspou(this.$route.params.vid).then(res=>{
        this.getRted=res.data
      })
    }
  }
</script>

<style scoped>
  .info h2{
    font-size: 14px;
    margin-bottom: 3px;
    margin-top: 5px;
    width: 100%;
    min-height: 20px;
    font-weight: 500;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .related ul li .info{
    height: 50px;
    width: calc(100% - 50px);
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
   .actionmm .play {
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    background-color: #fa2800;
  }

  .flex-between, .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center {
    justify-content: center;
  }

  .actionmm {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
   .related ul li:hover .actionmm {
    display: flex;
  }
  .actionmm {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .related ul li .llp {
    width: 100%;
    margin-right: 15px;
    flex-shrink: 0;
    position: relative;
  }
   .related ul li {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  .related{
    padding-bottom: 5px;
  }
  .nikname{
    flex: 1;
    cursor: pointer;
  }
  .author .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  .author .avatar{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 15px;
    cursor: pointer;
  }
  .profile .author{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 5px;
  }
  .right .card-header {
    border-left: 3px solid #fa2800;
    height: 20px;
    padding-left: 1rem;
    margin-bottom: 15px;
    font-weight: 700;
  }
   .right .module{
    padding: 15px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .shadow {
    background-color: #fff;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,0.1);
  }

  .tool i {
    font-size: 24px;
    font-weight: 100;
    margin-left: 20px;
    cursor: pointer;
    transition: all .4s;
  }
  .flex-between, .flex-center {
    display: flex;
    align-items: center;
  }
  .tool span:after {
    content: "";
    width: 1px;
    height: 13px;
    background: #4a4a4a;
    opacity: .7;
    position: absolute;
    top: 2px;
    right: -12px;
  }
  .info h2 .tool span{
    font-size: 12px;
    margin-top: 2px;
    color: #666;
    font-weight: 200;
    position: relative;
  }
  .info h2 .tool i {
    font-size: 24px;
    font-weight: 100;
    margin-left: 20px;
    cursor: pointer;
    transition: all .4s;
  }
   .info .content {
    width: 100%;
    font-size: 12px;
    color: #4a4a4a;
    line-height: 1.6;
    padding: 8px 10px;
    background: #f5f5f5;
    margin-top: 5px;
    border-radius: 3px;
  }
  .info h2 small {
    font-size: 12px;
    color: #a5a5c1;
    font-weight: 200;
  }
  .comment-list ul li .info h2 {
    font-size: 15px;
    margin-right: 5px;
    margin-bottom: 10px;
  }
  .comment-list ul li .info{
    flex: 1;
  }
  .avatar img {
    width: 100%;
    border-radius: 50%;
  }
  .comment-list ul li .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
  }
  .comment-list ul li {
    padding: 10px 0;
    width: 100%;
    display: flex;
  }
  .comment-list{
    margin-top: 20px;
  }
  .flex-between {
    justify-content: space-between;
  }
  .comment-foot .comment-btn {
    color: #fff;
    padding: 10px 30px;
    font-size: .75rem;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    outline: none;
    background: #ff416c;
    background: linear-gradient(
            90deg
            ,#ff4b2b,#ff416c);
    float: right;
  }
  .comment-foot{
    margin-top: 15px;
  }
  textarea{
    width: 100%;
    outline: none;
    background: #f8f9ff;
    resize: none;
    padding: 6px 12px;
    color: #666;
    border: 1px solid #eaebff;
    border-radius: 3px;
    font-size: 13px;
    height: 80px;
  }
  .comarea{
    flex: 1;
  }
  .avatar img {
    width: 100%;
    border-radius: 3px;
  }
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin-right: 20px;
    position: relative;
    flex-shrink: 0;
  }
  .comment-form {
    display: flex;
    margin-top: 1.5em;
  }

  p i {
    margin-right: 10px;
  }
  p span{
    flex: 1;
  }
  .comment-box {
    margin-top: 20px;
  }
  a{
    transition: color .3s;
  }
  a:active, a:hover {
    text-decoration: none;
    outline: 0;
  }
  a:hover {
    color: #40a9ff;
  }
  .title span {
    margin-left: 5px;
  }
  .title i {
    color: #666;
    font-size: 18px;
    margin-right: 10px;
  }

  .video-detail .left .comments .title {
    width: 100%;
    height: 50px;
    border-radius: 3px;
    padding: 0 3px;
    border-bottom: 1px solid #f1f1f1;
  }

  .video-detail .left .title{
    margin-bottom: 10px;
    position: relative;
  }
  .flex-row {
    flex-direction: row;
  }
   .flex-row {
    display: flex;
    align-items: center;
  }
  .comments {
    margin-top: 25px;
  }
  .box i {
    font-size: 26px;
    color: #161e27;
  }
  .box{
    width: auto;
    border-radius: 15px;
    padding: 0 15px;
    background: #f2f2f2;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #161e27;
    cursor: pointer;
  }
  .follow{
    display: flex;
    margin-top: 10px;
  }

  .right{
    width: 350px;
    flex-shrink: 0;
  }
  .video-foot p span{
    margin-right: 30px;
    font-size: 12px;
    color: #999;
  }
   .tag a{
    font-size: 12px;
    color: #fa2800;
    margin-right: 10px;
    cursor: pointer;
  }
  .tag{
    margin-bottom: 8px;
  }
  .title {
    margin-bottom: 10px;
    position: relative;
  }

  .flex-row {
    flex-direction: row;
  }
  .flex-row {
    display: flex;
    align-items: center;
  }
  h2 {
    font-size: 16px;
  }
  .video-foot{
    margin-top: 8px;
  }

  .video-container video{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
  }
  .video-container {
    position: relative;
    padding-top: 56.25%;
  }
  .video-detail .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
  }

  .shadow {
    background-color: #fff;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,0.1);
  }

  .video-detail{
    display: flex;
  }

  .container {
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .layout .fluid {
    min-height: 100%;
    padding: 20px 0;
  }
  .layout {
    width: 100%;
    min-height: calc(100vh - 65px);
    z-index: 998;
    width: auto;
    min-width: 1024px;
    padding-top: 70px;
  }
</style>