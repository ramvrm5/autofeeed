import Vue from 'vue'
import * as VeeValidate from 'vee-validate';
import VueSweetalert2 from 'vue-sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin,VBTooltip  } from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics';
import App from './App.vue'

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
  errorBagName: "veeErrors"
});
Vue.use(VueSweetalert2);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.directive('b-tooltip', VBTooltip)
import VueTagsInput from '@johmun/vue-tags-input';
Vue.component("VueTagsInput", VueTagsInput)


Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

import { aut, auth } from './firebase'

auth.onAuthStateChanged(user => {


  if (user) {
    console.log(user)
    const detectorUsuario = {
      email: user.email,
      uid: user.uid
    }
    console.log("UUUUUUUUUUUNOOOOOOOOOOOOOO SI")
    store.dispatch('detectarUsuario', detectorUsuario)
  }
  else {
    console.log("aqui")
    console.log(user)
    console.log("UUUUUUUUUUUNOOOOOOOOOOOOOO NO")
    store.dispatch('detectarUsuario', user)
  }

  // Configuration VueAnalytics
  Vue.use(VueAnalytics, {
    id: 'UA-168600046-1',
    router
  });

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')


})


