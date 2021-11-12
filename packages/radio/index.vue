<template>
  <el-radio-group
    v-model="selected"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <component
      :is="button ? 'el-radio-button' : 'el-radio'"
      v-for="item of data"
      :key="item[radioOption['value']]"
      :label="item[radioOption['value']]"
      :disabled="disabled(item)"
      :border="border"
    >
      {{ item[radioOption['label']] }}
    </component>
  </el-radio-group>
</template>

<script>
/**
 * Attributes:
 *  data  => 显示的数据
 *  option => 数据的属性名，默认值: { label, value, disabled }
 *  border => 是否显示边框
 * Events:
 *  disabled-method => disabled的计算方法
 */
export default {
  name: 'IRadio',
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
    border: Boolean,
    button: Boolean,
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
    radioOption () {
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
      if (item[this.radioOption.disabled]) return item[this.radioOption.disabled]
      if (this.disabledMethod) return this.disabledMethod(item)
      return false
    }
  }
}
</script>
