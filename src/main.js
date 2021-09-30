import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.directive('elm', {
  inserted: function (el) {
    console.log('触发自定义指令', el)
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
