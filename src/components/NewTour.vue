<template>
  <v-container>
    <v-layout row>
      <v-flex xs12  sm6 offset-sm3>
        <h2 class="indigo--text">Create New Tour</h2>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs-12>
        <v-form    @submit.prevent="onCreateTour">
           <v-layout row>
                <v-flex xs-12 sm6 offset-sm3>
                  <v-text-field name="title" label="title" id="title" required  v-model="title">
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs-12 sm6 offset-sm3>
                  <v-textarea  name="description" label="description" id="description" required
                  v-model="description">
                  </v-textarea>
                </v-flex>
              </v-layout>


               <v-layout row>
                  <v-flex xs-12 sm6 offset-sm3>
                    <v-text-field  name="imageUrl" label="Image Url" id="imageUrl" required 
                     v-model="imageUrl">
                    </v-text-field>
                  </v-flex>
                </v-layout>



              <v-layout row>
                  <v-flex xs-12 sm6 offset-sm3>
                    <img :src="imageUrl"  height="300px" />
                  </v-flex>
                </v-layout>



          <!-- <v-layout row>
                            <v-flex xs-12 sm6 offset-sm3>
              <h3> Choose Date: </h3>
            </v-flex>
          </v-layout>

                    <v-layout row  class="mb-2 mt-2">
                            <v-flex xs-12 sm6 offset-sm3>
    <v-date-picker color= "indigo darken-4" class="indigo darken-4" v-model="date" 
  >
            </v-date-picker>

            
            <p> {{date}}</p>
            </v-flex>
          </v-layout> -->



       <v-layout row>
                  <v-flex  xs-12 sm6 offset-sm3>
                    <v-btn  type="submit" dark class="red darken-1 ml-1" offset-md10  >
                      Create Tour</v-btn>
                  </v-flex>
                </v-layout>




        </v-form>



      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
   data() {
     return {
       title:'',
       description:'',
       imageUrl:''
     }
   },
 

   methods: {
     onCreateTour () {
       const tourData = {
         title:this.title,
         description:this.description,
         imageUrl:this.imageUrl,
         date: new Date()
       }
       this.$store.dispatch('createTour', tourData)
       this.$router.push('/tours')
     }
   }
  //  computed: {
  //    isValid () {
  //      return this.title != '' && this.desctiption !='' && this.imageUrl != ''
  //    }
  //  }
  //  validations: {
  //   form: {
  //     title: { required },
  //     desctiprion: { required }
  //   }
  // },


};
</script>


<style scoped>
</style>
