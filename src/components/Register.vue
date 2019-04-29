<template>
  <v-dialog persistent v-model="registerDialog">
    <template v-slot:activator="{ on }">
      <v-btn class="red darken-1 ml-5" v-on="on">{{isRegistered ? "Unregister" : "Register"}}</v-btn>
    </template>
    <v-card>
      <v-card-title v-if="isRegistered">Unregister from the Tour</v-card-title>
      <v-card-title v-else>Register for the Tour</v-card-title>

      <v-divider></v-divider>

      <v-card-text>Are you sure?</v-card-text>

      <v-card-actions>
        <v-btn dark flat class="red--text darken-1" @click="registerDialog = false">Cancel</v-btn>
        <v-btn dark class="green--text darken-1" @click="onConfirm" flat>Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>

export default {
  props: ["tourId"],
  data() {
    return {
      registerDialog: false,
      //isRegistered: false
    };
  },
  computed: {
    isRegistered() {
    //  console.log( '!!!!!!!',this.$store.getters.user)
      return (
        this.$store.getters.user.registeredTours.findIndex(tourId => {
         return  tourId === this.tourId;
        }) >= 0
      );
    }
  },
  methods: {
      //registerForTour
      //unRegisterFromTour
    onConfirm() {
console.log('!!!!', this.isRegistered)
      if (this.isRegistered) {
        this.$store.dispatch('unRegisterUserFromTour', this.tourId)
       //  this.isRegistered = false
      } 
       this.$store.dispatch('registerUserForTour', this.tourId)
     //  this.isRegistered = true
      
    }
  }
};
</script>