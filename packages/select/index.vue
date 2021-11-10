<template>
  <el-select
    v-model="selected"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="item of data"
      :key="item[selectOption['value']]"
      :value="item[selectOption['value']]"
      :label="item[selectOption['label']]"
      :disabled="disabled(item)"
    />
  </el-select>
</template>

<script>
/**
 * <i-select></i-select>
 * Attributes:
 *  data - 显示的数据
 *  option - 数据的属性名，默认值: { label, value, disabled }
 * Events:
 *  disabled-method - option is disabled
 * Tips:
 *  if need group, please use `el-select`, because enhance
 *  just to simplified code not increase mental burden
 */
export default {
  name: 'ISelect',
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    data: {
      type: Array,
      default: () => []
    },
    option: {
      type: Object,
      default: undefined
    },
    disabledMethod: {
      type: Function,
      default: undefined,
      required: false
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  computed: {
    selectOption () {
      return (
        this.option ||
        (this.$EASYELEMENT?.select || {}).option ||
        {
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        }
      )
    }
  },
  watch: {
    value (val) {
      this.selected = val
    },
    selected (val) {
      this.$emit('change', val)
    }
  },
  methods: {
    disabled (item) {
      if (item[this.selectOption.disabled]) return item[this.selectOption.disabled]
      if (this.disabledMethod) return this.disabledMethod(item)
      return false
    }
  }
}
</script>
