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
  name: 'App',
  components: {
    'home-page': HomePage,
  },
}
</script>
