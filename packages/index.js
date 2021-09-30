import Form from '../packages/form'
import Table from '../packages/table'

const components = [
  Form,
  Table
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  Form,
  Table
}
