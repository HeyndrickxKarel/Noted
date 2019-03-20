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
    activeNote : undefined,
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
        state.activeNote = 0;
      }
    },
    setActiveNote(state,index){
      state.activeNote = index;
    },
    setActiveNoteByNote(state, note){
      console.log("");
      console.log("Wil deze note instellen als active");      
      console.log(note.content[0].content[0].text);
      for(var i = 0; i < state.notes.length; i += 1) {
        console.log(state.notes[i].dateCreated)
        if(new Date(state.notes[i].dateCreated).getTime() == new Date(note.dateCreated).getTime()) {
          console.log("geraakt hier");
          state.activeNote = i
        }
    }

      console.log("Noteindex set to " + state.activeNote);
    },
   toggleNoteWasClicked(state){
    state.noteWasClicked = !state.noteWasClicked;
   },
    updateActiveNote(state, newNote){
      console.log("");
      console.log("active node is")
      console.log(state.activeNote);

      state.notes[state.activeNote] = newNote;
      Vue.set(state.notes, state.activeNote, newNote)


      console.log("nieuwe active note")
      console.log(state.notes[state.activeNote]);

      console.log("alle notes");
      console.log(state.notes);
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
      return state.notes[state.activeNote];
    },
    notes(state){
      return state.notes;
    },
    noteByIndex: state => index => state.notes[index],
    noteWasClicked(state){
      return state.noteWasClicked;
    },
    activeNoteIndex(state){
      return state.activeNote;
    }
  }
})
