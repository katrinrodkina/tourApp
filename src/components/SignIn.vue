<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sing In</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
         

            <v-form  >
              <v-text-field  prepend-icon="person" name="login" label="Email" type="email"  required  v-model="email"
              
              ></v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Password"  type="password" required
                v-model="password" 
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="signIn" >Sign In</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
 computed: {
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
      user(value) {
        if(value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
  },
  methods: {
    signIn() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>


<style scoped>
</style>
