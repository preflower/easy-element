# Radio 单选框

## 示例
<vuep template="#table-base" :options="{ theme: 'vue', lineNumbers: false }"></vuep>

<script v-pre type="text/x-template" id="table-base">
<template>
  <i-radio
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
      selected: null,
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

## Radio Attributes
支持[Element-UI Radio Group](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes)的所有属性

| 参数 | 说明 | 类型 | 可选值	| 默认值 |
| --- | --- | --- | --- | --- |
| data | 需要渲染的`el-option`字段 | Array | - | []
| option | 获取data内符合option的值，用于渲染`el-option` | Object | - | { label: 'label', value: 'value', disabled: 'disabled' }
| border | 即[Element-UI Radio border属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes) | Boolean | - | false
| button | 区分渲染`el-radio`还是`el-radio-button` | Boolean | - | false

> TIPS: `i-radio`默认用`Group`包裹，如果不需要请考虑直接使用`el-radio`
