<template>
  <div class="home-wrapper">
    <div class="content">
      <h2 class="heading">
        Quiz Time!
      </h2>

      <div class="flex flex-column">
        <template v-if="!(name && age)">
          <p> Firt thing first, what's your name? </p>
          <input id="name_input"
            v-model="name"
            data-testid="age-input"
            class="name-input full-width my-1"
            placeholder="Type your name here">
          <button class=""
            data-testid="age-button"
            :disabled="loading"
            @click="getAge">
            Look up your age
          </button>
        </template>

        <p v-if="loading"
          class="full-width">
          Loading
        </p>
        <template v-else>
          <p v-if="errorMsg">
            {{ errorMsg }}
          </p>
          <template v-if="name && age">
            <p class="my-1">
              Hi {{ name }}, the system guessed you are {{ age }} years old.
            </p>
            <p> (It's not always accurate, don't be offened!😝) </p>
            <p>
              Anyway.., Let's play some quiz!
            </p>

            <!-- use click event to handle route changes -->
            <button class="btn-start"
              @click="$router.push('/quiz')">
              Start Quiz
            </button>
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
      loading: false,
    }
  },

  methods: {
    async getAge() {
      console.log('I am fetching', this.name)

      const baseurl = 'https://api.agify.io?'
      this.errorMsg = '' // reset the error msg
      this.loading = true

      try {
        const result = await fetch(`${baseurl}name=${this.name}`)
        console.log(result)
        const json = await result.json()
        console.log(json)
        this.age = json.age
      } catch (error) {
        this.errorMsg = 'There was an error, please try again'
        console.log(error)
        this.age = 0
      } finally {
        this.loading = false
      }

      console.log('Age:', this.age)


    },
  },

}
</script>
