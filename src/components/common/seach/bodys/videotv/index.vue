<template>
  <div class="sum">
    <div class="fluid">
      <div class="playlist-wrap container">
        <div v-loading="loading" class="mv-box">
          <ul class="mv-list">
            <li v-for="i in abbrsum" v-if="i.type==1">
              <div class="cover" @click="skip(i)">
                <div class="image">
                  <div class="el-image">
                    <img :src="i.coverUrl+'?param=325y197'">
                  </div>
                </div>
                <div class="count">
                  <i class="arrow"></i>
                  <span>{{i.durationms}}</span>
                  <span class="span_2"></span>
                </div>
                <div class="action">
                  <button class="play flex-center">
                    <i class="iconfont nicebofang1"></i>
                  </button>
                </div>
              </div>
              <div class="info">
                <h2 class="title ellipsis">
                  {{i.title}}
                </h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {seek} from 'network'
  export default {
    name: "index",
    data(){
      return{
        abbrsum:{},
        loading:true
      }
    },
    methods:{
      nickname(i){
        return (i.data.creator || {}).nickname
      },
      skip(i){
        window.location.assign("http://localhost:8080/videodetails/"+i.vid)
      },
      countnnk(i){
        return util.tranNumber(i,2)
      },
      city(i){
        return (i.data.creator || {}).city
      },
    },
    created() {
      let data=this.$route.params.myid
      seek(data,1014).then(res=>{
        console.log(res)
        this.abbrsum=res.result.videos
        console.log(this.abbrsum)
        this.loading=false
      });
    }
  }
</script>

<style scoped>

  .play {
    font-size: 100%;
    outline: none;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    background-color: #fa2800;
  }

  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center {
    justify-content: center;
  }

  .mv-list li .cover:hover .action {
    display: flex;
  }
  .action {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);}
  .title {
    font-size: 14px;
    font-weight: 500;
    display: block;
    line-height: 1.3;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info{
    margin-top: 15px;
  }
  .foot p{
    color: #fff;
  }
  .foot{
    width: 100%;
    height: 35px;
    background: rgba(0,0,0,.6);
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }

  .span_2{
    content: "";
    position: absolute;
    right: -14px;
    top: 0;
    width: 14px;
    height: 24px;
    background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
    background-size: cover;
  }
  .count{
    position: absolute;
    right: 16px;
    top: 1px;
    height: 24px;
    padding-left: 9px;
    background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
    background-size: cover;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mv-list li{
    padding: 0 15px 30px;
    flex: 0 0 25%;
    max-width: 25%;
  }
  .el-image {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  .image{
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
  .cover{
    position: relative;
    z-index: 2;
    padding-top: 56%;
    border-radius: 2px;
    background-color: #000;
  }

  .mv-box .mv-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 -15px;
  }
  .mv-box{
    padding: 15px 0;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ababab;
    border-radius: 10px;
  }

  .item ul li:hover {
    color: #fff;
    background: #fa2800;
  }
  .item ul li {
    padding: 8px 18px;
    background: #f7f7f7;
    border-radius: 16px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    font-size: 12px;
    color: #161e27;
    transition: all .4s;
  }
  .item ul {
    display: flex;
    flex-wrap: wrap;
  }

  .item h2 i{
    font-size: 18px;
    margin-right: 5px;
    margin-top: -1px;
  }
  .item h2{
    display: flex;
    align-items: center;
    font-size: 15px;
    margin-bottom: 15px;
    color: #161e27;
    font-weight: 500;
  }
  .flex-center li{
    margin: 0 5px;
    padding-right: 10px;
    cursor: pointer;
  }
  .flex-center{
    display: flex;
    align-items: center;
  }

  .title>i{
    transform: rotate(90deg);
    margin-left: 10px;
    font-size: 18px;
  }
  .filter .title{
    width: auto;
    height: 100%;
    padding: 0 5px 0 15px;
    background: #fa2800;
    border-radius: 5px 0 5px 5px;
    color: #fff;
    cursor: pointer;
    margin-right: 15px;
    position: relative;
  }

  .flex-center {
    display: flex;
    align-items: center;
  }
  .container {
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .fluid{
    min-height: 100%;
  }
  .sum{
    min-height: calc(100vh - 65px);
    z-index: 998;
    width: auto;
    min-width: 1024px;
  }
</style>