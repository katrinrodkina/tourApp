import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from "vuetify"
import * as firebase from 'firebase'
//import EditTour from './components/EditTour.vue'

import VuetifyConfirm from 'vuetify-confirm'

import "vuetify/dist/vuetify.min.css"; 

Vue.use(Vuetify)

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Yes',
  buttonFalseText: 'No',
  color: 'warning',
  icon: 'warning',
  title: 'Warning',
  width: 400,
  property: '$confirm'
})
 
Vue.config.productionTip = false
//Vue.component('tour-edit',EditTour )  

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
      firebase.initializeApp({
        apiKey: "AIzaSyDH6_TRE1djxzE1D97tnpTw30h7UBaEnOA",
        authDomain: "toursapp-c3930.firebaseapp.com",
        databaseURL: "https://toursapp-c3930.firebaseio.com",
        projectId: "toursapp-c3930",
        storageBucket: "toursapp-c3930.appspot.com",
        messagingSenderId: "159062726997"
      }),
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUser')
        }
      });
  

      this.$store.dispatch('loadTours')
  }
}).$mount('#app')
