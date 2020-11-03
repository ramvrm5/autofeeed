import Vue from 'vue'
import VeeValidate from 'vee-validate';
import { ValidationProvider } from 'vee-validate';

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

import { CoolSelectPlugin } from 'vue-cool-select'
import 'vue-cool-select/dist/themes/bootstrap.css'
import 'vue-cool-select/dist/themes/material-design.css'
 
Vue.use(CoolSelectPlugin)

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
  errorBagName: "veeErrors"
});

Vue.component('ValidationProvider', ValidationProvider);

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
import vuetify from './plugins/vuetify';

auth.onAuthStateChanged(user => {


  if (user) {
    const detectorUsuario = {
      email: user.email,
      uid: user.uid
    }
    store.dispatch('detectarUsuario', detectorUsuario)
  }
  else {
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
    vuetify,
    render: h => h(App)
  }).$mount('#app')


})


