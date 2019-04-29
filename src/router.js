import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import SignIn from "./components/SignIn.vue";
import SingUp from "./components/SignUp.vue";
import Tours from "./components/Tours.vue";
import NewTour from "./components/NewTour.vue";
import Profile from "./components/Profile.vue";
import Tour from "./components/Tour.vue";


Vue.use(Router)

export default new Router({

  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/tours",
      name: "tours",
      component: Tours
    },
    {
      path: "/tours/:id",
      name: "tour",
      props:true, 
      component: Tour
    },
    {
      path: "/newtour",
      name: "newtour",
      component: NewTour
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
      
    },
    {
      path: "/login",
      name: "login",
      component: SignIn
    },
    {
      path: "/signup",
      name: "signup",
      component: SingUp
    },
   
  ],
  mode: "history"  //removes hash!
});
