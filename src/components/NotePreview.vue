<template>
  <div class="NotePreview">
    <p class="notename">{{note.content.split("\n")[0]}}</p>
    <p class="notecontent">{{note.content.split("\n")[1]}}</p>
    <p class="notedate">{{note.date | formatDate}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {
        content: "Dit is de titel \n This is de test",
        contentHTML: "",
        date: new Date()
      }
    };
  }
};
</script>

<style lang="scss">
$lightGray: rgb(151, 151, 151);
$darkGray: rgb(175, 175, 175);

.NotePreview {
  
  .notename {
    font-weight: bold;
  }
  .notecontent {
    color: darkgray;
  }
  .notedate {
    text-align: right;
    color: $lightGray;
  }
}
</style>
