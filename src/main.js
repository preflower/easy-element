import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import EasyElement from '../packages'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(EasyElement, {
  table: {
    border: true,
    stripe: true
  },
  form: {
    inline: true
  }
})

Vue.directive('elm', {
  inserted: function (el) {
    console.log('触发自定义指令', el)
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
