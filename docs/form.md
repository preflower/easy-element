# Form 表单

## 示例
<vuep template="#form-component" :options="{ theme: 'vue', lineNumbers: false }"></vuep>

<script v-pre type="text/x-template" id="form-component">
<template>
  <i-form :fields="fields" :model="model">
    <template v-slot:checkbox>
      <el-checkbox>多选</el-checkbox>
    </template>
  </i-form>
</template>

<script>
module.exports = {
  data() {
    return {
      model: {
        input: ''
      },
      fields: [
        {
          label: 'Component',
          prop: 'input',
          component: {
            name: 'el-input'
          }
        },
        {
          label: 'Render',
          prop: 'radio',
          render: () => {
            return <el-radio>单选</el-radio>
          }
        },
        {
          label: 'Slot',
          prop: 'checkbox',
          slot: 'checkbox'
        }
      ]
    }
  }
}
</script>
</script>

## Form Attributes
支持[Element-UI Form](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)的所有属性

| 参数 | 说明 | 类型 | 可选值	| 默认值 |
| --- | --- | --- | --- | --- |
| formRef | 替代`ref`属性，用于透传`el-form`的`ref`值 | Ref | - | -
| fields | 需要渲染的`el-form-item`字段 | field[] | - | -

> TIPS: 也可以使用`this.$refs[u set name].$refs['i-form']`去调用table的相关方法

## Field Attributes
支持[Element-UI Form-Item](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes)的所有属性

| 参数 | 说明 | 类型 | 可选值	| 默认值 |
| --- | --- | --- | --- | --- |
| component | `el-form-item`内需要渲染的组件 | object | - | -
| render | 渲染函数，用于满足`el-form-item`内多组件渲染需求 | function | - | -
| slot | `v-slot`语法糖
| vif | 判断是否渲染`el-form-item` | Boolean | true/false | true

> TIPS: `component`, `render`, `slot`三者互斥，优先级
`component > render > slot`
> TIPS: `component`无法渲染局部组件，因为`component`的实现决定的

## Component Attributes
支持渲染组件本身的所有属性

| 参数 | 说明 | 类型 | 可选值	| 默认值 |
| --- | --- | --- | --- | --- |
| name | 渲染的组件 | string | - | -
