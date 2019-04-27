<template>
  <div class="settings">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">Settings</h1>
          <hr>
          <div class="settingsColumn">
            <div class="columns is-mobile is-vcentered">
              <div class="column">
                <h4>Dark mode</h4>
                <p>Join the dark side</p>
              </div>
              <div class="column is-narrow">
                <toggle-button
                  @change="toggleDarkMode"
                  v-model="darkMode"
                  :value="userSettings.darkMode"
                  color="indianred"
                  :sync="true"
                />
              </div>
            </div>
            <div class="columns is-mobile is-vcentered">
              <div class="column">
                <h4>Large font</h4>
                <p>Enlarge your awesome writing</p>
              </div>
              <div class="column is-narrow">
                <toggle-button
                  @change="toggleLargeFont"
                  v-model="largeFont"
                  color="indianred"
                  :sync="true"
                />
              </div>
            </div>
             <div class="columns is-mobile is-vcentered">
              <div class="column">
                <h4>Spelling check</h4>
                <p>Enable a spelling checker</p>
              </div>
              <div class="column is-narrow">
                <toggle-button
                  @change="toggleSpellingCheck"
                  v-model="spellingCheck"
                  color="indianred"
                  :sync="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      darkMode: undefined,
      largeFont: undefined,
      spellingCheck: undefined
    };
  },
  mounted() {
    this.$store.commit("setActivePage", "settings");
    this.darkMode = this.$store.getters.userSettings.darkMode;
    this.largeFont = this.$store.getters.userSettings.largeFont;
    this.spellingCheck = this.$store.getters.userSettings.spellingCheck;
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit("updateUserSettings", {
        setting: "darkMode",
        settingValue: this.darkMode
      });
    },
    toggleLargeFont() {
      this.$store.commit("updateUserSettings", {
        setting: "largeFont",
        settingValue: this.largeFont
      });
    },
    toggleSpellingCheck(){
        this.$store.commit("updateUserSettings", {
        setting: "spellingCheck",
        settingValue: this.spellingCheck
      });
    }
  },
  computed: {
    userSettings() {
      return this.$store.getters.userSettings;
    }
  }
};
</script>

<style lang="scss">
.settingsColumn {
  max-width: 600px;
  margin: 0 auto;
 .column {
   margin-bottom:  20px
 }
}
 h1, h4, p{
   transition: font-size 0.3s;
 }
</style>
