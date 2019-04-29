<template>
  <v-container>
    <v-layout row wrap  v-for="tour in tours " :key="tour.id"  class="mb-2 ">
      <v-flex xs12 sm10 md9 offset-sm1 offset-md2>
        <v-card class="red darken -3"  dark>
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img :src="tour.imageUrl " height="130px"></v-img>
              </v-flex>

              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="white--text mb-0">{{tour.title}}</h3>
                    <div>{{tour.date}}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat :to="'/tours/'+ tour.id">
                    <v-icon left light>arrow_forward_ios</v-icon>View Tour
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  computed: {
    
    tours() {

      return this.$store.getters.getTours;
    }
  }
};
</script>


<style scoped>
</style>
