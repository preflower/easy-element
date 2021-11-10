# Select 选择器

## 示例
<vuep template="#table-base" :options="{ theme: 'vue', lineNumbers: false }"></vuep>

<script v-pre type="text/x-template" id="table-base">
<template>
  <i-select
    :data="data"
  />
</template>

<script>
module.exports = {
  data () {
    return {
      data: [
        {
          label: '测试1',
          value: 'test1'
        }, {
          label: '测试2',
          value: 'test2',
          disabled: true
        }
      ]
    }
  }
}
</script>
</script>

## Select Attributes
支持[Element-UI Select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)的所有属性

| 参数 | 说明 | 类型 | 可选值	| 默认值 |
| --- | --- | --- | --- | --- |
| data | 需要渲染的`el-option`字段 | Array | - | []
| option | 获取data内符合option的值，用于渲染`el-option` | Object | - | { label: 'label', value: 'value', disabled: 'disabled' }

> TIPS: `i-select`不支持设置`Group`，因为`i-select`只是为了减少重复劳动，非必要情况不考虑增加使用者的心智负担，若有`Group`需求，请考虑直接使用`el-select`
