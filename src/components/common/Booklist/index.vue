<template>
  <div class="list">
    <div class="item two" v-for="i in this.$parent.playlist">
      <div class="wrapper">
        <span class="span_1"></span>
          <div class="cover">
            <div class="image">
              <el-image lazy :src="i.picUrl" slot="error" class="imagelist">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </div>
            <span class="span_2"></span>
            <!--热门度-->
            <div class="count">
              <i class="arrow"></i>
              <span>{{counts(i.playCount)}}</span>
              <span class="jiao"></span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { KinesisContainer, KinesisElement } from 'vue-kinesis'
  import bynamic from 'components/common/bynamic'
  import {calculate} from 'instrument'
  export default {
    name: "index",
    components: {
      KinesisContainer,
      KinesisElement,
      bynamic
    },
    computed:{
    },
    methods:{
      toDetail(ser){
        this.$router.push("/Recplaylist/"+ser.id)
      },
      counts(res){
        return calculate(res)
      },
    }
  }
</script>

<style scoped>
  .count{
    position: absolute;
    right: 16px;
    top: 1px;
    height: 24px;
    padding-left: 9px;
    background: url(../../../assets/img/home/Heatsetting.png) no-repeat 0;
    background-size: cover;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arrow{
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 6px;
    border-color: transparent transparent transparent #fff;
    margin-right: 5px;
  }

  .jiao{
    content: "";
    position: absolute;
    right: -14px;
    top: 0;
    width: 14px;
    height: 24px;
    background: url(../../../assets/img/home/Heatsetting.png) no-repeat 100%;
    background-size: cover;
  }

   .span_2 {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    box-shadow: inset 1px 1px 0 rgba(0,0,0,0.5), inset -1px -1px 0 rgba(0,0,0,0.5);
  }

  .list .item .wrapper .cover{
    position: relative;
    z-index: 2;
    padding-top: 100%;
    border-radius: 2px;
    background-color: #d9d9d9;
  }

  .list .item .wrapper .span_1 {
    right: 6px;
    transform: scale(0.85);
    transform-origin: 100% 50%;
    z-index: 2;
    border-radius: 2px;
    opacity: 0.9;
  }

  .list .item .wrapper{
    position: relative;
    padding-right: 10px;
  }
  .list .item.two {
    flex: 0 0 50%;
    max-width: 50%;
  }
   .list .item {
     flex: 0 0 12.5%;
     max-width: 12.5%;
     padding: 0 10px 25px;
     cursor: pointer;
   }
.list{
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}
</style>