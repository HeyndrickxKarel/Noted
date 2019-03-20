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
              <span class="icon is-small is-right " v-if="search.length > 0"  >
            <button class="is-right delete" v-on:click="clearSearch">

            </button>
            </span>         
            </transition>
          </p>
        </div>
        <div class="column is-narrow newItem">
          <font-awesome-icon icon="edit" class="dark-icon large-icon"/>
        </div>
      </div>
    </div>
    <div class="scrollable noteListItems"> 
      <div class="dummyBox"></div>
    <div class="noteShort window" v-for="(note,index) in filteredNotes" :key="index">
      <NotePreview :note="note"/>
    </div>
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
    clearSearch(){
      this.search = '';
    }
  },
  data(){
    return {
      search: '',
      watchedNotes : undefined
    }
  },
  computed: {
    notes() {    
      return this.$store.getters.notes;
    },
    filteredNotes(){
      let notes  = this.notes;     
       if (this.search != "") {
        notes = notes.filter(n => {
          return n.content[0].content[0].text.toLowerCase().split(" ").includes(this.search.toLowerCase()) == true 
          || n.content[0].content[0].text.toLowerCase().startsWith(this.search.toLowerCase());
        });
      }
      return notes;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import "../assets/variables.scss";


::-webkit-scrollbar {
  display: none;
}
.scrollable{
  overflow-y: scroll;  
}
.noteListItems{
  height: 100%
}
.dummyBox{
  height: 70px;
}
.NoteList {
  height: 100vh;
  position: relative;
}
.searchBar{
  height: 70px;
    position: absolute;
    width: 100%;
    background-color: $backgroundColor;
    padding: 10px;
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
  .input{
    border: none;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0px;
  }
  .fa{
    cursor: pointer;
  }
}
.noteShort:hover{
  background-color: $backgroundColorDark;
  cursor:pointer;
}
</style>
