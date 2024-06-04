<template>
  <v-breadcrumbs
    dense
    color="grey lighten-5"
    v-if="$route.name != 'home'"
    divider=">"
    :items="items"
  >
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",

  data() {
    return {
      items: [],
    };
  },

  watch: {
    $route(to) {
      this.update(to);
    },
  },

  methods: {
    update(to) {
      const t = {
        text: to.meta.title,
        disabled: true,
        href: to.fullPath,
      };

      this.items.push(t);

      if (this.items.length > 4) {
        this.items.splice(0, 1);
      }
    },
  },
};
</script>