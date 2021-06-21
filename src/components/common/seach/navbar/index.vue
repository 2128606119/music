<template>
  <div class="banner layer">
    <span class="span_1"></span>
    <div class="search-inner">
      <div class="search-box flex-row">
        <input
               maxlength="128"
               type="text"
               placeholder="搜索音乐/MV/歌单/歌手"
               class="search"
        v-model="wokin"
        >
        <i class="iconfont nicesearch-o search-icon" @click="sosuo"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        wokin:''
      }
    },
    methods:{
      sosuo(){
        if(this.wokin.length>0){
          this.$router.push(this.wokin)
        }
      }
    }
  }
</script>

<style scoped>
  .search-icon{
    font-size: 20px;
    padding: 16px;
    cursor: pointer;
  }

  .search-box input{
    display: inline-block;
    height: 54px;
    flex: 1;
    line-height: 54px;
    border: none;
    margin-right: 24px;
    padding-left: 10px;
    background: #f5f5f5;
  }

  .search-box{
    position: relative;
    z-index: 10;
    padding-left: 8px;
    border-radius: 2px;
    background: #f5f5f5;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .search-inner {
    width: 720px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .span_1{
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
  .banner {
    width: 100%;
    height: 250px;
    background: url(../../../../assets/img/apopsinger/personal.656781c0.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
  }
</style>