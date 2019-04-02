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
          this.$store.commit("addStatusMsg", {
            message: "Succesvol uitgelogd!",
            type: "is-link"
          });
          this.$router.push("/");
        })
        .catch(error =>
          this.$store.commit("addStatusMsg", {
            message: error.message,
            type: "is-warning"
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
