import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/HomePage/Home'
import About from './../components/About/About.vue'
import Form from './../components/Login/login'
import Cart from './../components/Mycart/cart'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
