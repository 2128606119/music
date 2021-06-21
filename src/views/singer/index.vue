<template>
  <div class="sum">
    <div class="fluid">
      <div class="singer-wrap container">
        <!--搜索分类-->
        <div class="filter">
          <ul class="tag-lang">
            <li v-for="(i,index) in allarea"
                @click="clickarea(i.area,index)"
                :class="{areas:areaindex==index}"
            >{{i.name}}</li>
          </ul>
          <ul class="tag-lang">
            <li v-for="(i,index) in alltype"
                @click="clicktype(i.type,index)"
                :class="{areas:typeindex==index}"
            >{{i.name}}</li>
          </ul>
          <ul class="tag-lang">
            <li v-for="(i,index) in allinitial"
                @click="clickallinitial(i,index)"
                :class="{areas:initialindex==index,vbcn:i=='热门'}"
            >{{i}}</li>
          </ul>
        </div>

        <!--歌手展示-->
        <actonfp @scroll-state="load">
          <ul class="singer-list">
            <li v-for="i in artists" class="infinite-list-item">
              <div class="cover" @click="vbn(i.id)">
                <div class="image">
                  <div class="el-image">
                  <img  :src="i.picUrl+'?param=200y200y'">
                  </div>
                </div>
              </div>
              <div class="info">
                <p class="name">{{i.name}}</p>
                <p class="count">单曲数{{i.musicSize}}</p>
              </div>
            </li>
          </ul>
        </actonfp>

        <!--加载-->
        <div v-if="loading">
          <loades></loades>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import actonfp from 'components/common/actonfp'
  import loades from 'components/common/loades'
  import {getSingerList} from 'network'
  export default {
    name: "index",
    data(){
      return{
        loading:false,
        /*分类列表*/
        allarea:[
          {
            area:-1,
            name:'全部'
          },
          {
            area:7,
            name:'华语'
          },
          {
            area:96,
            name:'欧美'
          },
          {
            area:8,
            name:'日本'
          },
          {
            area:16,
            name:'韩国'
          },
          {
            area:0,
            name:'其他'
          }
        ],
        alltype:[
          {
            type:-1,
            name:'全部'
          },
          {
            type:1,
            name:'男歌手'
          },
          {
            type:2,
            name:'女歌手'
          },
          {
            type:3,
            name:'乐队'
          }
        ],
        allinitial:{},
        /*歌手列表*/
        artists:[],
        /*分类数据*/
        area:-1,
        type:-1,
        initial:'-1',
        /*搜索偏移*/
        offset:0,
        /*分类下表*/
        areaindex:0,
        typeindex:0,
        initialindex:0
      }
    },
    components:{
      loades,
      actonfp
    },
    methods:{
      load(){
        this.loading=true
        let i=this.offset+40
        this.offset=i
        var sum ={
          initial:this.initial,
          offset:this.offset,
          type:this.type,
          area:this.area
        }
        getSingerList(sum).then(res=> {
          let c = this.artists.concat(res.artists)
          this.artists = c
          console.log(this.artists)
          this.loading=false
        })
      },
      vbn(z){
        this.$router.push("apopsinger/"+z)
      },
      allartists(){
        var sum ={
          initial:this.initial,
          offset:this.offset,
          type:this.type,
          area:this.area
        }
        getSingerList(sum).then(res=>{
          this.artists=res.artists
          console.log(this.artists)
        })
      },
      clickarea(z,i){
        this.offset=0
        this.area=z
        this.areaindex=i
        this.allartists()
      },
      clicktype(z,i){
        this.offset=0
        this.type=z
        this.typeindex=i
        this.allartists()
      },
      clickallinitial(z,i){
        this.offset=0
        if(z=='热门'){
          this.initial='-1'
        }else if(z=='其他'){
          this.initial='0'
        }else {
          this.initial=z
        }
        this.initialindex=i
        this.allartists()
      }
    },
    created() {
      this.loading=true
      let sum_1="热门-A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z-其他"
      this.allinitial=sum_1.split('-')
      var sum ={
        initial:this.initial,
        offset:this.offset,
        type:this.type,
        area:this.area
      }
      getSingerList(sum).then(res=>{
        this.artists=res.artists
        console.log(this.artists)
        // this.loading=false
      })
    }
  }
</script>

<style scoped>

  .el-image {
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  .singer-list li{
    padding: 0 15px 30px;
    flex: 0 0 10%;
    max-width: 10%;
  }
  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 30px -15px 0;
  }
  li .cover .image{
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  li .cover{
    position: relative;
    z-index: 2;
    padding-top: 100%;
    border-radius: 50%;
    background-color: #d9d9d9;
  }
  /*.image-slot{*/
  /*  background: #F5F7FA;*/
  /*  text-align: center;*/
  /*  font-size: 14px;*/
  /*  color: #C0C4CC;*/
  /*}*/
  .count {
    font-size: 12px;
    margin-top: 10px;
    color: #fa2800;
  }
  .name {
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    word-break: break-word;
  }
  .info {
    margin-top: 15px;
    text-align: center;
  }
  .cover {
    position: relative;
    z-index: 2;
    padding-top: 100%;
    border-radius: 50%;
    background-color: #d9d9d9;
  }
  .image {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
<style scoped>
  .loading span {
    margin-top: -30px;
    font-size: 12px;
  }

  .vbcn{
    width: 87px!important;
  }
  .areas:hover{
    color: rgb(255, 255, 255)!important;
    background: rgb(250, 40, 0)!important;
  }
  .filter li:hover {
    color: rgb(250, 40, 0);
    transition: all 0.4s ease 0s;
  }

 .filter  li {
    width: 56px;
    height: 28px;
    line-height: 29px;
    font-size: 13px;
    text-align: center;
    cursor: pointer;
    margin-right: 6px;
    border-radius: 14px;
  }

  .areas{
    transition: all 0.4s ease 0s;
    font-weight: 700;
    color: rgb(255, 255, 255);
    background: rgb(250, 40, 0);
  }
  .tag-lang{
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .singer-wrap{
    margin-top: -20px;
  }
   .container {
     max-width: 1200px;
     width: 100%;
     margin-right: auto;
     margin-left: auto;
   }

  .sum{
    min-height: calc(100vh - 65px);
    z-index: 998;
    width: auto;
    min-width: 1024px;
    padding-top: 70px;
  }
  .fluid{
    min-height: 100%;
    padding: 20px 0px;}
</style>