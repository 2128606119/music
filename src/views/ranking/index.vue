<template>
  <div class="sum">
    <div class="sunsou">
      <div class="mmksun">
        <div class="module">
          <h2 class="title flex-row">
            <span></span>
            云音乐特色榜
          </h2>
          <div class="list">
            <Musiclist v-for="i in sum"
                       :coverImgUrl="i.coverImgUrl"
                       :id="i.id"
                       :name="i.name"
            > </Musiclist>
          </div>
        </div>
        <div class="module">
          <h2 class="title flex-row">
            <span></span>
            云音乐特色榜
          </h2>
          <div class="list">
            <Musiclist v-for="i in sum_1"
                       :coverImgUrl="i.coverImgUrl"
                       :id="i.id"
                       :name="i.name"
            > </Musiclist>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Musiclistsun} from 'network'
  import Musiclist from 'components/common/Musiclist'
  export default {
    name: "index",
    data(){
      return {
        sum:[],
        sum_1:[]
      }
    },
    components:{
      Musiclist
    },
    created() {
      Musiclistsun().then(res=> {
        this.sum=res.list.slice(0,4)
        this.sum_1=res.list.slice(4)
    })
  }
  }
</script>

<style scoped>
  .mmksun{
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .sunsou{
    padding: 20px 0;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  .title span{
    content: '';
    width: 3px;
    height: 20px;
    background: #fa2800;
    position: absolute;
    left: 0;
    top: 2px;
  }
  h2 {
    font-size: 16px;
  }
  .title{
    position: relative;
    padding-left: 15px;
    margin-bottom: 20px;
  }

   .flex-row {
     display: flex;
     flex-direction: row;
     align-items: center;
   }

  .sum{
    min-height: calc(100vh - 252px);
    z-index: 998;
    width: auto;
    min-width: 1024px;
    padding-top: 70px;
  }
</style>