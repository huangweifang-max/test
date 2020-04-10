import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';    

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

require('./mock')




Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

