<script>
import DynamicComponent from './dynamic-component.vue'

/**
 * attributes:
 * all el-form attributes
 * formRef:
 *   solve ref that cannot be passthrough problem,
 *   also can use `this.$refs[u set name].$refs['i-table']` call table's function
 * fields:
 * item accept all el-form-item attributes
 * other attributes (render/component/slot mutually exclusive, priority like order):
 * component - { name: component name, ...attributes: component support attributes }
 * if need multiply component please use render or slot
 * render - just scopedSlots.default alias
 * slot - slot name
 */
export default {
  name: 'IForm',
  components: {
    DynamicComponent
  },
  props: {
    formRef: {
      type: String,
      default: undefined
    },
    fields: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    const vm = this.$options.parent
    if (this.formRef) vm.$refs[this.formRef] = this.$refs['i-form']
  },
  render () {
    const { fields, $attrs: { model: models } } = this
    const vm = this.$options.parent

    const formData = {
      ref: 'i-form',
      props: Object.assign({},
        (this.$EASYELEMENT?.form || {}),
        this.$attrs
      ),
      on: this.$listeners
    }
    const formItems = []
    fields.forEach((item, index) => {
      const { component, render, slot, prop: formItemProp, ...props } = item
      const formItemData = {
        props: {
          prop: formItemProp,
          ...props
        }
      }
      if (render) formItemData.scopedSlots = { default: render.bind(vm) }
      else if (this.$scopedSlots[slot]) formItemData.scopedSlots = { default: this.$scopedSlots[slot] }
      else if (this.$slots[slot]) formItemData.scopedSlots = { default: () => this.$slots[slot] }
      else if (component) {
        const { name, value, ...others } = component
        const attrs = {}
        const on = {}
        for (const key in others) {
          const value = others[key]
          if (typeof value === 'function') {
            on[key] = value.bind(vm)
          } else {
            attrs[key] = value
          }
        }
        const componentProps = {
          attrs,
          props: {
            name,
            value: models?.[formItemProp]
          },
          on
        }
        if (models && formItemProp) {
          componentProps.model = {
            value: models[formItemProp],
            callback: ($$v) => {
              this.$set(models, formItemProp, $$v)
            }
          }
        }
        formItemData.scopedSlots = { default: () => <DynamicComponent {...componentProps} /> }
      }
      formItems.push(<el-form-item key={index} {...formItemData} />)
    })
    return (
      <el-form {...formData}>
        {formItems}
      </el-form>
    )
  }
}
</script>
