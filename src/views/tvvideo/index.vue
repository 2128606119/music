<template>
  <div class="sum">
    <div class="fluid">
      <div class="playlist-wrap container">
        <!--分类-->
        <div class="filter shadow">
          <!--全部分类-->
          <div class="title flex-center" @click="classifyshow=!classifyshow">
            {{classification}}
            <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
            <span class="span_1"></span>
          </div>
          <div v-show="classifyshow" class="filter-box shadow">
            <div class="item">
              <ul>
                <li @click="lalap(j.id,j.name,index)"
                    v-for="(j,index) in typeList">{{j.name}}</li>
              </ul>
            </div>
          </div>
          <!--热门分类-->
          <div class="hot-tag flex-row">
            <p>热门标签：</p>
            <ul class="flex-center">
              <li v-for="(i,index) in rmecatlist"
                  @click="tally(i.id,i.name,index)" :class="{active:indexs==index&&indexs!=-1}"
              >{{i.name}}</li>
            </ul>
          </div>
          <!--全部-->
          <div class="all" @click="all">全部</div>
        </div>
        <!--视频列表-->
        <div v-loading="loading" class="mv-box">
          <ul class="mv-list">
            <li v-for="i in abbrsum" >
              <div class="cover" @click="skip(i)">
                <div class="image">
                  <div class="el-image">
                    <img :src="i.data.coverUrl+'?param=325y197'">
                  </div>
                </div>
                <div class="count">
                  <i class="arrow"></i>
                  <span>{{countnnk(city(i))}}</span>
                    <span class="span_2"></span>
                </div>
                <div class="action">
                  <button class="play flex-center">
                    <i class="iconfont nicebofang1"></i>
                  </button>
                </div>
                <div class="foot">
                  <p>{{nickname(i)}}</p>
                  <p>{{i.data.playTime}}</p>
                </div>
              </div>
              <div class="info">
                <h2 class="title ellipsis">
                  {{i.data.title}}
                </h2>
              </div>
            </li>
          </ul>
        </div>
        <!--上下页-->
        <div class="page flex-center">
          <button :class="{disppa:pianyi==0}" class="btn flex-center trainsition" @click="top"> 上一页 </button>
          <button class="btn flex-center trainsition" @click="buttom"> 下一页 </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from 'instrument'
  import {getavka,getavkb,getVideoAll,getVideoOther} from 'network'
  export default {
    name: "index",
    data(){
      return{
        loading:true,
        classification:'全部',
        classifyshow:false,
        typeList:{},
        classify:{},
        rmecatlist:{},
        abbrsum:{},
        indexs:-1,
        id:-1,
        pianyi:0,
        countts:{}
      }
    },
    methods:{
      skip(i){
        this.$router.push('videodetails/'+i.data.vid)
      },
      nickname(i){
        return (i.data.creator || {}).nickname
      },
      city(i){
        return (i.data.creator || {}).city
      },
      countnnk(i){
        return util.tranNumber(i,2)
      },
      top(){
        if(this.pianyi>0){
          this.pianyi=this.pianyi-1
        }
      },
      buttom(){
        this.pianyi=this.pianyi+1
      },
      lalap(id,name,i){
        this.classification=name
        this.classifyshow=!this.classifyshow
        this.id=id
        this.indexs=-1
      },
      tally(id,name,i){
        // console.log(id)
        this.indexs=i
        this.classification=name
        this.id=id
      },
      all(){
        this.indexs=-1
        this.classification='全部'
      }
    },
    watch:{
      classification(z){
        this.loading=true
        this.pianyi=0
        if(z=='全部'){
          getVideoAll(this.pianyi).then(res=>{
            if(res==undefined){
              this.$router.replace("/login/true")
            }else {
              this.abbrsum=res.datas
              this.loading=false
            }
          })
        }
        else {
          getVideoOther(this.id,this.pianyi).then(res=>{
            this.abbrsum=res.datas
            this.loading=false
          })
        }
      },
      pianyi(z){
        this.loading=true
        if(this.classification=='全部'){
          getVideoAll(this.pianyi).then(res=>{
            if(res==undefined){
              this.$router.replace("/login/true")
            }else {
              this.abbrsum=res.datas
              this.loading=false
            }
          })
        }
        else {
          getVideoOther(this.id,this.pianyi).then(res=>{
            this.abbrsum=res.datas
            this.loading=false
          })
        }
      }
    },
    created() {
      /*全部标签*/
      getavka().then(res=>{
        this.typeList=res.data
      })
      getavkb().then(res=>{
        if(res==undefined){
          this.$router.replace("/login/true")
        }else {
          this.rmecatlist=res.data
          this.id=this.rmecatlist[0].id
        }
      })
      getVideoAll(this.pianyi).then(res=>{
        if(res==undefined){
          this.$router.replace("/login/true")
        }else {
          this.abbrsum=res.datas
          this.loading=false
        }
      })
    }
  }
</script>

<style scoped>
   .disppa {
    color: #fff!important;
    background-color: #fab6b6!important;
    border-color: #fab6b6!important;
  }

   .page .btn {
    padding: 7px 10px;
    border-radius: 3px;
    background: #fa2800;
    color: #fff;
    margin: 0 10px;
    cursor: pointer;
    border: 0;
  }

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
  .all{
    background: #fa2800!important;
    color: #fff!important;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 3px;
    transition: all .4s;
    cursor: pointer;
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

  .item{
    margin-bottom: 20px;
  }
  .filter-box {
    width: 720px;
    height: 400px;
    overflow-y: scroll;
    background: #fff;
    border-radius: 5px;
    color: #000;
    position: absolute;
    top: 140px;
    z-index: 100;
    padding: 15px 10px 0 16px;
  }

  .active{
    color: #fa2800;
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
  .filter .hot-tag{
    flex: 1;
  }

  .flex-row {
    flex-direction: row;
  }
  .flex-row {
    display: flex;
    align-items: center;
  }

  .span_1{
    content: "";
    width: 1px;
    height: 20px;
    margin-left: 12px;
    background: #e7e7e7;
    opacity: 0;
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

  .playlist-wrap .filter {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 20px;
    border-radius: 5px 0 5px 5px;
  }

  .shadow {
    background-color: #fff;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,0.1);
  }

  .container {
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .fluid{
    min-height: 100%;
    padding: 20px 0;
  }
  .sum{
    min-height: calc(100vh - 65px);
    z-index: 998;
    width: auto;
    min-width: 1024px;
    padding-top: 70px;
  }
</style>