<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3>{{tour.title}}</h3>

            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
                                                       <edit-tour   :tour="tour"></edit-tour>
            </template>
          </v-card-title>
          <v-img :src="tour.imageUrl" height="400px"></v-img>
          <v-card-text>
            <div>Date: {{tour.date}}</div>
            <div>{{tour.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn dark class="red darken-1 ml-1">
              <v-icon left light>create</v-icon>Register
            </v-btn> -->
    
              <register-to-tour :tourId="tour.id"  > </register-to-tour>
       
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import EditTour from "./EditTour.vue";
import Register from "./Register.vue"

export default {
   props:['id'], 
  computed: {
    tour() {
      //  console.log('!!!!',  )
   
    //  let id = this.$route.params.id;
   //   if (id === 'string') {id = Number(this.$route.params.id)}
      return this.$store.getters.getTour(this.id);
      this.editTitle = tour.title;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      return this.$store.getters.user.id === this.tour.creatorId;
    },
    // editTitle() {
    //   return this.tour.title;
    // },
    // editDescription() {
    //   return this.tour.description;
    // }
  },
  components: {
    "edit-tour": EditTour,
    "register-to-tour": Register
  }
};
</script>


<style scoped>
</style>
