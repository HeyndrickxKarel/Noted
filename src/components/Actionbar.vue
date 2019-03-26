<template>
  <p class="control has-icons-left has-icons-right searchBox">
    <span class="icon is-small is-left">
      <font-awesome-icon icon="search" class="dark-icon fa"/>
    </span>
    <input class="input" type="text" placeholder="Zoek naar een notitie" v-model="search">
    <transition name="fly-in">
      <span class="icon is-small is-right" v-if="search.length > 0">
        <button class="is-right delete" v-on:click="clearSearch"></button>
      </span>
    </transition>
  </p>
</template>

<script>
export default {};
</script>

<style>
</style>
