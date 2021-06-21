<template>
  <div class="item eight">
    <div class="wrapper">
      <span class="span_1"></span>
      <div @click="vbnuu(id)">
        <div class="cover">
          <div class="image">
            <el-image lazy :src="coverImgUrl+'?param=300y300'" slot="error" class="imagelist">
              <div slot="placeholder" v-loading="true" class="image-slot"></div>
            </el-image>
          </div>
        </div>
      </div>
      <span class="span_2"></span>
    </div>
    <div class="info">
      <h2 class="name ellipsis-two">{{name}}</h2>
    </div>
  </div>
</template>

<script>
  import {calculate} from 'instrument'
  export default {
    name: "index",
    props:["coverImgUrl","id","name"],
    methods:{
      counts(res){
        return calculate(res)
      },
      vbnuu(id){
        this.$router.push("/Recplaylist/"+id)
      }
    }
  }
</script>

<style scoped>
  .image-slot{
    background: #F5F7FA;
    text-align: center;
    width: 112px;
    height: 112px;
    font-size: 14px;
    color: #C0C4CC;
  }
  .name {
    font-size: 14px;
  }
  .ellipsis-two {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 700;
    line-height: 18px;
  }
  .info{
    margin-top: 15px;
    color: rgba(0, 0, 0, 0.85);
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  .cover{
    position: relative;
    z-index: 2;
    padding-top: 100%;
    border-radius: 2px;
    background-color: #d9d9d9;
  }
  .span_2{
    right: 1px;
    transform: scale(0.73);
    transform-origin: 100% 50%;
    z-index: 1;
    border-radius: 2px;
    opacity: 0.5;
  }
  .span_1{
    right: 6px;
    transform: scale(0.85);
    transform-origin: 100% 50%;
    z-index: 2;
    border-radius: 2px;
    opacity: 0.9;
  }
  .wrapper span{
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    position: absolute;
    top: 0;
    transition: all 0.4s;
  }
  .item{
    flex: 0 0 12.5%;
    max-width: 12.5%;
    padding: 0 10px 25px;
    cursor: pointer;
  }
  .item .wrapper {
    position: relative;
    padding-right: 10px;
  }
</style>