import Form from '../packages/form'
import Table from '../packages/table'
import Select from '../packages/select'
import Radio from '../packages/radio'

const components = [
  Form,
  Table,
  Select,
  Radio
]

const install = function (Vue, options = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$EASYELEMENT = {
    table: options.table || {},
    form: options.form || {},
    select: options.select || {},
    radio: options.radio || {}
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
