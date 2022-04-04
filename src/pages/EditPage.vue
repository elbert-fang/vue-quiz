<template>
  <div class="home-wrapper">
    <div class="heading">
      <h2> Edit Quiz </h2>
      <p> Make changes to quizs here. </p>
    </div>

    <div class="quiz-section">
      <table class="quiz">
        <thead class="my-1">
          <td>#</td>
          <td>Question</td>
          <td>Type</td>
          <td>Suggestions</td>
          <td>Correct Option</td>
          <td>Edit</td>
        </thead>

        <tr v-for="(q, index) in allQuestions"
          :key="index"
          class="my-1">
          <td> {{ index +1 }}</td>
          <!-- Question -->
          <td>
            <input v-if="q.isEditable"
              v-model="q.question"
              type="text"
              :disabled="!q.isEditable">
            <p v-else>
              {{ q.question }}
            </p>
          </td>
          <!-- Type -->
          <td>
            <p>{{ q.type }}</p>
          </td>
          <!-- Suggestions -->
          <td>
            <ol v-for="(s, index) in q.suggestions"
              :key="index">
              <li>
                <input v-if="q.isEditable"
                  v-model="s.suggestion"
                  type="text"
                  :disabled="!q.isEditable">
                <p v-else>
                  <span v-if="q.type==='Multiple Choice'">{{ index + 1 }}. </span> {{ s.suggestion }}
                </p>
              </li>
            </ol>
          </td>
          <!-- Print out correct answer, and input value -->
          <td>
            <template v-if="q.type === 'Multiple Choice'">
              <select v-if="q.isEditable"
                :value="correctIndex(q.suggestions) + 1"
                @change="selectCorrectAnswer($event.target.value, q)">
                <option v-for="option in 4"
                  :key="option"
                  :value="option">
                  {{ option }}
                </option>
              </select>
              <p v-else>
                {{ correctIndex(q.suggestions) + 1 }}
              </p>
            </template>
            <p v-else>
              -
            </p>
          </td>

          <!-- Edit or Remove -->
          <td>
            <button @click.prevent="edit(index)">
              {{ q.isEditable ? 'Save' : 'Edit' }}
            </button>
            <button @click="remove(index)">
              Delete
            </button>
          </td>
        </tr>
      </table>

      <!-- Add Quiz -->
      <div class="add-question my-1">
        <div class="heading">
          <h2> Add Quiz</h2>
          <p> Add some new quizs to your quiz database </p>
        </div>

        <form class="flex flex-column">
          <div class="my-1-2 flex flex-column">
            <label for="question">Question</label>
            <textarea id="question"
              v-model="newQuestion"
              rows="3"
              :class="{'error-input': errors.newQuestion !== undefined}" />
            <span v-if="errors.newQuestion"
              class="error-message"> {{ errors.newQuestion }}</span>
          </div>

          <!-- Types -->
          <div class="my-1-2 flex flex-column">
            <label for="type">Quiz Type</label>
            <select id="type"
              v-model="type"
              :class="{'error-input': errors.type !== undefined}">
              <option value=""
                disabled
                selected>
                Select the question type 🔽
              </option>
              <option key="MultipleChoicer"
                value="Multiple Choice">
                Multiple Choice
              </option>
              <option key="ShortAnswer"
                value="Short Answer">
                Short Answer
              </option>
            </select>
            <span v-if="errors.type"
              class="error-message"> {{ errors.type }}</span>
          </div>

          <div v-if="type === 'Short Answer'"
            class="my-1-2 flex flex-column">
            <label for="suggetsion"> Suggestion </label>
            <textarea id="suggestion"
              v-model="suggestion"
              rows="3"
              :class="{'error-input': errors.suggestion !== undefined}" />
            <span v-if="errors.suggestion"
              class="error-message"> {{ errors.suggestion }}</span>
          </div>

          <template v-else-if=" type === 'Multiple Choice'">
            <div class="my-1-2 flex flex-column">
              <label for="suggetsion1"> Suggestion 1 </label>
              <textarea id="suggestion1"
                v-model="suggestionOne"
                rows="3"
                :class="{'error-input': errors.suggestionOne !== undefined}" />
              <span v-if="errors.suggestionOne"
                class="error-message"> {{ errors.suggestionOne }}</span>
            </div>

            <div class="my-1-2 flex flex-column">
              <label for="suggetsion2"> Suggestion 2 </label>
              <textarea id="suggestion2"
                v-model="suggestionTwo"
                rows="3"
                :class="{'error-input': errors.suggestionTwo!== undefined}" />
              <span v-if="errors.suggestionTwo"
                class="error-message"> {{ errors.suggestionTwo }}</span>
            </div>

            <div class="my-1-2 flex flex-column">
              <label for="suggetsion3"> Suggestion 3</label>
              <textarea id="suggestion3"
                v-model="suggestionThree"
                rows="3"
                :class="{'error-input': errors.suggestionThree!== undefined}" />
              <span v-if="errors.suggestionThree"
                class="error-message"> {{ errors.suggestionThree }}</span>
            </div>

            <div class="my-1-2 flex flex-column">
              <label for="suggetsion4"> Suggestion 4</label>
              <textarea id="suggestion4"
                v-model="suggestionFour"
                :class="{'error-input': errors.suggestionFour!== undefined}" />
              <span v-if="errors.suggestionFour"
                class="error-message"> {{ errors.suggestionFour }}</span>
            </div>

            <div class="my-1-2 flex flex-column">
              <label for="correct_option"> Correct answer</label>
              <select id="correct_option"
                v-model="correctOption"
                :class="{'error-input': errors.correctOption!== undefined}">
                <option value=""
                  disabled
                  selected>
                  Select the correct answer 🔽
                </option>
                <option v-for="option in 4"
                  :key="option"
                  :value="option">
                  {{ option }}
                </option>
              </select>
              <span v-if="errors.correctOption"
                class="error-message"> {{ errors.correctOption }}</span>
            </div>
          </template>

          <button class="my-1"
            @click.prevent="add">
            Add
          </button>
        </form>
      </div>
      <!-- End of Add Quiz -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'EditPage',

  data() {
    return {
      newQuestion: '',
      type: '',
      suggestion: '',
      suggestionOne: '',
      suggestionTwo: '',
      suggestionThree: '',
      suggestionFour: '',
      correctOption: '',
      errors: {},
      updateCorrectOption: '',
    }
  },

  computed: {
    ...mapState({
      allQuestions: state => state.questions.questions,
    }),


  },

  methods: {
    ...mapMutations('questions', ['deleteQuestion', 'addQuestions']),

    correctIndex(suggestions) {
      return suggestions.map(e => e.correct).indexOf(true)
    },

    remove(index) {
      this.deleteQuestion(index)
    },

    edit(index) {
      // when edit button clicked
      // 1. Change disabled to false
      // 2. User can update data
      // 3. when click edit button got clicked again, save the data to 'question'
      // const correctOption = this.correctIndex(this.allQuestions[index])
      // this.updateCorrectOption = this.correctIndex(this.allQuestions[index])
      this.allQuestions[index].isEditable = !this.allQuestions[index].isEditable
      // if (correctOption !== this.updateCorrectOption) {

      // }
    },


    add() {
      if (!this.validateForm()) {
        return
      }

      if (this.type === 'Multiple Choice') {
        const question = {
          question: this.newQuestion,
          type: 'Multiple Choice',
          isEditable: false,
          suggestions: [
            {
              suggestion: this.suggestionOne,
            },
            {
              suggestion: this.suggestionTwo,
            },
            {
              suggestion: this.suggestionThree,
            },
            {
              suggestion: this.suggestionFour,
            },
          ],
        }
        question.suggestions[this.correctOption - 1].correct = true
        this.addQuestions(question)
      } else if (this.type === 'Short Answer') {
        const shortAnswerQuestion = {
          question: this.newQuestion,
          type: 'Short Answer',
          isEditable: false,
          suggestions: [
            {
              suggestion: this.suggestion,
              correct: true,
            },
          ],
        }
        this.addQuestions(shortAnswerQuestion)
      }
    },

    selectCorrectAnswer(selectedOption, question) {
      // array.map
      const correctAnswer = Number.parseInt(selectedOption)
      question.suggestions = question.suggestions.map((element, index) => {
        return {
          suggestion: element.suggestion,
          ...index === correctAnswer - 1 && { correct: true }, // only add the correct key if the index key is what I'm waitin for
        }
      })

      // const correctAnswer = Number.parseInt(selectedOption)
      // // remove correct from the original suggestion
      // for (let index = 0; index < question.suggestions.length; index++) {
      //   const element = question.suggestions[index]

      //   if (index === correctAnswer - 1) {
      //     element.correct = true
      //   } else if (element.correct) {
      //     delete element.correct // use delete to remove key
      //   }
      // }


      // alternative method -- for of
      // const correctAnswer = Number.parseInt(index)
      // for (const element of question.suggestions) {
      //   delete element.correct
      // }
      // question.suggestions[correctAnswer - 1].correct = true
    },

    validateForm() {
      // Error handling

      // Step 0. Empty the data before processing errors
      this.errors = {}

      // Step 1. Collect all error put them in an object
      if (!this.newQuestion) {
        this.errors.newQuestion = "New question can't be empty"
      }
      // Validation for Multiple Choice
      if (this.type === 'Short Answer') {
        if (!this.suggestion) {
          this.errors.suggestion = "Suggestion can't be empty"
        }
      } else if (this.type === 'Multiple Choice') {
        if (!this.suggestionOne) {
          this.errors.suggestionOne = "Suggestion 1 can't be empty"
        }

        if (!this.suggestionTwo) {
          this.errors.suggestionTwo = "Suggestion 2 can't be empty"
          console.log('I have been called 3')
        }
        if (!this.suggestionThree) {
          this.errors.suggestionThree = "Suggestion 3 can't be empty"
        }

        if (!this.suggestionFour) {
          this.errors.suggestionFour = "Suggestion 4 can't be empty"
        }

        if (!this.correctOption) {
          this.errors.correctOption = "Correct option can't be empty"
        }
      } else {
        this.errors.type = "Quiz type can't be empty"
      }
      // console.log(this.errors)
      // return a boolean to suggest validation

      return Object.keys(this.errors).length === 0
    },
  },
}
</script>
