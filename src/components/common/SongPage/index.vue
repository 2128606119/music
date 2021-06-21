<template>
  <transition name="el-zoom-in-bottom">
    <div v-show="this.$store.state.SongPage" class="lyiclidettosum">
    <div class="ly_1">
      <!--歌曲封面-->
      <div class="imgsun">
        <img :src="imager">
<!--        !this.$store.state.control-->
        <span class="span_1" :class="{span_2:this.$store.state.control}"></span>
      </div>
      <!--歌词简介-->
      <lyriclibretto></lyriclibretto>
    </div>
  </div>
  </transition>
</template>

<script>
  import lyriclibretto from 'components/common/lyriclibretto'
  export default {
    name: "index",
    data(){
      return{
        imager:''
      }
    },
    components:{
      lyriclibretto
    },
    computed:{
      imagek(){
        return this.$store.state.DetailsSong.SongCover
      }
    },
    watch:{
      imagek(z){
        this.imager=z
      }
    },
    created() {
      this.imager=this.$store.state.DetailsSong.SongCover
    }
  }
</script>

<style scoped>
  .span_1{
    content: "";
    position: absolute;
    left: 20%;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all .8s cubic-bezier(.4,0,.2,1) .5s;
    background: transparent url(../../../assets/img/apopsinger/zhuan.png) 50% no-repeat;
    background-size: contain;
  }
  .span_2{
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
  }


  .Introduction{
    width: 50%;
  }
  .imgsun{
    display: inline-block;
    width: 400px;
    height: 400px;
    position: relative;
  }
  .imgsun img{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    opacity: 1;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 5px 0 10px -5px #141414;
  }
.lyiclidettosum{
  width: 100%;
  height: 100vh;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 100px;
}
  .ly_1{
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    display: flex;
  }
</style>