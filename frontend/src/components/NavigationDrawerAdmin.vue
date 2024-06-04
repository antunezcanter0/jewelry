<template>
  <v-navigation-drawer fixed right v-model="navigation_drawer_admin.show">
    <v-card flat>
      <v-card-title
        class="font-italic strong_gold--text"
        style="font-family: Georgia"
      >
        {{ $t("admin") }}

        <v-spacer></v-spacer>

        <v-btn
          icon
          fab
          x-small
          @click="show_nav_drawer_admin(!navigation_drawer_admin.show)"
        >
          <v-icon color="strong_gold">close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.text"
            @click="$router.push({ path: item.path })"
          >
            <v-list-item-content>
              <v-list-item-title style="color: #413318">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>arrow_left</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "NavigationDrawerAdmin",

  computed: {
    ...Vuex.mapState([
      "app",
      "isAdmin",
      "navigation_drawer_admin",
      "auth_user",
    ]),

    items() {
      const t = this.$t.bind(this);
      const items = [];
      const routes = this.$router.options.routes;

      for (let route of routes) {
        if (route.meta.role == "admin") {
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
    ...Vuex.mapMutations({ show_nav_drawer_admin: "SHOW_NAV_DRAWER_ADMIN" }),
  },
};
</script>