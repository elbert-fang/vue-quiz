<template>
  <div class="home-wrapper">
    <div class="content">
      <h2 class="heading"> Quiz Time! </h2>

      <div class="flex flex-column">
        <template v-if="!(name && age)">
          <p> Firt thing first, what's your name? </p>
          <input class="name-input full-width my-1"
            id="name_input"
            v-model="name"
            placeholder="Type your name here" />
          <button class=""
            :disabled="loading"
            @click="getAge">Look up your age</button>
        </template>

        <p class="full-width"
          v-if="loading">Loading</p>
        <template v-else>
          <p v-if="errorMsg">{{ errorMsg }}</p>
          <template v-if="name && age">
            <p class="my-1">Hi {{name}}, the system guessed you are {{age}} years old. <br />
              (It's not always accurate, don't be offened!😝)<br />
              Anyway.., Let's play some quiz!
            </p>
            <a href="/quiz"><button class="btn-start">Start Quiz</button></a>
          </template>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomePage',

  data() {
    return {
      name: '',
      age: 0,
      errorMsg: '',
      loading: false
    }
  },

  methods: {
    async getAge() {
      const baseurl = 'https://api.agify.io?'
      this.errorMsg = ''  // reset the error msg
      this.loading = true

      try {
        const result = await fetch(`${baseurl}name=${this.name}`)
        const json = await result.json()
        this.age = json.age
      } catch (error) {
        this.errorMsg = 'There was an error, please try again'
        this.age = 0
      } finally {
        this.loading = false
      }


    }
  }

}
</script>
