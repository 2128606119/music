<template>
  <div class="sum">
    <div class="fluid">
      <div class="playlist-wrap container">
        <!--分类-->
        <div class="filter shadow">
          <!--全部分类-->
          <div class="title flex-center" @click="classifyshow=!classifyshow">
            {{classification}}
            <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
            <span class="span_1"></span>
          </div>
          <div v-show="classifyshow" class="filter-box shadow">
            <div v-for="i in typeList" class="item">
              <h2><i class="iconfont" :class="i.icon"></i>{{i.value}}</h2>
              <ul>
                <li @click="lalap(j.name)" v-for="j in classify.sub" v-if="j.category==i.key">{{j.name}}</li>
              </ul>
            </div>
          </div>
          <!--热门分类-->
          <div class="hot-tag flex-row">
            <p>热门标签：</p>
            <ul class="flex-center">
              <li v-for="(i,index) in rmecatlist.tags"
                  @click="tally(i.name,index)" :class="{active:indexs==index}"
              >{{i.name}}</li>
            </ul>
          </div>
        </div>
        <!--歌单内容-->
        <div class="list" v-loading="loading">
          <Musiclist v-for="i in flplaylist"
                     :coverImgUrl="i.coverImgUrl"
                     :id="i.id"
                     :name="i.name"
          > </Musiclist>
        </div>
        <!--分页-->
        <div class="page-wrap">
          <el-pagination
                  @current-change="handleCurrentChange"
                  :page-size="limit"
                  background
                  hide-on-single-page
                  :current-page.sync="currentPage"
                  layout="total, prev, pager, next"
                  :total.sync="pageTotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Musiclist from 'components/common/Musiclist'
  import {catlist,flplaylist,rmecatlist} from 'network'
  export default {
    name: "index",
    data(){
      return{
        typeList: [
          {
            key: 0,
            value: '语种',
            icon: 'niceyuyan'
          },
          {
            key: 1,
            value: '风格',
            icon: 'nicefengge'
          },
          {
            key: 2,
            value: '场景',
            icon: 'nicekafeidengdai'
          },
          {
            key: 3,
            value: '情感',
            icon: 'niceqingganqingshu'
          },
          {
            key: 4,
            value: '主题',
            icon: 'nicepifugexinghuazhuti-xianxing'
          }
        ],
        indexs:-1,
        /*总分类*/
        classify:{},
        /*总分类显示*/
        classifyshow:false,
        /*热门歌单分类*/
        rmecatlist:{},
        /*歌单详情*/
        flplaylist:{},
        /*分类*/
        classification:'全部',
        /*加载判断*/
        loading:true,
        /*分页总页*/
        pageTotal:0,
        limit: 40,
        // 当前页面
        currentPage:1
      }
    },
    methods:{
      lalap(i){
        this.currentPage=1
        this.classification=i
        this.indexs=-1
        this.classifyshow=!this.classifyshow
      },
      /*请求数据*/
      listflplaylist(i) {
        flplaylist(this.classification,i).then(res=>{
          this.flplaylist=res.playlists
          this.pageTotal=res.total
          this.loading=false
        })
      },

      /*分页跳转*/
      handleCurrentChange(val) {
        this.loading=true
        this.listflplaylist((val-1)*40)
      },

      /*分类查询*/
      tally(i,index){
        this.currentPage=1
        this.classification=i
        this.indexs=index
      }
    },
    watch:{
      classification(z){
        this.listflplaylist(0)
      }
    },
    components:{
      Musiclist,
    },
    created() {
      rmecatlist().then(res=>{
        this.rmecatlist=res
      })
      catlist().then(res=>{
        this.classify=res
      })
      this.listflplaylist(0)
    }
  }
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ababab;
    border-radius: 10px;
  }

  .item ul li:hover {
    color: #fff;
    background: #fa2800;
  }
  .item ul li {
    padding: 8px 18px;
    background: #f7f7f7;
    border-radius: 16px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    font-size: 12px;
    color: #161e27;
    transition: all .4s;
  }
  .item ul {
    display: flex;
    flex-wrap: wrap;
  }

  .item h2 i{
    font-size: 18px;
    margin-right: 5px;
    margin-top: -1px;
  }
  .item h2{
    display: flex;
    align-items: center;
    font-size: 15px;
    margin-bottom: 15px;
    color: #161e27;
    font-weight: 500;
  }

  .item{
    margin-bottom: 20px;
  }
  .filter-box {
    width: 720px;
    height: 400px;
    overflow-y: scroll;
    background: #fff;
    border-radius: 5px;
    color: #000;
    position: absolute;
    top: 140px;
    z-index: 100;
    padding: 15px 10px 0 16px;
  }

  .active{
    color: #fa2800;
  }
  .page-wrap {
    text-align: center;
  }

  .list{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
  /*.flex-center li:hover {*/
  /*  color: #888;*/
  /*}*/
  .flex-center li{
    margin: 0 5px;
    padding-right: 10px;
    cursor: pointer;
  }
  .flex-center{
    display: flex;
    align-items: center;
  }
  .filter .hot-tag{
    flex: 1;
  }

  .flex-row {
    flex-direction: row;
  }
 .flex-row {
    display: flex;
    align-items: center;
  }

  .span_1{
    content: "";
    width: 1px;
    height: 20px;
    margin-left: 12px;
    background: #e7e7e7;
    opacity: 0;
  }
  .title>i{
    transform: rotate(90deg);
    margin-left: 10px;
    font-size: 18px;
  }
  .filter .title{
  width: auto;
  height: 100%;
  padding: 0 5px 0 15px;
  background: #fa2800;
  border-radius: 5px 0 5px 5px;
  color: #fff;
  cursor: pointer;
  margin-right: 15px;
  position: relative;
  }

    .flex-center {
    display: flex;
    align-items: center;
  }

  .playlist-wrap .filter {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 20px;
    border-radius: 5px 0 5px 5px;
  }

  .shadow {
    background-color: #fff;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,0.1);
  }

  .container {
    max-width: 1200px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .fluid{
    min-height: 100%;
    padding: 20px 0;
  }
  .sum{
    min-height: calc(100vh - 65px);
    z-index: 998;
    width: auto;
    min-width: 1024px;
    padding-top: 70px;
  }
</style>