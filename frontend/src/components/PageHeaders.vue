<template>
  <v-sheet v-if="$route.name && !views_ignored.includes($route.name)">
    <v-card-title
      style="font-family: geargia"
      class="font-italic text-capitalize font-weight-bold strong_gold--text"
    >
      {{ text ? text : $t($route.name.toLowerCase()) }}
    </v-card-title>

    <v-divider></v-divider>
  </v-sheet>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "PageHeaders",

  props: ["text"],

  computed: {
    ...Vuex.mapState(["views_ignored"]),
  },
};
</script>