<template>
  <div class="settings">
   <section class="hero has-text-centered">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Instellingen
      </h1>
<hr>
    </div>
  </div>
</section>
  </div>
</template>


<script>
export default {
mounted(){
    this.$store.commit("setActivePage", "settings");
  }
}
</script>

<style>

</style>
