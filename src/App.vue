<template>
  <div id="app">
    <div class="columns is-mobile">
      <div class="column is-narrow">
        <NavMenu/>
      </div>
      <div class="column">
            <router-view/>
      </div>
    </div>
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
  </div>
</template>


<script>
// @ is an alias to /src
import NavMenu from "@/components/NavMenu.vue";

export default {
  name: "app",
  components: {
    NavMenu
  }
};
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1, h2, h3{
    font-weight: 600;
    line-height: 1.125;
}
h1{
  font-size: 2rem !important;
  color: #363636 !important;

}
h2{
  font-size: 1.6rem !important;
  color: #4a4a4a !important;
}
h3{
  font-size: 1.25rem !important;
    color: #363636 !important;
}

code{
  color: #de4b50 !important;
}
pre code{
  color: #4a4a4a !important;
}

</style>
