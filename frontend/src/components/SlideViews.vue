<template>
  <div>
    <v-toolbar
      dense
      tile
      v-if="!views_ignored.includes($route.name)"
    >
      <v-spacer></v-spacer>

      <v-slide-group show-arrows>
        <v-slide-item
          v-for="item in items"
          :key="item.text"
          v-slot="{ active, toggle }"
        >
          <v-sheet color="transparent" @click="toggle">
            <v-btn
              class="mx-1 text-capitalize"
              :input-value="active"
              tile
              plain
              color="strong_gold"
              :to="{ path: item.path }"
            >
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-btn>
          </v-sheet>
        </v-slide-item>
      </v-slide-group>
    </v-toolbar>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "SlideView",

  computed: {
    ...Vuex.mapState(["views_ignored"]),

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

  created() {
    this.start();
  },

  methods: {
    ...Vuex.mapActions([]),

    start() {},
  },
};
</script>