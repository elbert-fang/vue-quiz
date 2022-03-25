import Vue from 'vue'
import Vuex from 'vuex'
// import questions from '../assets/questions.json'
import questions from './modules/questions'
Vue.use(Vuex)

// look at use vuex modules
// root only store setup is only for small project

export const store = new Vuex.Store({
  modules: {
    questions
  }
})