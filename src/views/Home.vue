<template>
  <div class="home">
    <div class="columns is-mobile">
      <div class="column is-4">
        <NoteList/>
      </div>
      <div class="column is-8">
        <Editor />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NoteList from "@/components/NoteList.vue";
import Editor from "@/components/Editor.vue";

export default {
  name: "home",
  components: {    
    NoteList,
    Editor
  },
    mounted(){
    this.$store.commit("setActivePage", "home");
    this.$store.dispatch("loadNotes", this.$store.getters.user);
  }
};
</script>
<style>
.column{
  padding: 0 !important;
}
.columns {
  margin-top: 0px !important;
}

</style>

