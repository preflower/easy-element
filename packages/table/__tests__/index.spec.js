import Vue, { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import ITable from '../index.vue'

Vue.use(ElementUI)

describe('ITable', () => {
  describe('rendering is correct', () => {
    const tableData = [
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
    ]
    const wrapper = mount({
      components: {
        ITable
      },
      template: `
      <i-table
        :data="table.list"
        :columns="table.columns"
      >
        <template v-slot:data3="{row}">
          {{ row.data3 }}
        </template>
      </i-table>
      `,
      data () {
        return {
          vif: true,
          table: {
            list: tableData,
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
    })

    it('el-table is rendered', async () => {
      await nextTick()
      expect(wrapper.find('.el-table').exists()).toBe(true)
      expect(wrapper.find('table').exists()).toBe(true)
    })

    it('el-table-column is conrrect', () => {
      const headers = wrapper.findAll('thead th').wrappers.map((node) => node.text())
      expect(headers).toEqual(['Default', 'Render', 'Slot'])

      const cells = wrapper.findAll('td .cell').wrappers.map((node) => node.text())
      const flatTableData = tableData.flatMap((cur) => {
        return Object.values(cur).map(String)
      })
      expect(cells).toEqual(flatTableData)
    })
  })

  describe('table\'s attributes is work', () => {
    const handleMouseenter = jest.fn()
    const wrapper = mount({
      components: {
        ITable
      },
      template: `
      <i-table
        ref="table"
        tableRef="tableRef"
        :data="table.list"
        :columns="table.columns"
        @cell-mouse-enter="handleMouseenter"
        stripe
      />
      `,
      data () {
        return {
          table: {
            list: [
              {
                data1: '123'
              },
              {
                data1: '321'
              }
            ],
            columns: [
              {
                label: 'Default',
                prop: 'data1'
              }
            ]
          }
        }
      },
      methods: {
        handleMouseenter
      }
    })

    it('attributes is work', async () => {
      await nextTick()
      expect(wrapper.find('.el-table__row--striped').exists()).toBe(true)
    })

    it('events is work', async () => {
      const cell = wrapper.findAll('.el-table__body .el-table__cell')
      await cell.trigger('mouseenter')
      expect(handleMouseenter).toBeCalled()
    })

    it('tableRef is work', () => {
      const tableRef = wrapper.vm.$refs.tableRef
      const table = wrapper.findComponent({ ref: 'table' }).vm.$refs['i-table']
      expect(tableRef).toBe(table)
    })
  })

  describe('table-column\'s attributes is work', () => {
    const wrapper = mount({
      components: {
        ITable
      },
      template: `
      <i-table
        :data="table.list"
        :columns="table.columns"
      >
        <template #data2="{row}">
          {{ row.data2 }}
        </template>
      </i-table>
      `,
      data () {
        return {
          vif: true,
          table: {
            list: [
              {
                data1: '123',
                data2: 'test',
                data3: 'vif'
              }
            ],
            columns: [
              {
                label: 'Default',
                prop: 'data1',
                width: '50px'
              },
              {
                label: 'Slot',
                slot: 'data2'
              },
              {
                label: 'vif',
                vif: () => this.vif,
                prop: 'data3'
              }
            ]
          }
        }
      },
      methods: {
        setValue (key, value) {
          this[key] = value
        }
      }
    })

    it('attributes is work', async () => {
      expect(wrapper.find('colgroup col').element.width).toBe('50')
    })

    it('vif is work', async () => {
      const vm = wrapper.vm
      expect(wrapper.findAll('thead th').wrappers.map((node) => node.text()))
        .toEqual(expect.arrayContaining(['vif']))
      vm.setValue('vif', false)
      await nextTick()
      expect(wrapper.findAll('thead th').wrappers.map((node) => node.text()))
        .not.toEqual(expect.arrayContaining(['vif']))
    })
  })
})
