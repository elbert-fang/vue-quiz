<template>
  <section class="container-app">
    <nav class="primary-nav">
      <router-link class="nav-item"
        to="/">
        Home
      </router-link>
      <router-link class="nav-item"
        to="/quiz">
        Quiz
      </router-link>
      <router-link class="nav-item"
        to="/edit">
        Edit
      </router-link>
    </nav>

    <router-view>
      <home-page />
    </router-view>
  </section>
</template>

<script>
import HomePage from './pages/HomePage.vue'
export default {
  name: 'QuizApp', // Name needs to be two words to avoid conflict with html generic tag
  components: {
    'home-page': HomePage,
  },
}
</script>
