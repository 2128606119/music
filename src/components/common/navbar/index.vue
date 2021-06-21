<template>
  <div class="header" v-show="!this.$store.state.SongPage">
    <div class="menu sum">
      <!--logo-->
      <div class="logo">
        <router-link to="/home"  replace active-class="a ">
          <img src="~assets/img/home/logo.png">
        </router-link>
      </div>
      <!--选择菜单-->
      <ul class="sum">
        <li>
          <router-link to="/home"  replace active-class="vb">
            发现音乐
            <span> </span>
          </router-link>
        </li>

        <li>
          <router-link to="/ranking" replace active-class="vb">
            排行榜
            <span> </span>
          </router-link>
        </li>

        <li>
          <router-link to="/song" replace active-class="vb">
            歌单
            <span> </span>
          </router-link>
        </li>

        <li>
          <router-link to="/singer" replace active-class="vb">
            歌手
            <span> </span>
          </router-link>
        </li>

        <li>
          <router-link to="/tvvideo" replace active-class="vb">
            视频
            <span> </span>
          </router-link>
        </li>
      </ul>
      <!--搜索-->
      <div class="ico" @click="soshow">
        <i class="iconfont nicesearch-o"></i>
      </div>
      <!--用户登录-->
      <div class="userbox">
        <div class="line"></div>
        <div v-if="!mlkj"  @click="long" class="reslon" >
          登录
        </div>
        <div v-else="mlkj" class="reslon" >
          <span class="HeadAddress">
              <img :src="Headaddress">
          </span>
          <el-dropdown class="user_ns" trigger="click">
            <span class="el-dropdown-link">
              {{names}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <template #dropdown>
                <el-dropdown-menu >
                  <div @click="wopls">
                  <el-dropdown-item icon="el-icon-user" >个人主页</el-dropdown-item>
                  </div>
                  <el-dropdown-item icon="el-icon-medal">我的等级</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
                  <div @click="logoff">
                    <el-dropdown-item icon="el-icon-switch-button" divided> 退出登录 </el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
        </div>
      </div>
      <!--搜索框-->
      <div class="search_box" :class="[OpenTheSearch, CloseTheSearch]">
        <div class="setting" @click="socolse"></div>
        <div>
          <!--搜索内容-->
          <div class="seek">
            <!--搜索框-->
            <div class="cover">
              <div class="cove_1">
                <input
                        class="text"
                        type="text"
                        v-model="keyword"
                        placeholder="请输入搜索关键词并按回车键…"
                        v-on:keyup.enter="searchweb"
                >
              </div>
            </div>
            <!--搜索记录-->
            <div class="SearchRecord">
              <!--头部图标-->
              <div class="SearchRecordLogo">
                <i class="iconfont nicelishi"></i>
                <span>历史记录</span>
                <p @click="Knowlist">清空</p>
              </div>
              <!--搜索记录列表-->
              <ul class="SearchRecordList">
                <li v-for="i in svbk">
                  <div @click="search_1(i)" >
                    <a class="SingleRecorder">{{i}}
                      <span @click.stop="crt(i)"></span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <!--热门搜索-->
            <div class="SearchRecord">
              <!--头部图标-->
              <div class="SearchRecordLogo">
                <i class="iconfont niceremensousuo"></i>
                <span>热门搜索</span>
              </div>
              <!--热门搜索列表-->
              <ul class="SearchRecordList">
                <li v-for="i in HotSearch">
                  <div @click.stop="search_1(i)">
                    <a class="SingleRecorder">{{i}}</a>
                  </div>
                </li>
              </ul>
            </div>

            </div>
          </div>
          <!--关闭搜索-->
          <div></div>
        </div>
      </div>
    </div>

</template>

<script>
  import {tcdlu} from 'network'
  import {HotSearch} from 'network/home.js'
  import {details} from "../../../network/Songlist";
  export default {
    name: "index",
    data(){
      return{
        OpenTheSearch:'',
        CloseTheSearch:'',
        /*搜索内容*/
        keyword:'',
        /*热门搜索*/
        HotSearch:[],
        mlkj:window.localStorage.getItem('loginStatu')

      }
    },
    computed:{
      svbk(){
        return this.$store.state.Search
      },
      Headaddress(){
        return window.localStorage.getItem('avatarUrl')
      },
      names(){
        return window.localStorage.getItem('cookie')
      }
    },
    methods:{
      // 登录
      wopls(){
        this.$router.push("/user/"+window.localStorage.getItem('userId'))
      },
      /*登录*/
      long(){
         this.$router.replace("/login/true")
      },
      /*退出登录*/
      logoff(){
        tcdlu().then(res=>{
          console.log(res)
          console.log("退出登录成功")
          window.localStorage.clear()
          this.mlkj=false
        })
      },
      /*显示搜索框*/
      soshow(){
        this.OpenTheSearch='OpenTheSearch'
        this.CloseTheSearch=''
      },
      /*关闭搜索框*/
      socolse(){
        this.OpenTheSearch=''
        this.CloseTheSearch='CloseTheSearch'
      },
      /*输入框搜索*/
      searchweb(){
        if(this.keyword.split(' ').join('').length !== 0){
          this.search_1(this.keyword)

        }
      },
      /*搜索*/
      search_1(res){
        this.$store.commit('increment',res)
        this.$router.replace("/seach/"+res)
        this.socolse()
        this.col=''
      },
      /*去除搜索记录*/
      crt(ser){
        this.$store.commit('RemoveIncrement',ser)
      },
      /*清空搜索记录*/
      Knowlist(){
        this.$store.commit('RemoveIncrementAll')
      }
    },
    created() {
      /*请求热门搜索*/
      HotSearch({
        url:'/search/hot/detail'
      }).then(res=>{
        for(let i=0;i<10;i++){
          this.HotSearch[i]=res.data[i].searchWord
        }
      })
    }
  }
</script>

<style scoped>
  .user_ns{
      position: relative;
      top: -16px;
  }
  .user_ns span{
    color: #606266;
    font-size: 14px;

  }
  .user_ns span i{
    margin-left: 8px;
  }
  .HeadAddress{
    margin-right: 15px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
    overflow: hidden;
  }
  a{
   transition: color 0.3s;
  }
    li a:hover{
    color: #40a9ff;
    }
  .vb:hover{
    color: #fa2800!important;
  }
  .reslon:hover{
    color: #fa2800!important;
  }
  .SingleRecorder:hover{
    color: #161e27;
  }
  .SingleRecorder:hover span{
    background-image: url("../../../assets/img/home/关闭(1).png");
  }
.header{
width: 100%;
height: 64px;
background-color: #fff;
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 2000;
}
.menu{
max-width: 1200px;
width: 101%;
margin-right: auto;
margin-left: auto;
}
.logo{
width: 146px;
display: flex;
align-items: center;
margin-right: 30px;
height: 64px;
}
.sum{
display: flex;
flex-direction: row;
align-items: center;
flex: 1;
}
.sum li{
font-size: 14px;
height: 100%;
padding: 0 15px;
position: relative;
}
.vb span{
content: '';
position: absolute;
background: #fa2800;
left: 0;
right: 0;
bottom: -12px;
width: 4px;
height: 4px;
border-radius: 50%;
margin: 0 auto;
opacity: 1;
}
.vb{
color: #fa2800;
}
.ico{
height: 100%;
display: flex;
align-items: center;
}
.ico i{
font-size: 22px;
color: #161e27;
padding: 0 15px;
cursor: pointer;
}
.userbox{
display: flex;
align-items: center;
cursor: pointer;
position: relative;
padding-left: 20px;
  margin-top: 3px;
}
.line{
width: 1px;
height: 22px;
background: #e1e1e1;
position: absolute;
left: 0;
top: 50%;
margin-top: -11px;
}
.search_box{
z-index: 1031;
position: fixed;
display: none;
align-items: center;
justify-content: center;
width: 100%;
height: 100vh;
top: 0;
left: 0;
}
.setting{
backdrop-filter: blur(10px);
width: 100%;
height: 100%;
position: absolute;
background: rgba(120,129,147,0.22);
}
.OpenTheSearch{
display:flex ;
}
.CloseTheSearch{
display: none;
}
/*搜索框*/
</style>
<style scoped>
.seek{
  background: #fff;
  position: relative;
  border-radius: 4px;
width: 790px;
}
.cover{
position: relative;
overflow: hidden;
padding: 3rem;
background-color: rgba(0,0,0,0.3);
background: linear-gradient(to left, #F27121, #E94057, #8A2387);
opacity: 0.4;
border-radius: 4px;
}
  .cove_1{
    position: relative;
    padding: 4rem 0;
  }
.cove_1 input{
  display: block;
  width: 100%;
  padding: 0.625rem 0.75rem;
  height: calc(1.5em + 1.71875rem + 2px);
  text-align: center;
  color: #fff;
  border-color: transparent;
  background-color: rgba(255,255,255,0.3);

  border-radius: 5px;
}

input::-webkit-input-placeholder, .inputHead {
  color: #fff;
}
  .SearchRecord{
    padding: 1.5rem 3rem;
  }
  .SearchRecordLogo{
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }

  .SearchRecordLogo i{
    color: #fa2800;
    margin-right: 8px;
    font-size: 1.425rem;
  }
  .SearchRecordLogo span{
    flex: 1;
    font-size: 15px;
    color: #4a4a4a;
  }

  .SearchRecordLogo p{
    color: #fa2800;
    cursor: pointer;
  }
  .SearchRecordList{
    width: 100%;
    margin: 0 -0.25rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
.SearchRecordList li{
  display: inline-block;
  padding: 0.25rem;
  cursor: pointer;
  margin-bottom: 10px;
}
.SearchRecordList li a{
  color: #6d7685;
  background-color: #f4f4f5;
  text-align: center;
  border: 1px solid transparent;
  font-size: 0.75rem;
  padding: 0.3125rem 0.75rem;
  border-radius: 4px;
}
.SearchRecordList li a span{
  display: inline-block;
  background-image: url("../../../assets/img/home/关闭.png");
  width: 14px;
  height: 14px;
  background-position: center;
  margin-left: 8px;
  opacity: 0.7;
  margin-bottom: -3px;
  z-index: 10000;
}
</style>