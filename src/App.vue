<template>
  <div id="app">
    <i-table
      :data="table.list"
      :columns="table.columns"
      stripe
      @cell-mouse-enter="test"
    >
      <template v-slot:data3="{row}">
        {{ row.data3 }}
      </template>
    </i-table>
    <i-form
      form-ref="form"
      :fields="fields"
      :model="formModel"
    >
      <template v-slot:slott>
        <el-checkbox v-model="formModel.checkbox">
          多选
        </el-checkbox>
      </template>
      <template v-slot:reset>
        <el-button @click="onReset">
          reset
        </el-button>
      </template>
    </i-form>
    <i-select
      :data="select.data"
      :props="{ label: 'l', value: 'v' }"
      size="large"
      :disabled-method="disabled"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      vif: true,
      table: {
        list: [
          {
            data1: '数据1',
            data2: '数据2',
            data3: '数据3',
            data4: '数据4',
            data5: '数据5'
          }, {
            data1: '数据1',
            data2: '数据2',
            data3: '数据3',
            data4: '数据4',
            data5: '数据5'
          }
        ],
        columns: [
          {
            prop: 'data1',
            width: '50px',
            label: '默认配置'
          },
          {
            label: 'Render函数',
            render: ({ row }) => {
              return <span>{ row.data2 }</span>
            }
          },
          {
            label: 'Slot调用',
            slot: 'data3'
          },
          {
            label: '指令配合',
            prop: 'data4',
            directives: [
              {
                name: 'elm',
                value: true
              }
            ]
          },
          {
            label: 'vif切换',
            vif: () => this.vif,
            render: ({ row }) => {
              return <el-button onClick={() => { this.vif = false }}>close</el-button>
            }
          }
        ]
      },
      formModel: {
        input: '123',
        radio: false,
        checkbox: '321'
      },
      fields: [
        {
          label: '配置生成',
          prop: 'input',
          error: '错误信息',
          'label-width': '50px',
          component: {
            name: 'el-input',
            size: 'mini',
            maxlength: '10'
          }
        },
        {
          label: 'Render生成',
          prop: 'radio',
          render: () => {
            return <el-radio vModel={this.formModel.radio}>单选</el-radio>
          }
        },
        {
          label: 'Slot生成',
          prop: 'checkbox',
          slot: 'slott'
        },
        {
          slot: 'reset'
        }
      ],
      select: {
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
    }
  },
  watch: {
    'formModel.input' (val) {
      console.log('change', val)
    }
  },
  methods: {
    onReset () {
      this.$refs.form.resetFields()
    },
    test (row, column, cell, event) {
      console.log(row, column, cell, event)
    },
    disabled (item) {
      return item.v === 'test2'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
