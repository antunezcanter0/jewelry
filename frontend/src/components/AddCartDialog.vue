<template>
  <v-dialog
    fullscreen
    hide-overlay
    v-model="full_dialog_add_cart.show"
    transition="dialog-bottom-transition"
  >
    <v-card class="mx-auto" color="grey lighten-5">
      <v-toolbar flat color="primary_gold">
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top, rgba(0,0,0,.5), rgba(0,0,0,.99)"
          ></v-img>
        </template>

        <v-btn
          icon
          color="tertiary_gold"
          @click="show_full_dialog_add_cart(false)"
        >
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title class="tertiary_gold--text">{{
          $t("add_cart")
        }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <v-badge
          overlap
          bordered
          right
          :content="cart.items.length || '0'"
          color="error darken-2"
        >
          <v-btn fab x-small outlined color="tertiary_gold" to="/cart">
            <v-icon dark>shopping_cart</v-icon>
          </v-btn>
        </v-badge> -->
      </v-toolbar>

      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex md6>
            <v-card outlined>
              <v-img :src="get_image(articulo.model.imagen, app.url)"></v-img>

              <v-divider></v-divider>

              <v-banner>
                <v-card-title class="strong_gold--text">
                  {{ $t("other_items") }}
                </v-card-title>

                <v-slide-group show-arrow>
                  <v-slide-item
                    v-for="item in articulo.items"
                    :key="item.id"
                    class="mx-1"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      flat
                      style="width: auto"
                      @click="select_other(item)"
                    >
                      <v-avatar
                        :color="active ? 'primary' : ''"
                        size="60"
                        v-if="item.id != articulo.model.id"
                        active-class="purple"
                        depressed
                        @click="toggle"
                      >
                        <v-img :src="get_image(item.imagen, app.url)"></v-img>
                      </v-avatar>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-banner>
            </v-card>
          </v-flex>

          <v-flex md6>
            <v-layout column>
              <v-flex>
                <v-card outlined>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h5">
                        <span>
                          {{
                            get_prod_cat(
                              articulo.model,
                              "producto",
                              producto_categoria,
                              producto
                            )
                          }}
                          -
                          {{
                            get_prod_cat(
                              articulo.model,
                              "categoria",
                              producto_categoria,
                              categoria
                            )
                          }}
                        </span>
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        {{ articulo.model.descripcion }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn small outlined disabled>
                        {{ articulo.model.existencia }}
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <!-- <v-divider class="mx-4"></v-divider> -->

                  <v-card-text>
                    <v-row align="center">
                      <v-col class="display-1">
                        <span v-if="articulo.model.precio_venta">
                          <span
                            v-if="articulo.model.en_oferta"
                            class="font-weight-black strong_gold--text"
                          >
                            ${{ format_price(articulo.model.precio_oferta) }}
                          </span>

                          <span
                            :class="
                              !articulo.model.en_oferta
                                ? 'font-weight-black strong_gold--text'
                                : 'font-weight-bold text-decoration-line-through text--disabled subtitle-2'
                            "
                          >
                            ${{ format_price(articulo.model.precio_venta) }}
                          </span>
                        </span>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <!-- <v-card-text>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>send</v-icon>
                      </v-list-item-icon>

                      <v-list-item-subtitle>
                        <span class="font-weight-bold">{{
                          articulo.model.existencia
                        }}</span>
                        {{ $t("available_items") }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-card-text> -->

                  <v-divider></v-divider>

                  <v-card-text>
                    <v-card flat>
                      <v-card-subtitle>{{ $t("features") }}</v-card-subtitle>

                      <v-list dense>
                        <v-list-item v-if="articulo.model.id_kilate">
                          <v-list-item-content>
                            <v-list-item-title
                              >{{ $t("carat") }}:</v-list-item-title
                            >
                          </v-list-item-content>

                          <v-list-item-action>
                            {{
                              get_value(articulo.model, "kilate", kilate.items)
                            }}K
                          </v-list-item-action>
                        </v-list-item>

                        <v-list-item v-if="articulo.model.id_color">
                          <v-list-item-content>
                            <v-list-item-title
                              >{{ $t("color") }}:</v-list-item-title
                            >
                          </v-list-item-content>

                          <v-list-item-action>
                            {{
                              get_value(articulo.model, "color", color.items)
                            }}
                          </v-list-item-action>
                        </v-list-item>

                        <v-list-item v-if="articulo.model.peso">
                          <v-list-item-content>
                            <v-list-item-title
                              >{{ $t("weight") }}:</v-list-item-title
                            >
                          </v-list-item-content>

                          <v-list-item-action>
                            {{ articulo.model.peso }}g
                          </v-list-item-action>
                        </v-list-item>

                        <v-list-item v-if="articulo.model.largo">
                          <v-list-item-content>
                            <v-list-item-title
                              >{{ $t("long") }}:</v-list-item-title
                            >
                          </v-list-item-content>

                          <v-list-item-action>
                            {{ articulo.model.largo }}cm
                          </v-list-item-action>
                        </v-list-item>

                        <v-list-item v-if="articulo.model.ancho">
                          <v-list-item-content>
                            <v-list-item-title
                              >{{ $t("wide") }}:</v-list-item-title
                            >
                          </v-list-item-content>

                          <v-list-item-action>
                            {{ articulo.model.ancho }}mm
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-card outlined>
                  <v-card-subtitle>
                    {{ $t("amount_to_send") }}
                  </v-card-subtitle>

                  <v-card-text class="d-flex">
                    <v-spacer></v-spacer>
                    
                    <v-btn-toggle rounded>
                      <v-btn @click="decrement">
                        <v-icon :color="decrement_color">remove</v-icon>
                      </v-btn>

                      <v-btn darK class="strong_gold--text">
                        {{ value }}
                      </v-btn>

                      <v-btn @click="increment">
                        <v-icon :color="increment_color">add</v-icon>
                      </v-btn>
                    </v-btn-toggle>

                    <v-spacer></v-spacer>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions class="bg-primary">
        <v-spacer></v-spacer>

        <v-btn
          dark
          outlined
          tile
          class="strong_gold--text"
          @click="show_full_dialog_add_cart(false)"
        >
          <v-icon>cancel</v-icon>
          {{ $t("cancel") }}
        </v-btn>

        <v-btn dark tile class="tertiary_gold--text" @click="add_to_cart">
          <v-icon>done</v-icon>
          {{ $t("submit") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";
import { format_price, get_image, get_value, get_prod_cat } from "../utils";

export default {
  name: "AddCartDialog",

  props: [
    "articulo",
    "kilate",
    "color",
    "producto",
    "categoria",
    "producto_categoria",
  ],

  data() {
    return {
      value: 1,
    };
  },

  computed: {
    ...Vuex.mapState(["app", "full_dialog_add_cart", "cart"]),

    decrement_color() {
      return this.value == 1 
        ? "grey lighten-2" 
        : "grey darken-2";
    },

    increment_color() {
      return this.value >= this.articulo.model.existencia
        ? "grey lighten-2"
        : "grey darken-2";
    },
  },

  methods: {
    format_price,
    get_image,
    get_value,
    get_prod_cat,

    ...Vuex.mapMutations({
      show_full_dialog_add_cart: "SHOW_FULL_DIALOG_ADD_CART",
    }),

    ...Vuex.mapActions(["update_cart"]),

    increment() {
      if (this.value < this.articulo.model.existencia) this.value++;
    },

    decrement() {
      if (this.value > 1) this.value--;
    },

    add_to_cart() {
      const item = this.articulo.model;

      const url = `${this.app.url}/articulo`;

      axios({
        method: "get",
        url: url,
        params: { id: item.id },
      }).then((response) => {
        const existencia = response.data.existencia;

        if (parseInt(this.value) <= parseInt(existencia)) {
          const precio = item.en_oferta
            ? item.precio_oferta
            : item.precio_venta;
          const subtotal = parseFloat(
            parseInt(this.value) * parseFloat(precio)
          );
          const product_description = `${this.get_prod_cat(
            item,
            "producto",
            this.producto_categoria,
            this.producto
          )} / ${this.get_prod_cat(
            item,
            "categoria",
            this.producto_categoria,
            this.categoria
          )} - ${item.descripcion} (${this.get_value(
            item,
            "kilate",
            this.kilate.items
          )}K), ${this.get_value(item, "color", this.color.items)}, ${
            item.peso
          }g, ${item.largo}cm, ${item.ancho}mm`;

          item.product_description = product_description;
          item.cantidad = this.value;
          item.precio = precio;
          item.subtotal = subtotal;
          item.editing = false;

          this.update_cart(item);
        } else {
          alert(this.$t("amount_exceeds_alert"));
        }
      });
    },

    select_other(item) {
      this.articulo.model = item;
      this.value = 1;
    },
  },
};
</script>