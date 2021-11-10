<script>
/**
 * tableRef:
 *   solve ref that cannot be passthrough problem,
 *   also can use `this.$refs[u set name].$refs['i-table']` call table's function
 * item accept all el-table-item attributes
 * other attributes:
 * vif - just v-if directive, supported boolean and function
 * slot - slot name
 * directives - Reference: https://cn.vuejs.org/v2/guide/render-function.html
 * render - just scopedSlots.default alias
 */
export default {
  name: 'ITable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableRef: {
      type: String,
      default: undefined
    }
  },
  mounted () {
    const vm = this.$options.parent
    if (this.tableRef) vm.$refs[this.tableRef] = this.$refs['i-table']
  },
  render () {
    const { columns, $options: { parent: vm } } = this
    const tableProps = {
      ref: 'i-table',
      class: 'i-table',
      props: Object.assign({},
        (this.$EASYELEMENT?.table || {}),
        this.$attrs
      ),
      on: this.$listeners
    }
    const tableColumns = []
    columns.reduce((pre, col, index) => {
      if (!col.vif || (typeof col.vif === 'function' && col.vif(col, index))) {
        const { slot, render, directives } = col
        const columnProps = {
          props: Object.assign({ key: index }, col)
        }
        if (render) columnProps.scopedSlots = { default: render.bind(vm) }
        else if (this.$scopedSlots[slot]) columnProps.scopedSlots = { default: this.$scopedSlots[slot] }
        // use for backstoped
        else if (this.$slots[slot]) columnProps.scopedSlots = { default: () => this.$slots[slot] }
        if (directives) columnProps.directives = directives
        pre.push(<el-table-column {...columnProps} />)
      }
      return pre
    }, tableColumns)
    return (
      <el-table {...tableProps}>
        {tableColumns}
      </el-table>
    )
  }
}
</script>
