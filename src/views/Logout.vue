<template>
  <div>
    <div class="logout">
      <section class="hero is-large has-text-centered">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Afmelden</h1>
                      <button v-on:click="logout" class="button is-primary">Afmelden</button>
          </div>
        </div>
      </section>
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
        .then(() => {
          this.$store.commit("setStatusMsg", {
            message: "Succesvol uitgelogd!",
            type: "is-info"
          });
          this.$router.push("/");
        })
        .catch(error =>
          this.$store.commit("setStatusMsg", {
            message: error.message,
            type: "is-danger"
          })
        );
    }
  },
  mounted() {
    this.$store.commit("setActivePage", "logout");
  }
};
</script>

<style lang="scss">
</style>
