<template>
  <v-navigation-drawer fixed v-model="navigation_drawer.show">
    <v-card flat color="transparent">
      <v-card-title
        class="font-italic strong_gold--text"
        style="font-family: Georgia"
      >
        <v-btn
          icon
          fab
          x-small
          @click="show_nav_drawer(!navigation_drawer.show)"
        >
          <v-icon color="strong_gold">close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        {{ $t(app.title) }}
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.text"
            @click="$router.push({ path: item.path })"
          >
            <v-list-item-icon>
              <v-icon color="strong_gold">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "NavigationDrawer",

  computed: {
    ...Vuex.mapState(["app", "navigation_drawer"]),

    items() {
      const t = this.$t.bind(this);
      const items = [];
      const routes = this.$router.options.routes;

      for (let route of routes) {
        if (route.meta.role == "user") {
          const item = {
            text: t(route.name),
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
    ...Vuex.mapMutations({ show_nav_drawer: "SHOW_NAV_DRAWER" }),
  },
};
</script>