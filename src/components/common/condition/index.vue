<template>
  <div @click="vbn(id)">
    <div class="cover">
      <div class="image">
        <el-image lazy :src="coverImgUrl+'?param=200y200'" slot="error" class="imagelist">
          <div slot="placeholder" v-loading="true" class="image-slot"></div>
        </el-image>
      </div>
    </div>
    <div class="info">
      <p class="name">{{name}}</p>
      <p class="count">单曲数{{count}}</p>
    </div>
  </div>

</template>

<script>
  export default {
    name: "index",
    props:["coverImgUrl","id","name","count"],
    methods: {
      vbn(z) {
        alert(z)
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