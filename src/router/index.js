import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/*发现音乐*/
const home= ()=>import('views/home');
/*排行榜*/
const ranking= ()=>import('views/ranking');
/*歌单*/
const song= ()=>import('views/song');
/*歌手*/
const singer= ()=>import('views/singer');
/*MV*/
const abbr= ()=>import('views/abbr');
/*视频*/
const tvvideo= ()=>import('views/tvvideo');
/*搜索内容*/
const seach=()=>import('views/seach');
/*搜索子路由*/
const seachsingle=()=>import('components/common/seach/bodys/single');
const seachsinger=()=>import('components/common/seach/bodys/singer');
const seachsalbum=()=>import('components/common/seach/bodys/album');
const seachssonglist=()=>import('components/common/seach/bodys/songlist');
const videotv=()=>import('components/common/seach/bodys/videotv');

/*登录*/
const login=()=>import('views/login');
/*推荐歌单*/
const Recplaylist=()=>import('views/Recplaylist')
/*用户中心*/
const user=()=>import('views/user')
/*单个歌手*/
const apopsinger=()=>import('views/apopsinger')
/*歌手详情子组件歌曲列表*/
const songlistson= ()=>import('components/common/apopsinger/body/songlist');
const albumson= ()=>import('components/common/apopsinger/body/album');
const Deosinger= ()=>import('components/common/apopsinger/body/Deosinger');
const Similartosinger= ()=>import('components/common/apopsinger/body/Similartosinger');

/*视频详情页面*/
const videodetails= ()=>import('views/videodetails');


const routes=[
  {
    path:'/videodetails/:vid',
    component:videodetails,
    meta: {
      title: '视频详情'
    }
  },
  {
    path:'/apopsinger/:singerid',
    component:apopsinger,
    children:[
      {
        path:'',
        component:songlistson,
      },
      {
        /*子组件*/
        path:'songlistson',
        component:songlistson
      },
      {
        /*子组件*/
        path:'albumson',
        component:albumson
      },
      {
        /*子组件*/
        path:'Deosinger',
        component:Deosinger
      },
      {
        path:'Similartosinger',
        component:Similartosinger
      }
    ],
    meta: {
      title: '歌手'
    }
  },
  {
    path: '/user/:uid',
    component:user,
    meta: {
      title: '用户中心'
    }
  },
  {
    path: '/Recplaylist/:Recid',
    component:Recplaylist,
    meta: {
      title: '推荐歌单'
    }
  },
  {
    path:'/',
    redirect:'/home',
  },
  {
    path: '/login/:logid',
    component:login,
    meta: {
      title: '登录'
    }
  },
  {
    path:'/home',
    component:home,
    meta:{
      title:'发现音乐'
    }
  },
  {
    path:'/ranking',
    component:ranking,
    meta:{
      title:'排行榜'
    }
  },{
    path:'/song',
    component:song,
    meta:{
      title:'歌单'
    }
  },{
    path:'/singer',
    component:singer,
    meta:{
      title:'歌手'
    }
  },{
    path:'/abbr',
    component:abbr,
    meta:{
      title:'MV'
    }
  },
  {
    path:'/tvvideo',
    component:tvvideo,
    meta:{
      title:'视频'
    }
  },
  {
    path:'/seach/:myid',
    component:seach,
    meta:{
      title:'搜索内容',
    },
    children:[
      {
        path:'videotv',
        component:videotv
      },
      {
        path:'',
        component:seachsingle,
      },
      {
        path:'seachsingle',
        component:seachsingle,
      },
      {
        path:'seachsinger',
        component:seachsinger,
      },
      {
        path:'seachsalbum',
        component:seachsalbum,
      },
      {
        path:'seachssonglist',
        component:seachssonglist,
      }
      ]
  }
]
const router=new VueRouter({
  routes,
  mode:'history'
})


export default router
