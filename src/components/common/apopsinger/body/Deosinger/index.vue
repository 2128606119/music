<template>
  <div class="info-box">
    <!--歌手名-->
    <h2 class="title">
      {{this.$store.state.Albumnumber.name}}简介
      <span></span>
    </h2>
    <!--介绍-->
    <div class="profile">
      {{sum.briefDesc}}
    </div>
    <!--成就-->
    <div class="introduction">
      <div class="item" v-for="i in sum.introduction">
        <h3 class="sub-title">{{i.ti}}</h3>
        <p v-html="i.txt.replace(/(\r\n|\n|\r)/gm, '<br />')"></p>
      </div>
    </div>

  </div>
</template>

<script>
  import {Dofsinger} from 'network'
  export default {
    name: "index",
    data(){
      return{
        sum:{}
      }
    },
    created() {
      Dofsinger(this.$route.params.singerid).then(res=>{
        console.log(res)
        this.sum=res
      })
    }
  }
</script>

<style scoped>
  .item p{
    line-height: 1.7;
  }

  .item .sub-title{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .introduction .item {
    margin-bottom: 15px;
  }
  .profile{
    line-height: 1.7;
    margin-bottom: 20px;
    text-align: center;
  }
  .title span{
    content: '';
    width: 40px;
    height: 2px;
    background: #fa2800;
    position: absolute;
    left: 50%;
    bottom: -10px;
    margin-left: -20px;
  }
  .info-box .title{
    text-align: center;
    position: relative;
    margin-bottom: 30px;
    font-weight: 500;
  }
  .info-box{
    padding: 15px;
  }
</style>