<template>
  <section class="container-app">
    <div class="container-quiz">
      <div class="quiz-header">
        <h1>Quiz App</h1>
      </div>
      <!-- Rewrite following section, repalce the slice with a simple for loop, using computed value-- current question, -->
      <div class="quiz-main"
        v-if="doingQuiz">
        <div class="box-question">
          <h2>
            Question {{ currentQuestionIndex + 1 }}/ {{ questions.length }}
          </h2>
          <p>{{ currentQuestion.question }}</p>
        </div>
        <div class="box-suggestions">
          <ul>
            <li v-for="(item, index) in currentQuestion.suggestions"
              :key="index"
              :class="optionClasses(index)"
              @click="selectResponse(item, index)">
              {{ item.suggestion }}
            </li>
          </ul>
        </div>
      </div>

      <div class="box-score"
        v-else>
        <h2>Your score is</h2>
        <h2>{{ score }}/{{ questions.length }}</h2>
        <div class="btn-restart">
          <button @click="restartQuiz">
            Restart <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <div class="quiz-footer">
        <div class="box-button">
          <button @click="nextQuestion">Next</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      questions: [
        {
          question:
            "Question 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          suggestions: [
            { suggestion: "A.Lorem ipsum", correct: true },
            { suggestion: "B.Lorem ipsum" },
            { suggestion: "C.Lorem ipsum" },
            { suggestion: "D.Lorem ipsum" },
          ],
        },
        {
          question:
            "Question 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          suggestions: [
            { suggestion: "A.Lorem ipsum" },
            { suggestion: "B.Lorem ipsum" },
            { suggestion: "C.Lorem ipsum", correct: true },
            { suggestion: "D.Lorem ipsum" },
          ],
        },
        {
          question:
            "Question 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          suggestions: [
            { suggestion: "A.Lorem ipsum" },
            { suggestion: "B.Lorem ipsum", correct: true },
            { suggestion: "C.Lorem ipsum" },
            { suggestion: "D.Lorem ipsum" },
          ],
        },
        {
          question:
            "Question 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          suggestions: [
            { suggestion: "A.Lorem ipsum" },
            { suggestion: "B.Lorem ipsum" },
            { suggestion: "C.Lorem ipsum" },
            { suggestion: "D.Lorem ipsum", correct: true },
          ],
        },
        {
          question:
            "Question 5 Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          suggestions: [
            { suggestion: "A.Lorem ipsum", correct: true },
            { suggestion: "B.Lorem ipsum" },
            { suggestion: "C.Lorem ipsum" },
            { suggestion: "D.Lorem ipsum" },
          ],
        },
      ],
      // a:0,
      // b:1,
      currentQuestionIndex: 0,
      score: 0,
      doingQuiz: true,
      results: [],
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]
    }
  },
  methods: {
    selectResponse(option, index) {
      this.results.push({ ...option, index })
      if (option.correct) {
        this.score++
      }
    },
    optionClasses(index) {
      const thisSuggestion = this.currentQuestion.suggestions[index]
      const answer = this.results[this.currentQuestionIndex]
      if (answer) {
        return {
          answered: true,
          correct: thisSuggestion.correct,
          selectedAnswer: answer.index === index
        }
      }
    },
    nextQuestion() {
      if (this.questions.length - 1 === this.currentQuestionIndex) {
        this.doingQuiz = false
      } else {
        this.currentQuestionIndex += 1
      }
    },
    restartQuiz() {
      Object.assign(this.$data, this.$options.data()) // reset data
    },
  },
}
</script>


  git config --global user.email "elbert.fang@megaport.com"
  git config --global user.name "elbert"
