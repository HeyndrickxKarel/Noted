import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEdit, faBold, faItalic, faCode, faParagraph, faListUl, faListOl, faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'

library.add(faSearch,faEdit, faBold, faItalic, faCode, faParagraph, faListUl, faListOl, faExpand)

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
  render: h => h(App)
}).$mount('#app')


