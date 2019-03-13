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
.home{
  background-color: #fafafa;
}
</style>

