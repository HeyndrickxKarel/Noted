<template>
  <div class="NotePreview" v-on:click="setActiveNote">
    <p class="notename">{{note.content[0].content != undefined? note.content[0].content[0].text:"Nieuwe notitie" }}</p>
    <p class="notecontent">{{note.content[1] != undefined ? note.content[1].content[0].text :  ''}}</p>
    <p class="notedate">{{note.dateCreated | formatDate}}</p>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object
    }
  },
  methods: {
    setActiveNote(){
      this.$store.commit("setActiveNoteByNote", this.note);
    },
  },
};
</script>

<style lang="scss">

@import "../assets/variables.scss";


.NotePreview {
padding: 10px;
  
  .notename {
    font-weight: bold;
  }
  .notecontent {
    color: $almostdarkGray;
  }
  .notedate {
    text-align: right;
    color: $lightGray;
  }
}
</style>
