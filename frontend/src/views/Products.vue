<template>
  <div>
    <v-card-title>
      <v-btn
        fab
        tile
        dark
        class="tertiary_gold--text"
        :to="{ name: 'new_product' }"
      >
        <v-icon>add</v-icon>
      </v-btn>

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
      <template v-slot:[`item.actions`]="{ item }">
        <td>
          <v-btn text fab small color="strong_gold" @click="edit(item)">
            <v-icon>edit</v-icon>
          </v-btn>
        </td>

        <td>
          <v-btn text fab small color="strong_gold" @click="remove(item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>

      <template v-slot:[`item.imagen`]="{ item }">
        <v-avatar tile>
          <v-img
            :src="get_image(item.imagen, app.url)"
            :alt="item.producto"
          ></v-img>
        </v-avatar>
      </template>
    </v-data-table>

    <v-snackbar bottom left dark v-model="snackbar">
      {{ $t("record_deleted") }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
import { get_image } from "../utils";

export default {
  name: "Producto",

  computed: {
    ...Vuex.mapState(["app"]),

    headers() {
      const t = this.$t.bind(this);
      return [
        { text: t("product"), value: "producto" },
        { text: t("image"), value: "imagen" },
        { text: t("description"), value: "descripcion" },
        { text: "", value: "actions" },
      ];
    },
  },

  data: () => {
    return {
      items: [],
      search: "",
      snackbar: false,
    };
  },

  created() {
    this.start();
  },

  methods: {
    get_image,

    start() {
      const url = `${this.app.url}/productos`;

      axios
        .get(url)
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    edit(item) {
      this.$router.push({ name: "edit_product", params: { item } });
    },

    remove(item) {
      let res = confirm(this.$t("delete_message"));

      const id = item.id;

      if (res) {
        const url = `${this.app.url}/producto/${id}`;

        axios({
          method: "delete",
          url: url,
        })
          .then(() => {
            this.snackbar = true;
            this.start();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>
