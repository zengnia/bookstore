import Vue from 'vue'
import Router from 'vue-router'
// 登录
import Login from '../components/login/Login.vue'
// 注册
import Register from '../components/login/Register.vue'
// 入口
import Main from '../components/bookMain/main.vue'
// 首页
import bookMain from '../components/bookMain/bookMain.vue'
// 书籍一览
import findBook from '../components/findBook/main.vue'
// 书籍详情
import bookDetail from '../components/findBook/bookDetail.vue'
// 个人中心
import personCenter from '../components/personCenter/main.vue'
// 管理员界面
import Manage from '../components/manage/main.vue'
// 用户管理-用户信息
import userInfor from '../components/manage/userInfor.vue'
// 用户管理-管理员信息
import managerInfor from '../components/manage/managerInfor.vue'
// 用户管理-用户新增修改
import addOrUpdataUser from '../components/manage/addOrUpdateUser.vue'
// 书籍管理-书籍查询
import bookSearch from '../components/manage/bookSearch.vue'
// 书籍管理-书籍入库
import bookStockIn from '../components/manage/bookStockIn.vue'
// 书籍管理-书籍出库
import bookStockOut from '../components/manage/bookStockOut.vue'
// 书籍管理-销售情况
import bookExcel from '../components/manage/bookExcel.vue'
Vue.use(Router)

let routerConfig = {
    routes: [
      {
        path: '/',
        component: Main,
        children: [
          {
            path: '/',
            name: 'bookMain',
            component: bookMain
          },
          {
            path: '/findBook',
            name: 'findBook',
            component: findBook
          },
          {
            path: '/personCenter',
            name: 'personCenter',
            component: personCenter
          },
          {
            path: '/bookDetail',
            name: 'bookDetail',
            component: bookDetail
          }
        ]
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      },
      {
        path: '/manage',
        component: Manage,
        children: [
          {
            path: '/',
            name: 'userinfor',
            component: userInfor
          },
          {
            path: 'managerinfor',
            name: 'managerinfor',
            component: managerInfor
          },
          {
            path: 'booksearch',
            name: 'booksearch',
            component: bookSearch
          },
          {
            path: 'bookstockin',
            name: 'bookstockin',
            component: bookStockIn
          },
          {
            path: 'bookstockout',
            name: 'bookstockout',
            component: bookStockOut
          },
          {
            path: 'bookexcel',
            name: 'bookexcel',
            component: bookExcel
          },
          
        ]
      }
    ]
  }
  
  export default new Router(routerConfig)
  