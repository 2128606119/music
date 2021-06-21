<template>
  <div class="sum">
    <Apopsinger></Apopsinger>
    <bodys></bodys>
  </div>
</template>

<script>
  import Apopsinger from 'components/common/apopsinger/navdar'
  import bodys from 'components/common/apopsinger/body'
  import {Detailsofthesinger} from 'network/'
  export default {
    name: "index",
    data(){
      return{
        singerid:0,
        Detailsofthesinger:{}
      }
    },
    components:{
      Apopsinger,
      bodys
    },
    created() {
      this.singerid=this.$route.params.singerid
      /*歌手详情*/
      Detailsofthesinger(this.singerid).then(res=>{
        console.log(res)
        this.Detailsofthesinger=res
        const all={
          name:res.data.artist.name,
          count:res.data.artist.albumSize
        }
        this.$store.commit('Albumnumberxs',all)
      })
    }
  }
</script>

<style scoped>
  .sum{
    padding-top: 70px;
  }
</style>