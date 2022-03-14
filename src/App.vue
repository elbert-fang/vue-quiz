<template>
  <section class="container-app">
    <div class="container-quiz">
      <div class="quiz-header">
        <h1>Quiz App</h1>
      </div>
      <!-- Rewrite following section, repalce the slice with a simple for loop, using computed value-- current question, -->
      <div class="quiz-main">
        <div class="box-question">
          <h2>Question {{ currentQuestionIndex + 1 }}/ {{questions.length}}</h2>
          <p>{{currentQuestion.question}}</p>
        </div>
      <div class="box-suggestions">
          <ul>
            <li v-for="(item,index) in currentQuestion.suggestions" :key="index" :class="select ? check(item) : ''" @click="selectResponse(item)">
              {{item.suggestion}}
            </li>
          </ul>
        </div>      
      </div>
      <div class="box-score" v-if="score_show">
        <h2>Your score is </h2>
        <h2>{{score}}/{{questions.length}}</h2>
        <div class="btn-restart">
          <button @click="restartQuiz">Restart <i class="fas fa-sync-alt"></i></button>
        </div>
      </div>

      <div class="quiz-footer">
        <div class="box-button">
          <button @click="skipQuestion">Skip</button>
          <button @click="nextQuestion">Next</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      questions:[
        {
          question:'Question 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          suggestions:[
            {suggestion: 'A.Lorem ipsum', correct:true},
            {suggestion: 'B.Lorem ipsum'},
            {suggestion: 'C.Lorem ipsum'},
            {suggestion: 'D.Lorem ipsum'},
          ]
        },
        {
          question:'Question 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          suggestions:[
            {suggestion: 'A.Lorem ipsum'},
            {suggestion: 'B.Lorem ipsum'},
            {suggestion: 'C.Lorem ipsum', correct:true},
            {suggestion: 'D.Lorem ipsum'},
          ]
        },
        {
          question:'Question 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          suggestions:[
            {suggestion: 'A.Lorem ipsum'},
            {suggestion: 'B.Lorem ipsum', correct:true},
            {suggestion: 'C.Lorem ipsum'},
            {suggestion: 'D.Lorem ipsum'},
          ]
        },
        {
          question:'Question 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          suggestions:[
            {suggestion: 'A.Lorem ipsum'},
            {suggestion: 'B.Lorem ipsum'},
            {suggestion: 'C.Lorem ipsum'},
            {suggestion: 'D.Lorem ipsum', correct:true},
          ]
        },
        {
          question:'Question 5 Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          suggestions:[
            {suggestion: 'A.Lorem ipsum', correct:true},
            {suggestion: 'B.Lorem ipsum'},
            {suggestion: 'C.Lorem ipsum'},
            {suggestion: 'D.Lorem ipsum'},
          ]
        },        
      ],
      // a:0,
      // b:1,
      currentQuestionIndex: 0,
      select:false,
      score:0,
      quiz:true,
      score_show: false
    }
  },
  computed:{
    currentQuestion(){
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods:{
    selectResponse(e){
      this.select = true;
      if(e.correct){
        this.score++;
      }
    },
    check(status){
      if(status.correct){
        return 'correct'
      } else{
        return 'incorrect'
      }
    },
    nextQuestion(){
      if(this.questions.length -1 === this.currentQuestionIndex){
        this.score_show = true;
      } else{
        this.currentQuestionIndex+=1;
      }
    },
    skipQuestion(){
      if(this.questions.length -1 == this.a){
        this.score_show = true;
        this.quiz = false;
      } else{
        this.a++;
        this.b++;
      }
    },
    restartQuiz(){
      Object.assign(this.$data, this.$options.data()); // reset data
    }
  }
}
</script>
