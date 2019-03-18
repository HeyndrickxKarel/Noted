<template>
  <div class="NotePreview" v-on:click="setActiveNote">
    <p class="notename">{{activeNote.content[0].content[0].text}}</p>
    <p class="notecontent">{{activeNote.content[1].content[0].text}}</p>
    <p class="notedate">{{date | formatDate}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    date: Date,
    number: Number
  },
  methods: {
    setActiveNote(){
      this.$store.commit("setActiveNote", this.number);
    },
  },
  computed: {
    activeNote(){
      return this.$store.getters.noteByIndex(this.number);
    }
  }

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
