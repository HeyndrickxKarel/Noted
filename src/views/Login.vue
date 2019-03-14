<template>
  <div class="login">
    <div class="loginContainer">
      <h1 class="title">Meld u aan</h1>
      <form @submit.prevent="register">

      <div class="field">
        <p class="control has-icons-left">
        <input type="email" class="input" v-model="email" placeholder="Geef uw e-mailadres in">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="envelope"/>
          </span>
        
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
        <input type="password" class="input" v-model="password" placeholder="Geef uw wachtwoord in">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="lock"/>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-text-right">
        <button v-on:click="register" class="button is-primary">Registreren</button>
        </p>
      </div>
      </form>
      <p v-if="errorMsg.length>0">{{errorMsg}}</p>.
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
      errorMsg: ''
    };
  },
  methods: {
    register() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((response) => {
          this.errorMsg = response;
      });
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style>
.loginContainer{
    min-width: 400px;
    max-width: 400px;
}
</style>
