import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

var baseURL = "http://localhost:3000/API/noters/";
baseURL = "https://noted-backend.herokuapp.com/API/noters/";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    notes: undefined,
    activePage: 'notes',
    statusMsg: {
      message: '',
      type: ''
    },
    statusMessages:[],
    activeNoteIndex : 0,
    noteWasClicked: true,
    userSettings: {
      darkMode: true,
      largeFont: true
    }
    
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
    addStatusMsg(state,statusMsg){      
      state.statusMessages.push(statusMsg);
      setTimeout(() => {
        let index = state.statusMessages.indexOf(statusMsg);
        if (index >= 0){
          state.statusMessages.splice(index, 1);
        }      
      }, 7000)
    },
    discardStatusMsg(state, statusMsg){
      let index = state.statusMessages.indexOf(statusMsg);
      if (index >= 0){
        state.statusMessages.splice(index, 1);
      }  
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
      for(var i = 0; i < state.notes.length; i += 1) {
        if(new Date(state.notes[i].dateCreated).getTime() == new Date(note.dateCreated).getTime()) {
          state.activeNoteIndex = i
        }
    }

    },
   toggleNoteWasClicked(state){
    state.noteWasClicked = !state.noteWasClicked;
   },
    updateNote(state, params){
      state.notes[params.index] = params.newNote;
      Vue.set(state.notes, params.index, params.newNote)
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
    deleteNote(state, note){
      for(var i = 0; i < state.notes.length; i += 1) {
        if(new Date(state.notes[i].dateCreated).getTime() == new Date(note.dateCreated).getTime()) {
          state.activeNoteIndex -= 1;
          Vue.delete(state.notes,state.activeNoteIndex+1);
        }
    }
    },
    saveNotes(state){
      axios.put(baseURL+"update/"+state.user.uid,state.notes)
      .then(function(){
        console.log("notes updated backend");
      })
    },
    updateUserSettings(state, params){
      state.userSettings[params.setting] = params.settingValue
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
    statusMessages(state){
      return state.statusMessages;
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
    },
    userSettings(state){
      return state.userSettings;
    }
  }
})
