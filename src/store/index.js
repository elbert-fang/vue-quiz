import Vue from 'vue'
import Vuex from 'vuex'
import questions from '../assets/questions.json'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    questions: questions
  },

  getters: {
    getQuestions: state => {
      return state.questions
    }
  },

  mutations: {

  },

  actions: {

  }


})