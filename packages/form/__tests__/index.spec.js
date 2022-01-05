import Vue, { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import IForm from '../index.vue'

Vue.use(ElementUI)

describe('IForm', () => {
  describe('rendering is correct', () => {
    const wrapper = mount({
      components: {
        IForm
      },
      template: `
      <i-form :fields="fields">
        <template v-slot:checkbox>
          <el-checkbox>多选</el-checkbox>
        </template>
      </i-form>
      `,
      data () {
        return {
          fields: [
            {
              label: 'Component',
              prop: 'input',
              component: {
                name: 'el-input'
              }
            },
            {
              label: 'Vif',
              vif: false,
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
    })

    it('el-form is rendered', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('el-form-item is correct', () => {
      const length = wrapper.findAll('.el-form-item').length
      expect(length).toBe(3)
    })

    it('component is correct', () => {
      expect(wrapper.find('.el-input').exists()).toBe(true)
    })

    it('render is correct', () => {
      expect(wrapper.find('.el-radio').exists()).toBe(true)
    })

    it('slot is correct', () => {
      expect(wrapper.find('.el-checkbox').exists()).toBe(true)
    })
  })

  describe('form\'s attributes is work', () => {
    const handleValidate = jest.fn()
    const wrapper = mount({
      components: {
        IForm
      },
      template: `
        <i-form 
          ref="form"
          formRef="formRef"
          :fields="fields" 
          :model="model" 
          :rules="rules" 
          @validate="handleValidate"
          inline 
        />
      `,
      data () {
        return {
          model: {
            input: ''
          },
          rules: {
            input: [
              { required: true, message: 'input cannot be empty' }
            ]
          },
          fields: [
            {
              label: 'component',
              prop: 'input',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      },
      methods: {
        handleValidate
      }
    })

    it('attributes is work', () => {
      expect(wrapper.find('.el-form--inline').exists()).toBe(true)
    })

    it('formRef is work', () => {
      const formRef = wrapper.vm.$refs.formRef
      const form = wrapper.findComponent({ ref: 'form' }).vm.$refs['i-form']
      expect(formRef).toBe(form)
    })

    it('events and validate is work', async () => {
      const form = wrapper.findComponent({ ref: 'form' }).vm.$refs['i-form']
      const valid = await form.validate()
        .then(() => true)
        .catch(e => false)
      expect(valid).toBe(false)
      expect(handleValidate).toBeCalled()
    })
  })

  describe('form-item\'s attributes is work', () => {
    const wrapper = mount({
      components: {
        IForm
      },
      template: `
        <i-form :fields="fields" />
      `,
      data () {
        return {
          fields: [
            {
              label: 'component',
              prop: 'input',
              'label-width': '50px',
              error: 'input error message',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      }
    })

    it('attributes is work', () => {
      expect(wrapper.find('.el-form-item__label').element.style.width).toBe('50px')

      expect(wrapper.find('.el-form-item__error').text()).toBe('input error message')
    })
  })

  describe('field is work', () => {
    const handleFocus = jest.fn()
    const wrapper = mount({
      components: {
        IForm
      },
      template: `
        <i-form :fields="fields" :model="model" />
      `,
      data () {
        return {
          model: {
            input: ''
          },
          fields: [
            {
              label: 'component',
              prop: 'input',
              component: {
                name: 'el-input',
                maxlength: 50,
                size: 'mini',
                focus: handleFocus
              }
            }
          ]
        }
      },
      methods: {
        setValue (prop, value) {
          this.model[prop] = value
        }
      }
    })
    const vm = wrapper.vm

    it('v-model auto inject', async () => {
      const el = vm.$el.querySelector('input')
      const simulateEvent = (text, event) => {
        el.value = text
        el.dispatchEvent(new Event(event))
      }

      vm.setValue('input', 'test')
      await nextTick()
      expect(el.value).toBe('test')

      simulateEvent('update', 'input')

      await nextTick()
      expect(vm.$data.model.input).toBe('update')
    })

    it('attributes is work', () => {
      expect(vm.$el.querySelector('input').getAttribute('maxLength')).toBe('50')
    })

    it('props is work', () => {
      expect(wrapper.find('.el-input--mini').exists()).toBe(true)
    })

    it('events is work', async () => {
      const input = wrapper.find('input')
      await input.trigger('focus')
      expect(handleFocus).toBeCalled()
    })
  })

  describe('rendering is correct if fields not inject', () => {
    const wrapper = mount({
      components: {
        IForm
      },
      template: '<i-form />'
    })

    it('el-form is rendered', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })
  })
})
