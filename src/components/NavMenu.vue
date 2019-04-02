<template>
  <div class="NavMenu">
    <aside class="menu">
      <p class="menu-label">Algemeen</p>
      <ul class="menu-list">
        <li>
          <router-link to="/" :class="{ 'is-active': isActive('home') }">Mijn notities</router-link>
        </li>
        <li>
          <router-link to="/deleted" :class="{ 'is-active': isActive('deleted') }">Verwijderde
            <br>notities
          </router-link>
        </li>
      </ul>
      <p class="menu-label">Andere</p>
      <ul class="menu-list">
        <li>
          <router-link to="/about" :class="{ 'is-active': isActive('about') }">Info</router-link>
        </li>
         <li>
          <router-link to="/logout" :class="{ 'is-active': isActive('logout') }">Log uit</router-link>
        </li>
      </ul>
      
    </aside>
  </div>
</template>

<script>
export default {
 
  methods: {
    isActive: function (menuItem) {
      return this.activePage === menuItem
    },

  },
  computed:{
    activePage(){
      return this.$store.state.activePage;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import "../assets/variables.scss";


.menu {
  padding: 30px !important;
  background-color: $darkblue;
  height: 100vh;
}

</style>
