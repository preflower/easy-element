import Vue, { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementUI from 'element-ui'

import ICheckbox from '../index.vue'

Vue.use(ElementUI)

describe('ICheckbox', () => {
  describe('rendering is correct', () => {
    const wrapper = mount({
      components: {
        ICheckbox
      },
      template: `
      <i-checkbox
        v-model="selected"
        :data="data"
      />
      `,
      data () {
        return {
          selected: [],
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
    })
    const vm = wrapper.vm

    it('el-checkbox-group is rendered', () => {
      expect(wrapper.find('.el-checkbox-group').exists()).toBe(true)
    })

    it('el-checkbox is correct', () => {
      const length = wrapper.findAll('.el-checkbox').length
      expect(length).toBe(2)
      const classList = Array.from(vm.$el.querySelectorAll('.el-checkbox')[1].classList)
      expect(classList.includes('is-disabled')).toBe(true)
    })
  })

  describe('checkbox\'s attributes is work', () => {
    const handleChange = jest.fn()
    const wrapper = mount({
      components: {
        ICheckbox
      },
      template: `
      <i-checkbox
        v-model="selected"
        :data="data"
        size="large"
        @change="handleChange"
        :option="{label: 'l', value: 'v'}"
        :disabled-method="disabled"
        border
      />
      `,
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
        handleChange,
        disabled (item) {
          return item.v === 'test2'
        }
      }
    })
    const vm = wrapper.vm

    it('option is correct', () => {
      const length = wrapper.findAll('.el-checkbox').length
      expect(length).toBe(2)
      const firstLabel = wrapper.find('.el-checkbox > .el-checkbox__label').text()
      expect(firstLabel).toBe('测试1')
    })

    it('attributes is work', () => {
      expect(wrapper.find('.el-checkbox--large').exists()).toBe(true)
    })

    it('disabled-method is work', () => {
      const classList = Array.from(vm.$el.querySelectorAll('.el-checkbox')[1].classList)
      expect(classList.includes('is-disabled')).toBe(true)
    })

    it('events is work', async () => {
      const options = vm.$el.querySelectorAll('.el-checkbox')
      options[0].click()
      await nextTick()
      expect(handleChange).toBeCalled()
    })
  })

  describe('rendering is correct if data not inject', () => {
    const wrapper = mount({
      components: {
        ICheckbox
      },
      template: '<i-checkbox v-model="selected" />',
      data () {
        return {
          selected: []
        }
      }
    })

    it('el-checkbox-group is rendered', () => {
      expect(wrapper.find('.el-checkbox-group').exists()).toBe(true)
    })
  })

  describe('button is correct', () => {
    const wrapper = mount({
      components: {
        ICheckbox
      },
      template: `
      <i-checkbox
        v-model="selected"
        :data="data"
        button
      />
      `,
      data () {
        return {
          selected: [],
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
    })
    const vm = wrapper.vm

    it('el-checkbox-group is rendered', () => {
      expect(wrapper.find('.el-checkbox-group').exists()).toBe(true)
    })

    it('el-checkbox-button is correct', () => {
      const length = wrapper.findAll('.el-checkbox-button').length
      expect(length).toBe(2)
      const classList = Array.from(vm.$el.querySelectorAll('.el-checkbox-button')[1].classList)
      expect(classList.includes('is-disabled')).toBe(true)
    })
  })
})
