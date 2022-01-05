<template>
  <component
    :is="name"
    :value="value"
    v-bind="$attrs"
    @input="val => { $emit('input', val) }"
    v-on="$listeners"
  >
    {{ children }}
  </component>
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
    children: {
      type: String,
      default: null
    },
    value: {
      type: [String, Array, Object, Boolean, Number],
      default: undefined
    }
  }
}
</script>
