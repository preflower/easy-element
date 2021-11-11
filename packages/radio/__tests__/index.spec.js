import Vue, { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementUI from 'element-ui'

import IRadio from '../index.vue'

Vue.use(ElementUI)

describe('IRadio', () => {
  describe('rendering is correct', () => {
    const wrapper = mount({
      components: {
        IRadio
      },
      template: `
      <i-radio
        :data="data"
      />
      `,
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
    })
    const vm = wrapper.vm

    it('el-radio-group is rendered', () => {
      expect(wrapper.find('.el-radio-group').exists()).toBe(true)
    })

    it('el-radio is correct', () => {
      const length = wrapper.findAll('.el-radio').length
      expect(length).toBe(2)
      const classList = Array.from(vm.$el.querySelectorAll('.el-radio')[1].classList)
      expect(classList.includes('is-disabled')).toBe(true)
    })
  })

  describe('radio\'s attributes is work', () => {
    const handleChange = jest.fn()
    const wrapper = mount({
      components: {
        IRadio
      },
      template: `
      <i-radio
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
        handleChange,
        disabled (item) {
          return item.v === 'test2'
        }
      }
    })
    const vm = wrapper.vm

    it('option is correct', () => {
      const length = wrapper.findAll('.el-radio').length
      expect(length).toBe(2)
      const firstLabel = wrapper.find('.el-radio > .el-radio__label').text()
      expect(firstLabel).toBe('测试1')
    })

    it('attributes is work', () => {
      expect(wrapper.find('.el-radio--large').exists()).toBe(true)
    })

    it('disabled-method is work', () => {
      const classList = Array.from(vm.$el.querySelectorAll('.el-radio')[1].classList)
      expect(classList.includes('is-disabled')).toBe(true)
    })

    it('events is work', async () => {
      const options = vm.$el.querySelectorAll('.el-radio')
      options[0].click()
      await nextTick()
      expect(handleChange).toBeCalled()
    })
  })

  describe('rendering is correct if data not inject', () => {
    const wrapper = mount({
      components: {
        IRadio
      },
      template: '<i-radio />'
    })

    it('el-radio-group is rendered', () => {
      expect(wrapper.find('.el-radio-group').exists()).toBe(true)
    })
  })

  describe('button is correct', () => {
    const wrapper = mount({
      components: {
        IRadio
      },
      template: `
      <i-radio
        :data="data"
        button
      />
      `,
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
    })
    const vm = wrapper.vm

    it('el-radio-group is rendered', () => {
      expect(wrapper.find('.el-radio-group').exists()).toBe(true)
    })

    it('el-radio-button is correct', () => {
      const length = wrapper.findAll('.el-radio-button').length
      expect(length).toBe(2)
      const classList = Array.from(vm.$el.querySelectorAll('.el-radio-button')[1].classList)
      expect(classList.includes('is-disabled')).toBe(true)
    })
  })
})
