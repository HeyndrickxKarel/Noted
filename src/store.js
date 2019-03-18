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
    activeNote : undefined
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    getNote(state, index) {
      return state.notes[index];
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
    updateActiveNote(state, newNote){
      console.log("active node is")
      console.log(state.activeNote);

      state.notes[state.activeNote] = newNote;

      console.log("nieuwe active note")
      console.log(state.notes[state.activeNote]);

      console.log("alle notes");
      console.log(state.notes);
    }
  },
  actions: {
    loadNotes({commit}, firebaseUserId) {
      axios.get(baseURL + firebaseUserId)
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
    noteByIndex: state => index => state.notes[index]
  }
})
