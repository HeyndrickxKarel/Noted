<template>
  <div class="NavMenu">
    <aside class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <router-link to="/" :class="{ 'is-active': isActive('home') }">My notes</router-link>
        </li>
        <li>
          <router-link to="/deleted" :class="{ 'is-active': isActive('deleted') }">Deleted
            <br>notes
          </router-link>
        </li>
      </ul>
      <p class="menu-label">Other</p>
      <ul class="menu-list">
        <li>
          <router-link to="/settings" :class="{ 'is-active': isActive('settings') }">Settings</router-link>
        </li>
         <li>
          <router-link to="/logout" :class="{ 'is-active': isActive('logout') }">Log out</router-link>
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
  background-color: var(--navMenu);
  height: 100vh;
}
p, a{
  transition: font-size 0.3s;
}
</style>
