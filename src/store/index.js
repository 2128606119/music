import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import mutations from './mutations'
import state from './state'
import getters from "./getters"

const store=new Vuex.Store({
  state,
  mutations,
  getters
//  登录验证提示
})
export default store