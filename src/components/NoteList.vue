<template>
  <div class="NoteList">
    <div class="window searchBar">
      <div class="columns is-mobile topContainer">
        <div class="column">
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
        </div>
        <div class="column is-narrow newItem" v-on:click="createNote">
          <font-awesome-icon icon="edit" class="dark-icon large-icon scaleOnHover"/>
        </div>
      </div>
    </div>
    <div class="scrollable noteListItems">
      <div class="dummyBox"></div>
      <transition-group
        name="noteListTransiton"
        enter-active-class="animated bounceInDown"
        leave-active-class="animated bounceOutUp"
      >
        <div
          class="noteShort window"
          v-for="(note,index) in filteredNotes"
          :key="index"
          :class="{ 'is-active-note': new Date(activeNote.dateCreated).getTime() == new Date(note.dateCreated).getTime() }"
          v-bind:style="{ 'z-index' : 10000 - index - 1 }"
        >
          <NotePreview :note="note"/>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import NotePreview from "@/components/NotePreview.vue";

export default {
  components: {
    NotePreview
  },
  methods: {
    clearSearch() {
      this.search = "";
    },
    createNote() {
      this.$store.commit("createNote");
    }
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    notes() {
      return this.$store.getters.notes;
    },
    activeNoteIndex() {
      return this.$store.getters.activeNoteIndex;
    },
    activeNote() {
      return this.$store.getters.activeNote;
    },
    filteredNotes() {
      let notes = this.notes;
      if (this.search != "") {
        notes = notes.filter(n => {
          return (
            n.content[0].content[0].text
              .toLowerCase()
              .split(" ")
              .includes(this.search.toLowerCase()) == true ||
            n.content[0].content[0].text
              .toLowerCase()
              .startsWith(this.search.toLowerCase())
          );
        });
      }
      return notes;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/variables.scss";

::-webkit-scrollbar {
  display: none;
}
.scrollable {
  overflow-y: scroll;
}
.noteListItems {
  height: 100%;
}
.dummyBox {
  height: 70px;
}
.NoteList {
  height: 100vh;
  position: relative;
}
.searchBar {
  height: 70px;
  position: absolute;
  width: 100%;
  background-color: $backgroundColor;
  padding: 10px;
  z-index: 10000;
}
.window {
  border-bottom: 1px solid rgb(212, 212, 212);
}
.newItem {
  margin: 6px 10px 6px 20px;
}
.topContainer {
  padding: 10px;
  padding-bottom: 20px;
}
.searchBox {
  margin-left: 10px;
  .input {
    border: none;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0px;
  }
  .fa {
    cursor: pointer;
  }
}
.noteShort {
  transition: 0.2s;
  cursor: pointer;
  background-color: $backgroundColor;
  position: relative;
  &:hover {
    padding-left: 8px;
  }
  border-left: 0px solid $danger;
}

.is-active-note {
  border-left: 8px solid $danger !important;
  padding-left: 0px !important;
}
</style>
