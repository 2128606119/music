<template>
  <div>
    <!--轮播图-->
    <el-carousel :interval="1000" type="card" height="225px" >
      <el-carousel-item v-for="item in this.$parent.image">
          <img :src="item.imageUrl" class="imgs" style="border-radius: 3px">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "index",
  }
</script>

<style scoped>
</style>