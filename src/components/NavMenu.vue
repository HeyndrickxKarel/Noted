<template>
  <div class="NavMenu">
    <aside class="menu">
      <p class="menu-label">Algemeen</p>
      <ul class="menu-list">
        <li>
          <router-link to="/" v-on:click.native="setActive('notes')" :class="{ 'is-active': isActive('notes') }">Mijn notities</router-link>
        </li>
        <li>
          <router-link to="/deleted" v-on:click.native="setActive('deleted')" :class="{ 'is-active': isActive('deleted') }">Verwijderde
            <br>notities
          </router-link>
        </li>
      </ul>
      <p class="menu-label">Andere</p>
      <ul class="menu-list">
        <li>
          <router-link to="/about" v-on:click.native="setActive('about')" :class="{ 'is-active': isActive('about') }">Info</router-link>
        </li>
         <li>
          <router-link to="/login" v-on:click.native="setActive('login')" :class="{ 'is-active': isActive('login') }">Inloggen</router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return { activeItem: 'notes' }
  },
  methods: {
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.menu {
  padding: 30px !important;
  background-color: #34373b;
  height: 100vh;
}

</style>
