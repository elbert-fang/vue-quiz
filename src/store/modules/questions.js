import questions from '../../assets/questions.json'

const coreState = {
  questions: questions
}

const getters = {

}

const mutations = {
  addQuestions: (state, newQuesion) => {
    state.questions.push(newQuesion)
  }
}

export default {
  state: coreState,
  getters,
  mutations,
  namespaced: true
}