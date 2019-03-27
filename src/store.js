import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const baseURL = "http://localhost:3000/API/noters/";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    notes: [],
    activePage: 'notes',
    statusMsg: {
      message: '',
      type: ''
    },
    activeNoteIndex : undefined,
    noteWasClicked: true
    
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    setActivePage(state, page) {
      state.activePage = page
    },
    setStatusMsg(state, statusMsg) {
      state.statusMsg = statusMsg
      setTimeout(() => {
        state.statusMsg = {
          message: '',
          type: ''
        }
      }, 4000)

    },
    discardStatusMsg(state) {
      state.statusMsg = {
        message: '',
        type: ''
      };
    },
    receiveLoadedNotes(state, notes) {
      state.notes = notes;
      if (state.notes.length > 0){
        state.activeNoteIndex = 0;
      }
    },
    setActiveNoteIndex(state,index){
      state.activeNoteIndex = index;
    },
    setActiveNoteIndexByNote(state, note){
      /*
      console.log("");
      console.log("Wil deze note instellen als active");     
      console.log(note) ;
      */
      for(var i = 0; i < state.notes.length; i += 1) {
        //console.log(state.notes[i].dateCreated)
        if(new Date(state.notes[i].dateCreated).getTime() == new Date(note.dateCreated).getTime()) {
         // console.log("geraakt hier");
          state.activeNoteIndex = i
        }
    }

      console.log("Noteindex set to " + state.activeNoteIndex);
    },
   toggleNoteWasClicked(state){
    state.noteWasClicked = !state.noteWasClicked;
   },
    updateActiveNote(state, newNote){
      console.log("");
      console.log("active node is")
      console.log(state.activeNoteIndex);

      state.notes[state.activeNoteIndex] = newNote;
      Vue.set(state.notes, state.activeNoteIndex, newNote)


      console.log("nieuwe active note")
      console.log(state.notes[state.activeNoteIndex]);

      console.log("alle notes");
      console.log(state.notes);
    },
    createNote(state){
      var newNote = {
        dateCreated : new Date(),
        type:'doc',
        content :  [
          {
            "type": "heading",
            "attrs": {
              "level": 1
            }
          }
        ]
      };
      Vue.set(state.notes, state.notes.length, newNote)
      state.noteWasClicked = !state.noteWasClicked;
      state.activeNoteIndex = state.notes.length - 1;
    },
    saveNotes(state){
      axios.put(baseURL+"update/"+state.user.uid,state.notes)
      .then(function(){
        console.log("notes updated backend");
      })
      .catch(function(){
        console.log("error")
      })
    }
  },
  actions: {
    loadNotes({commit}, user) {
      axios.get(baseURL + user.uid)
        .then(function (response) {
          let notes = response.data[0].notes;
          commit('receiveLoadedNotes',notes)
        })
        .catch(function (error) {
          console.log(error);
          return error;
        });

    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    activePage(state) {
      return state.activePage
    },
    statusMsg(state) {
      return state.statusMsg
    },
    activeNote(state){
      return state.notes[state.activeNoteIndex];
    },
    notes(state){
      return state.notes;
    },
    noteByIndex: state => index => state.notes[index],
    noteWasClicked(state){
      return state.noteWasClicked;
    },
    activeNoteIndex(state){
      return state.activeNoteIndex;
    }
  }
})
