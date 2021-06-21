<template>
  <kinesis-container>
      <!--正确消息-->
      <validation ref="showtrue" :text="message" types="success"></validation>
      <!--错误信息-->
      <validation ref="showfalse" text="似乎出现什么错误了 啧啧啧!" types="error"></validation>
      <!--登录表单-->
    <div class="login-wrap">
      <kinesis-element :parallaxStrength="10" type="depth">
        <div class="login-box">
          <span class="ewm" v-show="mkdang" @click="switchover"><img src="../../assets/img/login/ewm.png"></span>
          <span class="ewm" v-show="!mkdang" @click="switchover"><img src="../../assets/img/login/zhdu.png"></span>
          <!--logo-->
          <img src="~assets/img/login/loginlogo.png" class="TheLoginIcon">
          <p>NICEMUSIC</p>
          <!--表单-->
          <div class="ionfrom">
            <div class="ioninput" v-show="mkdang" >
              <!--手机号-->
              <div class="EnterUser">
                <el-input
                        v-model="User.name"
                        placeholder="请输入网易云音乐手机号"
                        prefix-icon="iconfont nicephone2"
                        class="EnterUserInput"
                        @blur="NonNullName"
                >
                </el-input>
                <div class="EnterUserErr">{{err.name}}</div>
              </div>
              <!--密码-->
              <div class="EnterUser">
                <el-input
                        show-password
                        v-model="User.mi"
                        placeholder="请输入密码"
                        prefix-icon="iconfont nicemima" class="EnterUserInput"
                        @blur="NonNullMi"
                >
                </el-input>
                <div class="EnterUserErr">{{err.mi}}</div>
              </div>
              <!--登录按钮-->
              <div class="ClickLogins">
                <div class="ClickLogin">
                  <el-button type="primary" class="TheLoginButton" @click="long">登录</el-button>
                </div>
              </div>
            </div>
            <div class="ioninput" v-show="!mkdang" >
              <div class="ioninputs_1">
                <kinesis-element :parallaxStrength="10" type="depth">
                  <img :src='vbbg' style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius:30px">
                </kinesis-element>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </kinesis-element>
    </div>
  </kinesis-container>
</template>

<script>
  import { KinesisContainer, KinesisElement } from 'vue-kinesis'
  import {user} from 'network/user'
  import validation from 'components/common/validation'
  import {QRcodekey,QRcodeloge,QRcodezt,QRcodejbd} from 'network'
  export default {
    name: "login",
    data(){
      return{
        vbbg:"",
        key:'',
        mkdang:true,
        User:{
          name:'',
          mi:''
        },
        err:{
          name:'',
          mi:''
        },
        message:''
      }
    },
    components: {
      KinesisContainer,
      KinesisElement,
      validation
    },
    methods:{
      switchover(){
        this.mkdang=!this.mkdang
      },

      long(){
         if(this.NonNullName()&&this.NonNullMi()){
           user('/login/cellphone?phone='+this.User.name+'&password='+this.User.mi).then(res=>{
             if(res.status==200){
               this.message="登录成功  欢迎你"+res.data.profile.nickname+"  !!!"
               this.$refs.showtrue.shows=true
               /*用户名*/
               window.localStorage.setItem('cookie', res.data.profile.nickname)
               /*用户图像*/
               window.localStorage.setItem('avatarUrl', res.data.profile.avatarUrl)
               /*用户ID*/
               console.log(res.data.profile.userId)
               window.localStorage.setItem('userId', res.data.profile.userId)
               /*状态*/
               window.localStorage.setItem('loginStatu', true)
               window.location.replace('/home')
             }
           }).catch(err=>{
               this.$refs.showfalse.shows=true
           })
        }
      },
      /*非空验证*/
      NonNullName(){
        if(this.User.name.length==0){
          this.err.name="手机号都没有!"
          return false
        }else {
          this.err.name=""
          return true
        }
      },
      /*非空验证*/
      NonNullMi(){
        if(this.User.mi.length==0){
          this.err.mi="密码呢!"
          return false
        }else {
          this.err.mi=""
          return true
        }
      }
    },
    created() {
      let timer
      QRcodeloge(Date.now()).then(res=>{
        var key=res.data.unikey
        QRcodekey(key,Date.now()).then(res=>{
          this.vbbg=res.data.qrimg
          timer=setInterval(function f () {
            QRcodezt(key,Date.now()).then(res=>{
              if(res.code==800){
                location.reload();
              }
              if(res.code==803){
                QRcodejbd().then(res=>{
                  /*用户名*/
                  window.localStorage.setItem('cookie', res.data.profile.nickname)
                  /*用户图像*/
                  window.localStorage.setItem('avatarUrl', res.data.profile.avatarUrl)
                  /*用户ID*/
                  console.log(res.data.profile.userId)
                  window.localStorage.setItem('userId', res.data.profile.userId)
                  /*状态*/
                  window.localStorage.setItem('loginStatu', true)
                  clearInterval(timer)
                  window.location.replace('/home')
                })
              }
            })
          },3000)
        })
      })
    }
  }
</script>

<style scoped>
  .ewm{
    position: fixed;
    margin-left: 176px;
    margin-top: 5px;
    width: 20px;
  }
  .ioninputs_1{
    width: 100%;
    height: 100%;
    margin-top: -25px;
  }
  .TheLoginButton{
    font-size: 15px;
    line-height: 1.5;
    width: 100%;
    height: 42px;
    border-radius: 3px;
    border: 0;
    background: #5dd5c8;
  }
  .ClickLogin{
    width: 100%;
    display: block;
    position: relative;
    z-index: 1;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 auto;
  }
  .ClickLogins{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 10px;
  }
  .EnterUserErr{
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }

  .EnterUser{
    margin-bottom: 22px;
    position: relative;
  }
  .ioninput{
    position: relative;
    width: 100%;
    z-index: 1;
    margin-bottom: 10px;
  }
  .login-box p {
    margin-bottom: 45px;
  }
  .login-wrap {
    /*justify-content   flex的容器属性:定义了在x轴上的对其方式*/
    justify-content: center;
    /*align-items:   flex的容器属性：定义了在y轴上的对其方式*/
    align-items: center;
    display: flex;
    width: 100%;
    min-height: 100vh;
    background: #5dd5c8 url(../../assets/img/login/login-background.png) center bottom no-repeat;
  }
  .login-box {
    height: 486px;
    width: 350px;
    background: #FFF url("../../assets/img/login/logbg.jpg") center bottom no-repeat;
    border-radius: 8px;
    box-shadow: 1px 2px 15px rgba(0,0,0,.3);
    z-index: 80;
    margin: 4em auto;
    text-align: center;
  }
  .TheLoginIcon{
    width: 55px;
    margin: 40px 0 0px;
    height: auto;
    max-width: 100%;
    border-style: none;
  }
  .ionfrom{
    width: 296px;
    margin: 0 auto;
  }
</style>