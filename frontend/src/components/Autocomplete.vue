<template>
  <v-col cols="10">
    <v-autocomplete
      v-model="model"
      :loading="loading"
      :items="items"
      :filter="filter"
      class="mx-4"
      outlined
      dense
      filled
      cache-items
      hide-no-data
      hide-details
      prepend-inner-icon="search"
      :label="`${$t('what_looking')}`"
      @change="show_items"
      color="primary_gold"
    >
      <template v-slot:selection="data">
        <v-avatar left xx-small outlined size="36px">
          <v-img :src="data.item.avatar"></v-img>
        </v-avatar>
        {{ data.item.name }} - {{ data.item.group }}
      </template>

      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>

        <template v-else>
          <v-list-item-avatar>
            <img :src="data.item.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="data.item.group"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </v-col>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: "Autocomplete",

  computed: {
    ...Vuex.mapState(["app"]),
  },

  data() {
    return {
      items: [],
      model: null,
      search: null,
      loading: false,
    };
  },

  created() {
    this.start();
  },

  methods: {
    start() {
      const url = `${this.app.url}/categorias`;

      axios.get(url).then((response) => {
        const items = response.data;
        this.productos_categoria(items);
      });
    },

    productos_categoria(items) {
      for (let item of items) {
        axios({
          method: "get",
          url: `${this.app.url}/productos_x_categoria`,
          params: item,
        }).then((response) => {
          this.items.push({ header: item.categoria });

          for (let i of response.data) {
            this.items.push({
              id: i.id,
              name: i.producto,
              group: item.categoria,
              avatar: this.get_image(i.imagen),
            });
          }
        });
      }
    },

    get_image(imagen) {
      if (imagen) {
        const url = this.app.url.slice(0, -4);
        const image_path = imagen.slice(7);
        return `${url}/${image_path}`;
      }
    },

    show_items() {
      if ( this.model ) {
        const id = this.model.id      
        this.$router.push({ name: "list_items", params: { id:id } });
      }
    },

    filter(item, queryText) {
      if (item.name) {
        const two = item.name.toLowerCase();
        const three = item.group.toLowerCase();
        const searchText = queryText.toLowerCase();

        return two.indexOf(searchText) > -1 || three.indexOf(searchText) > -1;
      }
    },
  },
};
</script>

<style>
</style>