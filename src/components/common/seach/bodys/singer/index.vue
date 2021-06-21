<template>
  <div class="recommend-singer">
    <ul>
      <li v-for="i in sum.result.artists"  @click="tiaozhuan(i)">
        <div class="cover">
          <el-avatar :size="95"
                     :key="i.img1v1Url + '?param=200y200'"
                     :src="i.img1v1Url + '?param=200y200'"
          ></el-avatar>
        </div>
        <div class="info">
          <p class="name">{{i.name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {seek} from 'network'
  export default {
    name: "index",
    data(){
      return{
        sum:{}
      }
    },
    methods:{
      tiaozhuan(res){
        window.location.assign("http://localhost:8080/apopsinger/"+res.id)
      }
    },
    created() {
      let data=this.$route.params.myid
      seek(data,100).then(res=>{
        this.sum=res
      });
    }
  }
</script>

<style scoped>
  .info .count{
    font-size: 12px;
    margin-top: 10px;
    color: #fa2800;
  }
  .info .name{
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    word-break: break-word;
  }
  .info{
    margin-top: 15px;
    text-align: center;
  }
  .recommend-singer{
    margin-top: 20px;
  }
  .recommend-singer h2{
    margin: 0 0 15px 0;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  .recommend-singer ul{
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 0px -15px 0;
  }
  .recommend-singer ul li{
    padding: 0 15px 30px;
    flex: 0 0 10%;
    max-width: 10%;
  }
</style>

