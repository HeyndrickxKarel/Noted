<template>
  <div id="app">
    <div class="columns is-mobile">
      <div class="column is-narrow">
        <NavMenu/>
      </div>
      <div class="column backgroundcolor">
        <router-view/>
      </div>
    </div>
    <div class="statusbarContainer">
    <Statusbar />
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import NavMenu from "@/components/NavMenu.vue";
import Statusbar from "@/components/Statusbar.vue";

export default {
  name: "app",
  components: {
    NavMenu, Statusbar
  }
  
};
</script>


<style>

@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1,
h2,
h3 {
  font-weight: 600;
  line-height: 1.125;
}
h1 {
  font-size: 2rem !important;
  color: #363636 !important;
}
h2 {
  font-size: 1.6rem !important;
  color: #4a4a4a !important;
}
h3 {
  font-size: 1.25rem !important;
  color: #363636 !important;
}

code {
  color: #de4b50 !important;
}
pre code {
  color: #4a4a4a !important;
}
blockquote {
  border-left: 3px solid #de4b50;
  color: rgba(0, 0, 0, 0.8);
  padding-left: 0.8rem !important;
  font-style: italic;
}
hr {
  background-color: #d4d4d4 !important;
  height: 1px !important;
}
.backgroundcolor{
  background-color: #fafafa;

}
.statusbarContainer{
    position: absolute;
    width: 80%;
    bottom: 10px;
    left: 10%;
}
</style>
