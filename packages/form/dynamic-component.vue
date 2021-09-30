<template>
  <component
    :is="name"
    :value="value"
    v-bind="$attrs"
    @input="val => { $emit('input', val) }"
    v-on="$listeners"
  />
</template>

<script>
/**
 * 通过template透传解决JSX无法自动区分prop/attr的问题
 */
export default {
  props: {
    name: {
      type: String,
      default: 'el-input'
    },
    value: {
      type: [String, Array, Object, Boolean],
      default: undefined
    }
  }
}
</script>
