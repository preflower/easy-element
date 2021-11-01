# Table 表格

## 示例
<vuep template="#table-base" :options="{ theme: 'vue', lineNumbers: false }"></vuep>

<script v-pre type="text/x-template" id="table-base">
<template>
  <i-table :data="table.list" :columns="table.columns">
    <template v-slot:data3="{row}">
      {{ row.data3 }}
    </template>
  </i-table>
</template>

<script>
module.exports = {
  data () {
    return {
      vif: true,
      table: {
        list: [
          {
            data1: 'row1-1',
            data2: 'row1-2',
            data3: 'row1-3'
          },
          {
            data1: 'row2-1',
            data2: 'row2-2',
            data3: 'row2-3'
          }
        ],
        columns: [
          {
            label: 'Default',
            prop: 'data1'
          },
          {
            label: 'Render',
            render: ({ row }) => {
              return <span>{ row.data2 }</span>
            }
          },
          {
            label: 'Slot',
            slot: 'data3'
          }
        ]
      }
    }
  }
}
</script>
</script>

## Table Attributes
支持[Element-UI Table](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)的所有属性

| 参数 | 说明 | 类型 | 可选值	| 默认值 |
| --- | --- | --- | --- | --- |
| formRef | 替代`ref`属性，用于透传`el-form`的`ref`值 | Ref | - | -
| columns | 需要渲染的`el-table-column`字段 | column[] | - | -

> TIPS: 也可以使用`this.$refs[u set name].$refs['i-table']`去调用table的相关方法

## Column Attributes
支持[Element-UI Column](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)的所有属性

| 参数 | 说明 | 类型 | 可选值	| 默认值 |
| --- | --- | --- | --- | --- |
| vif | 是否展示该column，`v-if`语法糖 | boolean | false
| slot | 即`v-slot`语法糖 | - | -
| directives | 即`v-directives`语法糖 | - | -
| render | 渲染函数，用于满足`el-table-column`内多组件渲染需求
