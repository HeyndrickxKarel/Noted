<template>
  <div>
    <div class="login">
      <div class="loginContainer" v-if="!user">
        <div class="columns">
          <div class="column">
            <h1 class="title">Log in</h1>
            <form @submit.prevent="signIn">
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    type="email"
                    class="input"
                    v-model="email"
                    placeholder="Geef uw e-mailadres in"
                  >
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope"/>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    type="password"
                    class="input"
                    v-model="password"
                    placeholder="Geef uw wachtwoord in"
                  >
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock"/>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-text-right">
                  <button type="submit" class="button is-primary">Inloggen</button>
                </p>
              </div>
            </form>
          </div>
          <div class="column">
            <h1 class="title">Meld u aan</h1>
            <form @submit.prevent="register">
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    type="email"
                    class="input"
                    v-model="email"
                    placeholder="Geef uw e-mailadres in"
                  >
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope"/>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    type="password"
                    class="input"
                    v-model="password"
                    placeholder="Geef uw wachtwoord in"
                  >
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock"/>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-text-right">
                  <button type="submit" class="button is-primary">Registreren</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-else>
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
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => (this.$store.commit("setStatusMsg", {message : "Account werd aangemaakt!", type:"is-info"})))
        .catch(error => (this.$store.commit("setStatusMsg", {message : error.message, type:"is-danger"})));      

      this.email = "";
      this.password = "";
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => (this.$store.commit("setStatusMsg", {message : "Succesvol uitgelogd!", type:"is-info"})))
        .catch(error => (this.$store.commit("setStatusMsg", {message : error.message, type:"is-danger"})));      
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => (this.$store.commit("setStatusMsg", {message : "Succesvol ingelogd!", type:"is-info"})))
        .catch(error => (this.$store.commit("setStatusMsg", {message : error.message, type:"is-danger"})));      
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.commit("setUser", user);
    });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    this.$store.commit("setActivePage", "login");
  }
};
</script>

<style lang="scss">
.loginContainer {
  width: 100%;
  .column{
    margin: 20px;
  }
}
</style>
