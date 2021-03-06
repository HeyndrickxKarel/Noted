import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faSearch, faEdit, faBold, faItalic, faCode, faParagraph, faListUl, faListOl, faExpand, faStrikethrough, faUnderline, faQuoteRight, faMinus, faLock, faEnvelope, faTasks, faPrint } from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'
import firebaseInit from './firebaseInit'
import firebaseConfig from './firebaseConfig'
import VeeValidate from 'vee-validate';
import Print from 'vue-print-nb'
import ToggleButton from 'vue-js-toggle-button'

library.add(faSearch,faEdit, faBold, faItalic, faCode, faParagraph, faListUl, faListOl, faExpand, faStrikethrough, faUnderline, faQuoteRight, faMinus, faLock, faEnvelope, faTimesCircle, faTrashAlt, faTasks, faPrint)

Vue.component('font-awesome-icon', FontAwesomeIcon)
 
Vue.use(Print);
Vue.use(VeeValidate);
Vue.use(ToggleButton);

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


