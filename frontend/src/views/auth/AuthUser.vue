<template>
  <div>
    <v-card>
      <v-card-title>
        
        <v-spacer></v-spacer>

        <v-flex md4>
          <v-text-field
            v-model="search"
            append-icon="search"
            :label="`${$t('search')}:`"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
      </v-card-title>

      <v-data-table dense :headers="headers" :items="items" :search="search">
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: "AuthUser",

  computed: {
    ...Vuex.mapState(["app"]),
  },

  data() {
    return {
      headers: [
        { text: "Nombre", value: "first_name" },
        { text: "Apellidos", value: "last_name" },
        { text: "Usuario", value: "username" },
        { text: "Correo electrónico", value: "email" },
        { text: "Contraseña", value: "password" },
        { text: "", value: "actions" },
      ],
      items: [],
      search: "",
    };
  },

  created() {
    this.start();
  },

  methods: {
    start() {
      const url = `${this.app.url}/auth_users`;

      axios
        .get(url)
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="">
</style>