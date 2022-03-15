import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import EditPage from './pages/EditPage'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'

Vue.use(VueRouter)

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
  render: h => h(App),
}).$mount('#app')
