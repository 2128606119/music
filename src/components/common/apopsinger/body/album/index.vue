<template>
  <div class="content">
    <div class="album-box">
      <ul class="album-list flex-row">
        <li v-for="i in sum.hotAlbums">
          <!--专辑图片-->
          <div class="wrapper" @click="tiao(i)" >
            <div class="cover" style="border-radius: 5px">
              <div class="image" style="border-radius: 5px">
                <div class="el-image" style="border-radius: 5px">
                  <img :src="i.blurPicUrl+'?param=300y300'" style="border-radius: 5px">
                </div>
              </div>
            </div>
            <span class="span_1"></span>
          </div>
          <!--专辑介绍-->
          <div class="info">
            <div class="name ellipsis">{{i.name}}</div>
            <div class="author">{{zuozhe(i.artists)}}</div>
            <div class="time author">{{day(i.publishTime)}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Singeralbum} from 'network'
  import {time} from 'instrument'
  export default {
    name: "index",
    data(){
      return{
        sum:{}
      }
    },
    methods:{
      tiao(res){
        console.log(res)
      },
      day(res){
        return time(res)
      },
      zuozhe(res){
        let name=''
        for(let i=0;i<res.length-1;i++){
          name=name+res[i].name+'/'
        }
        name=name+res[res.length-1].name
        return name
      }
    },
    created() {
      console.log(this.$store.state.Albumnumber.count)
      Singeralbum(this.$route.params.singerid,this.$store.state.Albumnumber.count).then(res=>{
       this.sum=res
      })
    }
  }
</script>

<style scoped>
  .info{
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
 .author {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
 .author{
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
  .name{
    font-weight: 700;
    line-height: 18px;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

   li .info{
    margin-top: 15px;
  }

  .wrapper:hover .span_1{
    right:0px!important;
  }

  .span_1{
    content: '';
    position: absolute;
    z-index: 1;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    padding-top: 100%;
    background-color: #000;
    border-radius: 50%;
    transition: all 0.4s;
  }
  .el-image {
    width: 100%;
    height: 100%;
  }
   .el-image {
     position: relative;
     display: inline-block;
     overflow: hidden;
   }

  li .wrapper .cover .image {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  li .wrapper .cover{
    position: relative;
    z-index: 2;
    padding-top: 100%;
    border-radius: 2px;
    background-color: #d9d9d9;
  }
  li .wrapper{
    position: relative;
    padding-right: 10px;
    overflow: hidden;
  }
  .album-box .album-list{
    flex-wrap: wrap;
  }
   .flex-row {
     display: flex;
     flex-direction: row;
     align-items: center;
   }
  .album-box {
    padding: 15px 0;
  }
  .album-list li{
    padding: 0 15px 30px;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
    cursor: pointer;
  }
</style>