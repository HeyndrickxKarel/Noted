<template>
  <div class="NotePreview" v-on:click="setActiveNoteIndex">
    <button
      :class="{ 'is-visible':  new Date(activeNote.dateCreated).getTime() == new Date(note.dateCreated).getTime()}"
      class="menubar__button noteDeleteIcon"
      v-on:click.stop="deleteNote"
    >
      <font-awesome-icon :icon="['far','trash-alt']" class="large-icon"/>
    </button>
    <button
      v-print="'#editorContent'"
      :class="{ 'is-visible':  new Date(activeNote.dateCreated).getTime() == new Date(note.dateCreated).getTime()}"
      class="printButton scaleOnHover"
    >
      <font-awesome-icon icon="print"/>
    </button>
    <p
      class="notename"
    >{{note.content[0].content && note.content[0].content && note.content[0].content[0] && note.content[0].content[0].text? note.content[0].content[0].text:"Nieuwe notitie" }}</p>
    <p
      class="notecontent"
    >{{note.content[1] && note.content[1].content && note.content[1].content[0] && note.content[1].content[0].text ? note.content[1].content[0].text : '...'}}</p>
    <p class="notedate">{{note.dateCreated | formatDate}}</p>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object
    },
    notesCount: Number
  },
  methods: {
    setActiveNoteIndex() {
      if (this.note != this.activeNote) {
        this.$store.commit("toggleNoteWasClicked");
        this.$store.commit("setActiveNoteIndexByNote", this.note);
        //let offsetFromTopList = this.$el.offsetParent.offsetTop;
      }
    },
    deleteNote(event) {
      if (this.notesCount > 1){
      this.$store.commit("toggleNoteWasClicked");
      this.$store.commit("deleteNote", this.note);
      this.$store.commit("saveNotes");
      event.preventDefault();
            return false;

      }
     
    }
  },
  computed: {
    activeNote() {
      return this.$store.getters.activeNote;
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
    color: var(--almostdarkGray);
    height: 46px;
    overflow-y: hidden;
  }
  .notedate {
    text-align: right;
    color: var(--lightGray);
  }
  .noteDeleteIcon {
    float: right;
    opacity: 0;
    transition: 0.2s;
    pointer-events: none;
    margin: 10px 5px;
  }
  .noteDeleteIcon.is-visible {
    pointer-events: inherit;
    opacity: 1;
  }
}
.printButton {
  border: none;
  background: none;
  font-size: inherit;
  color: var(--lightGray);
  float: right;
  margin: 0 auto;
  height: 40px;
  pointer-events: none;
  cursor: pointer;
  opacity: 0;
  width: 40px;
  transition: 0.2s;
}
.printButton.is-visible {
  pointer-events: inherit;
  opacity: 1;
}
.printButton:focus, .noteDeleteIcon:focus{
  outline: none;
}
</style>
