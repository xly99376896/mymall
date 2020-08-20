import Toast from './Toast.vue'
import Vue from 'vue'

const obj = {}

obj.install = function() {
    //1.创建组件构造器
    const toastConstrustor = Vue.extend(Toast)

    //2.new的方式，根据组件构造器，传建一个组件对象
    const toast = new toastConstrustor()

    //3.将组件对象手动挂载
    toast.$mount(document.createElement('div'))

    //4.toast.$el对应的是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj