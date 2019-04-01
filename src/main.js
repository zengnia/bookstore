import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import store from './components/vuex/store';
import axios from "axios";
import Qs from "qs"

Vue.prototype.$echarts = echarts 
Vue.use(VueParticles)
Vue.use(ElementUI)
// Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
