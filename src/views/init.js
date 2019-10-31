// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'

// 全局重新注册el-form-item组件
import ElFormItem from '@/components/common/el-form-item/el-form-item.vue'
Vue.component('el-form-item', ElFormItem)
// i-form组件全局注册
import IForm from '@/components/common/i-form/i-form.vue'
Vue.component('i-form', IForm)
// i-table组件全局注册
import ITable from '@/components/common/i-table'
Vue.component('i-table', ITable)
// i-layout组件全局注册
// import ILayout from 'components/common/i-layout'
// Vue.component('i-layout', ILayout)

// 更改日期输入框不能输入
Element.DatePicker.props.editable = false

// 修改Autocomplete组件下拉选项宽度为自适应
Element.Autocomplete.watch = {
  suggestionVisible (val) {
    this.broadcast('ElAutocompleteSuggestions', 'visible', [val, 'auto'])
  }
}


import '@/styles/element-theme/index.css'
import '@/styles/index.scss'
Vue.use(Element)

// 更改message的时间延时,默认5秒
let tempMessageFunc = Vue.prototype.$message
let updateMessageFunc = options => {
  return typeof options === 'string'
    ? tempMessageFunc({message: options, duration: 4000})
  : tempMessageFunc(Object.assign({duration: 4000}, options))
}
for (let key in tempMessageFunc) {
  // let kind = ['success', 'warning', 'info', 'error']
//   if (!kind.includes(key)) {
    // updateMessageFunc[key] = tempMessageFunc[key]
//   } else {
    updateMessageFunc[key] = message => updateMessageFunc({type: key, message})
//   }
}
Vue.prototype.$message = updateMessageFunc

Vue.config.productionTip = false
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  return false
}

// 函数原型方法
Function.prototype.after = function (afterFn = (() => {})) {
  let _this = this
  return function () {
    const ret = _this.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

Function.prototype.before = function (beforeFn = (() => {})) {
  let _this = this
  return function () {
    const next = beforeFn.apply(this, arguments)
    if (next) {
      return _this.apply(this, arguments)
    }
  }
}

/**
 * 添加Number对象原型方法, 解决js浮点类型计算出现精度准确的问题
 * add 加 sub 减 div 除 mul 乘
 */
Number.prototype.add = function (arg) {
  if (arg) {
    return accAdd(arg, this)
  } else {
    return accAdd(0, this)
  }
}
Number.prototype.mul = function (arg) {
  return accMul(arg, this)
}
Number.prototype.div = function (arg) {
  // this应为第一个参数
  return accDiv(this, arg)
}
Number.prototype.sub = function (arg) {
  // this应为第一个参数
  return accSub(this, arg)
}

