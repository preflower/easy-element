import Form from '../packages/form'
import Table from '../packages/table'

const components = [
  Form,
  Table
]

const install = function (Vue, options = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$EASYELEMENT = {
    table: options.table || {},
    form: options.form || {}
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Form,
  Table
}
