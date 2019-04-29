<template>
  <v-dialog width="350" persistent v-model="editDialog">
    <template v-slot:activator="{ on }">
      <v-btn fab accent v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Tour</span>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="editTitle" label="Title" name="title" id="title" required></v-text-field>
        <v-textarea
          v-model="editDescription"
          label="Description"
          name="description"
          id="description"
          required
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn large router dark class="red darken-1 ml-5" @click="editDialog = false" flat>Close</v-btn>
        <v-btn large router dark class="red darken-1 ml-5" @click="onSaveChanges" flat>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: ["tour"],

  data() {
    return {
      editTitle: this.tour.title,
      editDescription: this.tour.description,
      editDialog: false
    };
  },

  methods: {
    onSaveChanges() {
      this.editDialog = false;
      console.log('!!!!!',this.tour)
      console.log('????', this.editTitle)
      this.$store.dispatch("updateTour", {
        id: this.tour.id,
        title: this.editTitle,
        description: this.editDescription
      });
    }
  }
};
</script>