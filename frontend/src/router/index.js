import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index/index.vue'

Vue.use(VueRouter)
function isMobile() {
  let flag = navigator.userAgent.match( // match方法可在字符串内检索指定的值，
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  // console.log(flag)
  return flag;
}
const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
