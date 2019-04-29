<template>
 <v-container>
     <v-layout row wrap>
     <v-flex  xs12>

       <v-carousel style="cursor:pointer">
           <v-carousel-item v-for="tour in tours" :src="tour.imageUrl" :key="tour.id"
          
           >
              <div class="title" > {{tour.title}}</div>
           </v-carousel-item>
       </v-carousel>
     </v-flex>

   </v-layout>

   <v-layout row wrap >

     <v-flex xs-12  sm6 class=" mt-2 text-xs-center   text-sm-right">
       <v-btn    large router dark class="red darken-1 mr-5" to="/tours">
         Explore
       </v-btn>
     </v-flex>
       <v-flex  xs-12  sm6 class=" mt-2 text-xs-center text-sm-left">
          <v-btn large router  dark class="red darken-1 ml-5"   to="/newtour">
         New Tour
       </v-btn>
     </v-flex>
   </v-layout>


 



 </v-container>
</template>

<script>

  export default {
  
      // data() {
      //   return {
      //     tours: [
      //       {imageUrl:'https://www.bikeandrollnyc.com/wp-content/uploads/photo-1459508583695-86e229e8855a.jpg', id:1, title:'Central Park Tour'},
      //       {imageUrl:'http://mustseeplaces.eu/wp-content/uploads/2017/07/brooklyn-bridge.jpg', id:2, title: 'Brooklyn Bridge Walking Tour'}
      //     ]
      //   }
      // }
      computed: {
         tours () {
           return this.$store.getters.featuredTours
         }
      },
      methods: {
        getTour (id) {
          this.$router.push('/tours/'+id)
        }
       }
  }
</script>

<style scoped>
  .title  {
    background-color: rgba(0,0,0,0.5);
    position:absolute;
    text-align: center;
    bottom:50px;
    color:white;
    font-size:2em;
    padding:15px;

  }
</style>