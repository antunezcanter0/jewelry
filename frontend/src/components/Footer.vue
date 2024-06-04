<template>
  <v-footer
    dark
    padless
    v-if="!views_ignored.includes($route.name)"
    class="d-fex justify-center"
  >
    <v-card
      flat
      tile
      color="transparent"
      class="lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="item in categories.items"
          :key="item.categoria"
          class="text-capitalize mx-1"
          plain
          color="white"
        >
          <!-- <v-avatar left>
            <v-img :src="get_image(item.imagen, app.url)"> </v-img>
          </v-avatar> -->
          {{ item.categoria }}
        </v-btn>
      </v-card-text>

      <v-card-text class="text-center">
        <v-btn
          v-for="item in items"
          text
          :key="item.title"
          class="text-capitalize"
          @click="go_to_page(item.path)"
        >
          <v-icon>{{ item.icon }}</v-icon>
          {{ $t(item.text) }}
        </v-btn>
      </v-card-text>

      <v-card-text>
        <v-tabs center show-arrows dark v-model="tabs.model" align-with-title>
          <v-tab v-for="item in tabs.items" :key="item.title">
            {{ $t(item.title) }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs.model">
          <v-tab-item v-for="item in tabs.items" :key="`${item.title}_content`">
            <v-card flat dark tile>
              <v-card-text v-text="item.content"></v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-center">
        {{ new Date().getFullYear() }} -
        <span class="text-capitalize">
          <strong>{{ app.title }}</strong>
        </span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";
import { get_image } from "../utils";

export default {
  name: "Footer",

  data() {
    return {
      categories: { items: [] },
      tabs: {
        items: [
          { title: "about_us", content: "Acerca de la tienda" },
          { title: "services", content: "Contenido de los Servicios" },
          { title: "contact_us", content: "Contenido de Contactos" },
        ],
        model: null,
      },
    };
  },

  created() {
    this.start();
  },

  computed: {
    ...Vuex.mapState(["app", "views_ignored"]),

    items() {
      const items = [];
      const routes = this.$router.options.routes;

      for (let route of routes) {
        if (route.meta.icon) {
          const item = {
            text: route.name,
            path: route.path,
            title: route.meta.title,
            icon: route.meta.icon,
          };
          items.push(item);
        }
      }

      return items;
    },
  },

  methods: {
    get_image,

    start() {
      const url = `${this.app.url}/categorias`;

      axios.get(url).then((response) => {
        this.categories.items = response.data;
      });

      // delete this.views_ignored[0]
    },

    go_to_page(path) {
      this.$router.push(path);
    },
  },
};
</script>