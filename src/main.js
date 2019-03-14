import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEdit, faBold, faItalic, faCode, faParagraph, faListUl, faListOl, faExpand, faStrikethrough, faUnderline, faQuoteRight, faMinus, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'
import firebaseInit from './firebaseInit'
import firebaseConfig from './firebaseConfig'

library.add(faSearch,faEdit, faBold, faItalic, faCode, faParagraph, faListUl, faListOl, faExpand, faStrikethrough, faUnderline, faQuoteRight, faMinus, faLock, faEnvelope)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

require("./assets/main.scss")

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD')
  }
})

new Vue({
  router,
  store,
  firebaseInit,
  firebaseConfig,
  render: h => h(App)
}).$mount('#app')


