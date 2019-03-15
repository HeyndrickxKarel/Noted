<template>
    <div><h1>Test</h1></div>
</template>

<script>
export default {
mounted(){
    this.$store.commit("setActivePage", "deleted");
  }
}
</script>

<style>

</style>
