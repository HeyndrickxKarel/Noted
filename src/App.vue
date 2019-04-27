<template>
  <div id="app" :class="{'smallFont': !userSettings.largeFont, 'darkMode' : userSettings.darkMode}">
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
    userSettings(){
      return this.$store.getters.userSettings;
    }
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
  color: var(--mainFontColor);
}
</style>
