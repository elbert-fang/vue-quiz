<template>
  <div class="home-wrapper">
    <div class="content">
      <h2> Vue Quiz </h2>
      <p> Quiz Time! Firt thing first, what's your name? </p>
      <p>Hi NAME, the system guessed you are XX years old. <br />
        (It's not always accurate, don't be offened!😝)
      </p>
    </div>

    <div class="nav">
      <router-link to="/quiz">Start Quiz</router-link>
      <router-link to="/edit">Edit Quiz</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
