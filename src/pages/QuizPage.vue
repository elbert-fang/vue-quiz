<template>
  <section class="container-app">
    <!-- Quiz section -->
    <template v-if="doingQuiz">
      <div class="container-quiz">
        <div class="quiz-header">
          <h1>Quiz App</h1>
        </div>
        <div class="quiz-main">
          <div class="box-question">
            <h2>
              Question {{ currentQuestionIndex + 1 }}/ {{ allQuestions.length }}
            </h2>
            <p>{{ currentQuestion.question }}</p>
          </div>
          <div class="box-suggestions">
            <ul v-if="currentQuestion.type === 'Multiple Choice'">
              <li v-for="(item, index) in currentQuestion.suggestions"
                :key="index"
                :class="optionClasses(index)"
                @click="selectResponse(item, index)">
                {{ item.suggestion }}
              </li>
            </ul>

            <textarea v-else
              v-model="shortAnswer"
              rows="4"
              cols="60" />
          </div>
        </div>

        <div class="quiz-footer">
          <div class="box-button">
            <button @click="nextQuestion">
              Next
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- Scoring -->
    <div v-else
      class="box-score">
      <div class="mx-auto text-center">
        <h2>Your score is</h2>
        <h3>{{ score }}/{{ allQuestions.length }}</h3>
      </div>

      <div class="my-1">
        <ul v-for="(r, index) in results"
          :key="index">
          <li :key="index"
            class="p-1 my-1"
            :class="[r.result ? 'border-correct': 'border-wrong']">
            <p>{{ `Question ${index +1}: ${r.question}` }}</p>
            <p>{{ `Your answer: ${r.userAnswer}` }}</p>
            <p v-if="!r.result">
              {{ `Correct Answer: ${r.correctAnswer}` }}
            </p>
          </li>
        </ul>

        <div class="btn-restart">
          <button @click="restartQuiz">
            Restart <i class="fas fa-sync-alt" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

// import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
// try out mapstate...
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'QuizPage',

  data() {
    return {
      currentQuestionIndex: 0,
      score: 0,
      doingQuiz: true,
      results: [],
      shortAnswer: '',
      isSelect: false,
    }
  },

  // Question:
  // 1. How to compbine regular computed property with mapState computed?

  computed: {
    // representing the data that relies on other data
    // cache result
    // mapState, mapGetter goes here
    // We don't use setter methods to computed property
    // ...mapState(['questions']),
    ...mapState({
      allQuestions: state => state.questions.questions,
    }),
    // allQuestions() {
    //   // replace the getter function with state directly
    //   return this.$store.state.questions.questions
    // },

    currentQuestion() {
      return this.allQuestions[this.currentQuestionIndex]
    },

    currentCorrectAnswer() {
      return this.currentQuestion.suggestions.find(suggestion => suggestion.correct === true).suggestion
    },
  },


  methods: {
    // change the data
    // mapMutaions, mapActions goes here
    // ...mapMutations(['addQuestions']),

    //  ([MODULE_NAME], [ARRAY_OF_MUTATION_NAME])
    ...mapMutations('questions', ['addQuestions']),

    selectResponse(option, index) {
      if (this.isSelect === false) {
        this.isSelect = true
        const selctResult = {
          question: this.currentQuestion.question,
          correctAnswer: this.currentCorrectAnswer,
          userAnswer: option.suggestion,
          result: option.correct ? true : false,
          index: index,
        }

        this.results.push(selctResult)
        if (option.correct) {
          this.score++
        }
      }
    },

    submitShortAnswer() {
      const correctAnswer = this.currentQuestion.suggestions[0].suggestion

      const shortResult = {
        question: this.currentQuestion.question,
        correctAnswer: correctAnswer,
        userAnswer: this.shortAnswer,
        result: correctAnswer.toUpperCase() === this.shortAnswer.toUpperCase(),
      }

      if (correctAnswer.toUpperCase() === this.shortAnswer.toUpperCase()) {
        this.score++
      }

      this.results.push(shortResult)
      this.shortAnswer = ''
    },

    optionClasses(index) {
      const thisSuggestion = this.currentQuestion.suggestions[index]
      const answer = this.results[this.currentQuestionIndex]
      if (answer) {
        return {
          answered: true,
          correct: thisSuggestion.correct,
          selectedAnswer: answer.index === index,
        }
      }
    },

    nextQuestion() {
      // call submit short answer
      if (this.currentQuestion.type === 'Short Answer') {
        this.submitShortAnswer()
      }

      // increase current questiong index
      if (this.allQuestions.length - 1 === this.currentQuestionIndex) {
        this.doingQuiz = false
      } else {
        this.currentQuestionIndex += 1
      }

      this.isSelect = false
    },

    restartQuiz() {
      Object.assign(this.$data, this.$options.data()) // reset data
    },
  },
}
</script>
