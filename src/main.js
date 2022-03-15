import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import EditPage from './pages/EditPage'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import { store } from './store'
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/edit', component: EditPage },
    { path: '/quiz', component: QuizPage },
  ]
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
