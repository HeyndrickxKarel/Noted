<template>
  <div>
    <div class="logout">     
      <div>
        <h1>Afmelden</h1>
        <p>{{user}}</p>
        <p class="has-text-left">
          <button v-on:click="logout" class="button is-primary">Afmelden</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      statusMsg: ""
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => { this.$store.commit("setStatusMsg", {message : "Succesvol uitgelogd!", type:"is-info"})
          this.$router.push('/')}         
        )
        .catch(error => (this.$store.commit("setStatusMsg", {message : error.message, type:"is-danger"})));      
    }
  },
  mounted() {
    this.$store.commit("setActivePage", "logout");
  }
};
</script>

<style lang="scss">

</style>
