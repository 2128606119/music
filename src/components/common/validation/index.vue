<template>
      <div class="verify" @click="show">
        <el-collapse-transition>
          <div v-show="shows">
            <el-alert :title='text'
                      :type="types"
                      class="show"
                      :closable="false"
                      center
            ></el-alert>
          </div>
        </el-collapse-transition>
      </div>
</template>

<script>
  import { KinesisContainer, KinesisElement } from 'vue-kinesis'
  export default {
    name: "index",
    props:['text','types'],
    data(){
      return{
        shows:false
      }
    },
    components: {
      KinesisContainer,
      KinesisElement,
    },methods:{
      show(){
        this.shows=false
      }
    }
  }
</script>

<style scoped>
  .verify{
    width: 380px;
    position:fixed;
    left:0;
    right:0;
    margin:0 auto;
    z-index: 2000;
    top: 35px;
  }
  .show{
    width: 380px;
    height: 40px;
    padding-top: 10px;
  }
</style>