import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Admin from '@/views/Admin'
import Home from '@/views/Home'
import Login from '@/views/login'
import AdminManager from '@/views/adminManager'
import UserManager from '@/views/userManager'
import AppManager from '@/views/appManager'
import PersonalCenter from '@/views/personalCenter'
import Test from '@/views/test'
import Main from '@/views/main'
import HomePage from '@/views/homePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'adminManager',
          name: 'AdminManager',
          component: AdminManager
        },
        {
          path: 'userManager',
          name: 'UserManager',
          component: UserManager
        },
        {
          path: 'appManager',
          name: 'AppManager',
          component: AppManager
        },
        {
          path: 'personalCenter',
          name: 'PersonalCenter',
          component: PersonalCenter
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/workspace',
      name: 'Main',
      component: Main
    },
    {
      path: '/homePage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
