import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : undefined,
    notes: [],
    activePage : 'notes',
    statusMsg: ''
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setNotes(state,notes){
      state.notes = notes
    },
    getNote(state,index){
      return state.notes[index];
    },
    setActivePage(state, page){
      state.activePage = page
    },
    setStatusMsg(state, content){
      state.statusMsg = content
      setTimeout(() => {
        state.statusMsg = ''
      },2000)
      
    },
    discardStatusMsg(state){
      state.statusMsg = ''
    }
  },
  actions: {

  },
  getters: {
    user(state){
      return state.user;
    },
    activePage(state){
      return state.activePage
    },
    statusMsg(state){
      return state.statusMsg
    }
  }
})
