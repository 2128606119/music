import Vue from 'vue'
import App from './App.vue'
/*路由*/
import router from "./router/index";

/*vuex*/
import store from  "./store"

/*element-ui*/
import 'assets/UIstyle/theme/index.css'
import ElementUI from 'element-ui';
Vue.use(ElementUI)

/*vue-kinesis*/
import VueKinesis from 'vue-kinesis'
Vue.use(VueKinesis)

/*better-scroll */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


