<template>
  <div>
    <router-view></router-view>

    <v-card>
      <v-card-title>
        <v-btn
          fab
          tile
          dark
          class="tertiary_gold--text"
          :to="{ name: 'new_item' }"
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

        <template v-slot:[`item.activo`]="{ item }">
          <v-checkbox dense readonly :value="item.activo"></v-checkbox>
        </template>

        <template v-slot:[`item.en_oferta`]="{ item }">
          <v-checkbox readonly dense :value="item.en_oferta"> </v-checkbox>
        </template>

        <template v-slot:[`item.largo`]="{ item }">
          {{ item.largo }}cm
        </template>

        <template v-slot:[`item.kilate`]="{ item }">
          {{ item.kilate }}K
        </template>

        <template v-slot:[`item.peso`]="{ item }"> {{ item.peso }}g </template>

        <template v-slot:[`item.ancho`]="{ item }">
          {{ item.ancho }}mm
        </template>

        <template v-slot:[`item.imagen`]="{ item }">
          <v-avatar tile>
            <v-img
              :src="get_image(item.imagen, app.url)"
              :alt="item.categoria"
            ></v-img>
          </v-avatar>
        </template>
      </v-data-table>

      <v-snackbar bottom left dark v-model="snackbar">
        {{ $t("record_deleted") }}
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
import { get_image } from "../utils";

export default {
  name: "Items",

  computed: {
    ...Vuex.mapState(["app"]),

    headers() {
      const t = this.$t.bind(this);
      return [
        { text: t("category"), value: "categoria" },
        { text: t("product"), value: "producto" },
        { text: t("description"), value: "descripcion" },
        { text: t("supplier"), value: "proveedor" },
        { text: t("color"), value: "color" },
        { text: t("carat"), value: "kilate" },
        { text: t("weight"), value: "peso" },
        { text: t("long"), value: "largo" },
        { text: t("wide"), value: "ancho" },
        { text: t("image"), value: "imagen" },
        { text: t("available"), value: "existencia" },
        { text: t("in_offer"), value: "en_oferta" },
        { text: t("cost_price"), value: "precio_costo" },
        { text: t("sale_price"), value: "precio_venta" },
        { text: t("offer_price"), value: "precio_oferta" },
        { text: t("active"), value: "activo" },
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
      const url = `${this.app.url}/articulos`;

      axios
        .get(url)
        .then((res) => {
          this.items = res.data;
          // console.log(JSON.stringify(this.items));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    edit(item) {
      this.$router.push({ name: "edit_item", params: { item } });
    },

    remove(item) {
      let res = confirm(this.$t("delete_message"));

      const id = item.id;

      if (res) {
        const url = `${this.app.url}/articulo/${id}`;

        axios({
          method: "delete",
          url: url,
        })
          .then(() => {
            this.snackbar = true;
            this.start();
          })
          .catch((err) => {
            console.error(err.response);
          });
      }
    },
  },
};
</script>
