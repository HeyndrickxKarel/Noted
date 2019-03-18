<template>
  <div class="NoteList">
    <div class="noteShort window searchBar">
      <div class="columns is-mobile topContainer">
        <div class="column">
          
          <p class="control has-icons-left searchBox">
                        <span class="icon is-small is-right">
              <font-awesome-icon icon="search" class="dark-icon fa"/>
            </span>
            <input class="input" type="text" placeholder="Zoek naar een notitie">
          </p>
        </div>
        <div class="column is-narrow newItem">
          <font-awesome-icon icon="edit" class="dark-icon large-icon"/>
        </div>
      </div>
    </div>
    <div class="scrollable noteListItems"> 
      <div class="dummyBox"></div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
    </div>
    <div class="noteShort window">
      <NotePreview/>
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
  data() {
    return {
      notes: [
        {
          content: "Bachelorproef bedenkingen",
          contentHTML: "",
          date: new Date()
        }
      ]      
    };
  }
};
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
    background-color: #fafafad9;
}
.window {
  border-bottom: 1px solid rgb(212, 212, 212);
  padding: 10px;
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

</style>
