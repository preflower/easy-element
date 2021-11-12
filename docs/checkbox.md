# Checkbox 多选框

## 示例
<vuep template="#table-base" :options="{ theme: 'vue', lineNumbers: false }"></vuep>

<script v-pre type="text/x-template" id="table-base">
<template>
  <i-checkbox
    v-model="selected"
    :data="data"
    size="large"
    :option="{label: 'l', value: 'v'}"
    :disabled-method="disabled"
    border
  />
</template>

<script>
module.exports = {
  data () {
    return {
      selected: [],
      data: [
        {
          l: '测试1',
          v: 'test1'
        }, {
          l: '测试2',
          v: 'test2'
        }
      ]
    }
  },
  methods: {
    disabled (item) {
      return item.v === 'test2'
    }
  }
}
</script>
</script>

## Checkbox Attributes
支持[Element-UI Chekbox Group](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes)的所有属性

| 参数 | 说明 | 类型 | 可选值	| 默认值 |
| --- | --- | --- | --- | --- |
| data | 需要渲染的`el-option`字段 | Array | - | []
| option | 获取data内符合option的值，用于渲染`el-checkbox/el-checkbox-button` | Object | - | { label: 'label', value: 'value', disabled: 'disabled' }
| border | 即[Element-UI Checkbox border属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes) | Boolean | - | false
| button | 区分渲染`el-checkbox`还是`el-checkbox-button` | Boolean | - | false

> TIPS: `i-checkbox`默认用`Group`包裹，如果不需要请考虑直接使用`el-checkbox`
