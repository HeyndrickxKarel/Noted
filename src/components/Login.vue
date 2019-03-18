<template>
  <div>
    <div class="login">
      <div class="banner">
        <div class="stuff">
          <h1 class="title">Time to get things Noted</h1>
          <img src="../assets/img/writingimage.png">
        </div>
      </div>
      <div class="loginContainer">
        <div class="stuff">
          <div class="columns loginHeader is-mobile">
            <div class="column is-narrow">
              <h1 class="title">
                <a
                  v-on:click="setActionIsLogin(true)"
                  :class="{'darkGray':!actionIsLogin, 'red-underline':actionIsLogin}"
                >Log in</a>
              </h1>
            </div>
            <div class="column is-narrow">
              <h2 class="title darkGray of">of</h2>
            </div>
            <div class="column is-narrow">
              <h1 class="title">
                <a
                  v-on:click="setActionIsLogin(false)"
                  :class="{'darkGray':actionIsLogin, 'red-underline':!actionIsLogin}"
                >Join the club</a>
              </h1>
            </div>
          </div>
          <form @submit.prevent="submit">
            <div class="field">
              <label class="label">E-mailadres</label>
              <input
                type="email"
                class="input"
                v-model="email"
                placeholder="Uw e-mailadres mag hier"
                v-validate="'required'"
                name="email"
                data-vv-delay="1000"
              >
              <transition name="fly-in">
                <div
                  v-if="errors.has('email')"
                  class="notification is-warning is-danger"
                >Gelieve een geldig e-mailadres in te geven</div>
              </transition>
            </div>
            <div class="field">
              <label class="label">Wachtwoord</label>
              <input
                type="password"
                class="input"
                v-validate="'required'"
                v-model="password"
                name="password"
                placeholder="*******"
                data-vv-delay="1000"
                ref="password"
                data-vv-as="password"
              >
              <transition name="fly-in">
                <div
                  v-if="errors.has('password')"
                  class="notification is-warning is-danger"
                >{{actionIsLogin? "Gelieve uw wachtwoord in te geven":"Gelieve een wachtwoord in te geven groter als 6 karaters"}}</div>
              </transition>
            </div>
            <transition name="fly-in">
              <div class="field" v-if="!actionIsLogin">
                <label class="label">Herhaal wachtwoord</label>
                <input
                  type="password"
                  class="input"
                  name="password_confirmation"
                  v-validate="'required|confirmed:password'"
                  placeholder="*******"
                  data-vv-delay="1000"
                >
                <transition name="fly-in">
                  <div
                    v-if="errors.has('password_confirmation')"
                    class="notification is-danger"
                  >Dit wachtwoord komt niet overeen met het bovenstaande</div>
                </transition>
              </div>
            </transition>
            <div class="field">
              <p class="control has-text-right">
                <button type="submit" class="button is-link is-rounded">Let's go!</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "karelheyndrickx@icloud.com",
      password: "",
      name: "",
      actionIsLogin: true
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.actionIsLogin ? this.signIn() : this.register();
        } else {
          // Do nothing
        }
      });
    },
    setActionIsLogin(value) {
      this.actionIsLogin = value;
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() =>
          this.$store.commit("setStatusMsg", {
            message: "Account werd aangemaakt!",
            type: "is-info"
          })
        )
        .catch(error =>
          this.$store.commit("setStatusMsg", {
            message: error.message,
            type: "is-danger"
          })
        );

      this.email = "";
      this.password = "";
      this.name = "";
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("setStatusMsg", {
            message: "Tot later!",
            type: "is-info"
          });
        })
        .catch(error =>
          this.$store.commit("setStatusMsg", {
            message: error.message,
            type: "is-danger"
          })
        );
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(error =>
          this.$store.commit("setStatusMsg", {
            message: error.message,
            type: "is-danger"
          })
        )
        .then(response => {
          this.$store.dispatch("loadNotes", response.user.uid)
        });
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
@import "../assets/variables.scss";

.login {
  width: 100%;
  height: 100vh;

  .banner {
    background-color: $danger;
    height: 100%;
    width: 50%;
    float: left;
    position: relative;

    .stuff {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      h1 {
        color: $lightestGray;
      }
    }
  }
  .loginContainer {
    background-color: $darkblue;
    height: 100%;
    width: 50%;
    float: left;
    position: relative;

    .stuff {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      h1,
      label {
        color: $lightestGray;
      }
      h1 {
        a {
          color: $lightestGray;
          transition: 0.2s;
          &:hover {
            color: $danger !important;
            text-decoration: underline;
            text-decoration-color: $danger;
          }
        }
      }
      label {
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #b3b3b3 !important;
        color: $lightGray;
        max-width: 100%;
        width: 100%;
        -webkit-box-shadow: none;
        box-shadow: none;
        padding: 0px 0px 20px 0px;
        margin-top: 10px;
        margin-bottom: 30px;
        border-radius: 0px;
      }
      input::placeholder {
        color: $lightGray;
      }
      .loginHeader {
        .column {
          padding-right: 20px !important;
        }
        .of {
          padding-top: 5px;
        }
      }
    }
  }
}
</style>
