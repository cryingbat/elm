import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'
import header from './components/header/header'
import ratings from './components/ratings/ratings'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResouce)
const routes = [
  { path: '/',component: goods },
  { path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings', component: ratings },
]
const router = new VueRouter({
	routes
})

const app = new Vue({
  router,
  render: h => h(App),
   data: {
    eventHub: new Vue()
  	}
}).$mount('#app')