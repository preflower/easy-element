import Form from '../packages/form'
import Table from '../packages/table'
import Select from '../packages/select'

const components = [
  Form,
  Table,
  Select
]

const install = function (Vue, options = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$EASYELEMENT = {
    table: options.table || {},
    form: options.form || {},
    select: options.select || {}
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Form,
  Table,
  Select
}
