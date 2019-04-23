<template>
  <div id="app">
    <div v-if="user && notes">
      <div class="columns is-mobile">
        <div class="column is-narrow">
          <NavMenu/>
        </div>
        <div class="column backgroundcolor">
          <router-view/>
        </div>
      </div>
    </div>
    <div v-if="!user || !notes">
      <Login/>
    </div>
    <div class="statusbarContainer">
      <button v-on:click="showInfo" class="button is-warning">Click me</button>     
      <transition-group name="fly-in">
      <Statusbar v-for="statusMsg in statusMessages" :key="statusMsg.message" :statusMsg="statusMsg"/>
      </transition-group> 
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import NavMenu from "@/components/NavMenu.vue";
import Statusbar from "@/components/Statusbar.vue";
import Login from "@/components/Login.vue";

export default {
  name: "app",
  components: {
    NavMenu,
    Statusbar,
    Login
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    notes() {
      return this.$store.getters.notes;
    },
    statusMessages(){
      return this.$store.getters.statusMessages;
    },
    activeNoteIndex(){
      return this.$store.getters.activeNoteIndex;
    },
  },
  methods: {
    showInfo() {
       this.$store.commit("addStatusMsg", {
            message: 'user:'+ JSON.stringify(this.user),
            type: "is-warning"
          });

              this.$store.commit("addStatusMsg", {
            message: 'activeNoteIndex:'+ this.activeNoteIndex,
            type: "is-warning"
          });
    }
  }
};
</script>


<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";

html {
  overflow-y: hidden !important;
}
#app {
  font-family:  "Avenir",  'Montserrat' ,Helvetica, Arial, sans-serif;
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
}
h2 {
  font-size: 1.6rem !important;
}
h3 {
  font-size: 1.25rem !important;
}
h1 {
  margin-bottom: 40px !important;
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
.backgroundcolor {
  background-color: #fafafa;
}
.statusbarContainer {
  position: absolute;
  width: 80%;
  bottom: 10px;
  left: 10%;
  z-index: 20000;
}

.fly-in {
  animation: fly-in 4s;
}
.fly-in-enter-active {
  animation: fly-in 0.5s;
}
.fly-in-leave-active {
  animation: fly-in 0.5s reverse;
}
@keyframes fly-in {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
