<template>
  <div>
    <v-card
      flat
      color="grey lighten-5"
      class="d-flex flex-row flex-wrap align-stretch"
    >
      <v-col md="3" v-for="item in articulo.items" :key="item.id">
        <v-card outlined class="align-end">
          <v-img height="400" :src="get_image(item.imagen, app.url)"></v-img>

          <v-list dense>
            <v-list-item one-line>
              <v-list-item-content>
                <v-list-item-title>
                  <div v-if="item.precio_venta">
                    <span
                      v-if="item.en_oferta"
                      class="font-weight-black strong_gold--text body-1"
                    >
                      ${{ format_price(item.precio_oferta) }}
                    </span>

                    <span
                      :class="
                        !item.en_oferta
                          ? 'font-weight-black strong_gold--text body-1'
                          : 'font-weight-bold text-decoration-line-through text--disabled caption'
                      "
                    >
                      ${{ format_price(item.precio_venta) }}
                    </span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>
                  <v-btn tile x-small outlined label disabled>
                    <span class="font-weight-black">{{ item.existencia }}</span>
                  </v-btn>
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>

            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="text--primary">
                    {{
                      get_prod_cat(
                        item,
                        "producto",
                        producto_categoria,
                        producto
                      )
                    }}
                    -
                    <span class="font-italic text-uppercase">
                      {{
                        get_prod_cat(
                          item,
                          "categoria",
                          producto_categoria,
                          categoria
                        )
                      }}
                    </span>

                    (<b>{{ get_value(item, "kilate", kilate.items) }}K</b>)
                  </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <p class="mb-0">
                    <span>{{ item.descripcion }}</span>,
                    <span v-if="item.id_color">
                      {{ get_value(item, "color", color.items) }}</span
                    >
                    <span v-if="item.peso"
                      >, {{ item.peso }}g {{ $t("of") }}
                      {{ $t("weight") }}</span
                    >
                    <span v-if="item.largo"
                      >, {{ item.largo }}cm {{ $t("long") }}</span
                    >
                    <span v-if="item.ancho"
                      >, {{ item.ancho }}mm {{ $t("wide") }}</span
                    >
                    <span>.</span>
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-btn
              block
              outlined
              tile
              color="strong_gold"
              :title="`${$t('add_cart')}`"
              @click="show_dialog(item)"
            >
              <v-icon>shopping_cart</v-icon>
              {{ $t("add_cart") }}
            </v-btn>
          </v-card-actions>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              icon
              :title="`${$t('want_this_article')}`"
              @click="inc_articulo_deseado(item.id)"
            >
              <v-icon>favorite</v-icon>
              {{ item.deseado }}
            </v-btn>

            <v-btn icon>
              <v-icon :title="`${$t('share_this_article')}`">share</v-icon>
              {{ item.compartido }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-card>

    <div v-if="$route.name != 'list_items'">
      <v-divider></v-divider>
      <page-headers :text="`${$t('keep_buying')} ${$t('by')} ${$t('categories')}`"></page-headers>
      <alert :message="`${$t('message3')}`"></alert>
      <tab-categories></tab-categories>
    </div>

    <add-cart-dialog
      v-if="full_dialog_add_cart.show"
      :articulo="articulo"
      :kilate="kilate"
      :color="color"
      :producto="producto"
      :categoria="categoria"
      :producto_categoria="producto_categoria"
    ></add-cart-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
import { format_price, get_image, get_value, get_prod_cat } from "../utils";
import AddCartDialog from "../components/AddCartDialog.vue";
import Alert from "../components/Alert.vue";
import PageHeaders from "../components/PageHeaders.vue";
import TabCategories from "../components/TabCategories.vue";

export default {
  name: "NewItems",

  components: { AddCartDialog, Alert, PageHeaders, TabCategories },

  data() {
    return {
      articulo: { items: [], model: "" },
      kilate: { items: [] },
      color: { items: [] },
      producto: { items: [] },
      categoria: { items: [] },
      producto_categoria: { items: [] },
      dialog: { show: false },
    };
  },

  watch: {
    $route() {
      this.start();
    },
  },

  created() {
    this.start();
  },

  computed: {
    ...Vuex.mapState(["app", "full_dialog_add_cart"]),
  },

  methods: {
    format_price,
    get_image,
    get_value,
    get_prod_cat,

    ...Vuex.mapMutations({
      show_full_dialog_add_cart: "SHOW_FULL_DIALOG_ADD_CART",
    }),

    start() {
      this.show_full_dialog_add_cart(false);

      axios.get(`${this.app.url}/articulos_nuevos`).then((response) => {
        this.articulo.items = response.data;
      });

      axios
        .all([
          axios.get(`${this.app.url}/kilates`),
          axios.get(`${this.app.url}/colores`),
          axios.get(`${this.app.url}/productos`),
          axios.get(`${this.app.url}/categorias`),
          axios.get(`${this.app.url}/productos_categorias`),
        ])
        .then((response) => {
          this.kilate.items = response[0].data;
          this.color.items = response[1].data;
          this.producto.items = response[2].data;
          this.categoria.items = response[3].data;
          this.producto_categoria.items = response[4].data;
        });
    },

    show_dialog(item) {
      this.articulo.model = item;
      this.show_full_dialog_add_cart(true);
    },

    inc_articulo_deseado(id) {
      const url = `${this.app.url}/inc_articulo_deseado`;

      axios({
        method: "post",
        url: url,
        params: { id: id },
      }).then((response) => {
        const index = this.articulo.items.findIndex((i) => i.id == id);

        if (index != -1) {
          this.articulo.items[index].deseado = response.data[0];
        }
      });
    },
  },
};
</script>