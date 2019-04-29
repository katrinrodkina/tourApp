<template> 
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list>
        <v-list-tile v-for="item  in menuItems" :key="item.title" :to="item.route">
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark class="indigo darken-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <router-link to="/" tag="span" style="cursor:pointer">
        <v-toolbar-title v-text="'Tours'"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-and-down">
        <v-btn v-for="item in menuItems" flat  :key="item.title" :to="item.route">
          <v-icon left dark v-html="item.icon"></v-icon>
          {{item.title}}
        </v-btn>

       
 <v-btn  flat @click.prevent="signOut"     v-if="userIsAuthenticated">
                              <v-icon left>exit_to_app</v-icon>Log Out </v-btn>



      </v-toolbar-items>
    </v-toolbar>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      drawer: false,
    
      
    };
  }, 
  computed : {
    menuItems() {
      let menuItems = [
         {
            icon: "input",
            title: "LogIn",
            route: "/login"
          },
          {
            icon: "lock_open",
            title: "SignUp",
            route: "/signup"
          }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
         {
            icon: "time_to_leave",
            title: "View Tours",
            route: "/tours"
          },
          {
            icon: "create",
            title: "Create Tour",
            route: "/newtour"
          },
          {
            icon: "account_circle",
            title: "Profile",
            route: "/profile"
          },
      ]
      }
      return   menuItems
    },
    userIsAuthenticated() {
      return this.$store.getters.user  !== null  && this.$store.getters.user  !== undefined
    }
  },
   methods: {
    signOut() {
     this.$confirm('Do you really want to exit?').then(res => {
       if (res)
         this.$store.dispatch("SIGNOUT");
     })
    }
  }
};
</script>


<style >
</style>

