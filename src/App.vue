<template>
  <div id="app">
    <Main></Main>
    <!-- <Login /> -->
  </div>
</template>

<script>
import Main from './components/main'
export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style>
  html,body,#app,h2,h3,img,p,a{
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  html,body,#app{
    width: 100%;
    height: 100%;
  }
</style>
