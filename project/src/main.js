import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/css/common-elementui.css'
import '../public/css/common.css'
import '../public/iconfont/iconfont.css'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

Vue.use(VXETable)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
