<template>
  <div class="settings">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">Instellingen</h1>
          <hr>
          <div class="columns is-desktop">
            <div class="column">
              <h4 class="subtitle is-5">Dark mode</h4>
              <p>Yet to be implemented</p>
              <toggle-button
                @change="toggleDarkMode"
                 v-model="darkMode"
                :value="userSettings.darkMode"
                color="indianred"
                :sync="true"
              />
            </div>
            <div class="column">
              <h4 class="subtitle is-5">Large font</h4>
                            <p>Yet to be implemented</p>
              <toggle-button
                @change="toggleLargeFont"
                v-model="largeFont"
                color="indianred"
                :sync="true"
              />
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
      largeFont: undefined
    };
  },
  mounted() {
    this.$store.commit("setActivePage", "settings");
      this.darkMode = this.$store.getters.userSettings.darkMode;
      this.largeFont = this.$store.getters.userSettings.largeFont;
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
    }
  },
  computed: {
    userSettings() {
      return this.$store.getters.userSettings;
    }
  }
};
</script>

<style>
</style>
