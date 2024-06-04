<template>
  <div>
    <v-card color="grey lighten-5">
      <v-container grid-list-md>
        <v-alert border="left" type="error" v-if="!items.length">
          {{ $t("not_items_in_cart") }}
        </v-alert>

        <v-layout column>
          <v-flex>
            <v-card>
              <v-card-title primary-title class="strong_gold--text">
                {{ $t("cart_contents") }}
              </v-card-title>

              <v-card-text>
                <v-data-table
                  hide-default-footer
                  :headers="headers"
                  :items="items"
                >
                  <template v-slot:[`item.imagen`]="{ item }">
                    <v-avatar tile>
                      <v-img
                        :src="get_image(item.imagen, app.url)"
                        :alt="item.categoria"
                      ></v-img>
                    </v-avatar>
                  </template>

                  <template v-slot:[`item.cantidad`]="{ item }">
                    <v-edit-dialog
                      :return-value.sync="item.cantidad"
                      large
                      persistent
                      lazy
                      @save="save_edit(item)"
                    >
                      <v-text-field
                        single-line
                        hide-details
                        outlined
                        disabled
                        dense
                        color="strong_gold"
                        label="Edit"
                        v-model="item.cantidad"
                        append-icon="edit"
                      ></v-text-field>

                      <template v-slot:input>
                        <v-text-field
                          single-line
                          type="number"
                          color="strong_gold"
                          label="Edit"
                          v-model="item.cantidad"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template v-slot:[`item.precio`]="{ item }">
                    ${{ format_price(item.precio) }}
                  </template>

                  <template v-slot:[`item.subtotal`]="{ item }">
                    ${{ format_price(item.subtotal) }}
                  </template>

                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn icon color="strong_gold" @click="remove(item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex>
            <v-card>
              <v-card-title primary-title class="strong_gold--text">{{
                $t("order_totals")
              }}</v-card-title>

              <v-card-text>
                <v-simple-table dense>
                  <tbody>
                    <tr>
                      <td>{{ $t("item_cost_subtotal") }}</td>
                      <td>${{ format_price(get_cost_subtotal()) }}</td>
                    </tr>

                    <tr>
                      <td>+{{ $t("shipping") }}</td>
                      <td>
                        ${{ entrega_domicilio ? precio_transporte : 0.0 }}
                      </td>
                    </tr>

                    <tr>
                      <th>{{ $t("total") }}</th>
                      <th>
                        ${{ format_price(get_cost_total_and_shipping()) }}
                      </th>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex>
            <v-card>
              <v-card-text>
                <v-checkbox
                  v-model="entrega_domicilio"
                  :label="`${$t('home_delivery')}?`"
                ></v-checkbox>

                <v-textarea
                  v-if="entrega_domicilio"
                  outlined
                  v-model="direccion_entrega"
                  rows="3"
                  :label="`${$t('delivery_address')}:`"
                ></v-textarea>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex>
            <v-card>
              <v-card-title primary-title class="strong_gold--text">
                {{ $t("payment_methods") }}
              </v-card-title>

              <v-card-text>
                <v-radio-group v-model="forma_pago.model">
                  <v-radio
                    :label="item.forma_pago"
                    :key="item.id"
                    :value="item.id"
                    v-for="item in forma_pago.items"
                  ></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn dark tile class="tertiary_gold--text" @click="send_order">
          <v-icon>done</v-icon>
          {{ $t("submit") }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      bottom
      vertical
      fixed
      :color="snackbar.color"
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
    >
      <v-icon>{{ snackbar.icon }}</v-icon>
      {{ snackbar.message }}!
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          {{ $t("close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";
import { get_image, format_price } from "../utils";

export default {
  components: {},
  name: "Cart",

  data() {
    return {
      precio_transporte: "7.00",
      forma_pago: { items: [], model: null },
      entrega_domicilio: false,
      direccion_entrega: null,
      snackbar: {
        show: false,
        message: "",
        timeout: 6000,
        color: "red darken-4",
        icon: "error"
      },
    };
  },

  computed: {
    ...Vuex.mapState(["app", "cart"]),

    headers() {
      const t = this.$t.bind(this);
      return [
        { text: t("product_description"), value: "product_description" },
        { text: t("image"), value: "imagen" },
        { text: t("amount"), value: "cantidad" },
        { text: t("price"), value: "precio" },
        { text: t("total"), value: "subtotal" },
        { text: "", value: "action" },
      ];
    },
  },

  watch: {
    $route() {
      this.start();
    },
  },

  created() {
    this.start();
  },

  methods: {
    get_image,
    format_price,

    ...Vuex.mapMutations({
      clear_cart: "CLEAR_CART",
      remove_from_cart: "REMOVE_FROM_CART",
      update_forma_pago: "UPDATE_FORMA_PAGO",
      update_item_cart: "UPDATE_ITEM_CART",
      update_entrega_domicilio: "UPDATE_ENTREGA_DOMICILIO",
      update_direccion_entrega: "UPDATE_DIRECCION_ENTREGA",
    }),

    start() {
      const url = `${this.app.url}/formas_pago`;

      axios.get(url).then((response) => {
        this.forma_pago.items = response.data;
      });

      this.items = this.cart.items;

      let state = this.$store.state;
      this.forma_pago.model = state.forma_pago.model;
      this.entrega_domicilio = state.entrega_domicilio;
      this.direccion_entrega = state.direccion_entrega;
    },

    get_cost_subtotal() {
      const data = this.items;
      let subtotal = 0;

      for (let item of data) {
        if (item) subtotal += parseFloat(item.subtotal);
      }

      return parseFloat(subtotal);
    },

    get_cost_total_and_shipping() {
      const subtotal = this.get_cost_subtotal();
      return (
        subtotal +
        parseFloat(this.entrega_domicilio ? this.precio_transporte : 0.0)
      );
    },

    async send_order() {
      this.snackbar.show = false;
      
      if (!this.cart.items.length) {
        this.snackbar.message = this.$t("not_items_in_cart");
        this.snackbar.show = true;
        return;
      }

      if (this.forma_pago.model == null) {
        this.snackbar.message = this.$t("select_payment_method");
        this.snackbar.show = true;
        return;
      }

      if (this.entrega_domicilio && this.direccion_entrega == null) {
        this.snackbar.message = this.$t("enter_delivery_address");
        this.snackbar.show = true;
        return;
      }

      for (let item of this.items) {
        const response = await axios({
          method: "get",
          url: `${this.app.url}/articulo`,
          params: { id: item.id },
        });

        const existencia = response.data.existencia;
        if (parseInt(item.cantidad) > parseInt(existencia)) {
          this.snackbar.message = `
            ${this.$t("amount_exceeds_alert")} [
              ${item.cantidad}/${existencia}
              ]
          `;
          this.snackbar.show = true;
          return;
        }
      }

      const url = `${this.app.url}/orden`;
      const user = JSON.parse(window.sessionStorage.getItem("user"));

      const params = {
        id_forma_pago: this.forma_pago.model,
        id_estado_orden: 1,
        entrega_domicilio: this.entrega_domicilio,
        direccion: this.direccion_entrega,
      };

      axios({
        method: "post",
        url: url,
        headers: { Authorization: `Bearer ${user.token}` },
        data: this.items,
        params: params,
      })
        .then(() => {
          this.clear_cart();

          this.snackbar.message = this.$t("purchase_alert");
          this.snackbar.color = "black";
          this.snackbar.icon = "done";
          this.snackbar.show = true;

          this.start();
        })
        .catch((err) => {
          const status = err.response.status;
          if (status == 401) {
            this.update_forma_pago(this.forma_pago.model);
            this.update_entrega_domicilio(this.entrega_domicilio);
            this.update_direccion_entrega(this.direccion_entrega);
            this.$router.push("/login");
          } else {
            console.log(JSON.stringify(err.response));
          }
        });
    },

    save_edit(item) {
      const v = this.cart.items.findIndex((i) => i.id == item.id);

      if (v != -1) {
        const subtotal = item.cantidad * item.precio;
        this.update_item_cart({
          index: v,
          cantidad: item.cantidad,
          subtotal: subtotal,
        });
      }
    },

    remove(item) {
      let res = confirm(this.$t("delete_message"));

      if (res) {
        const v = this.cart.items.findIndex((i) => i.id == item.id);

        if (v != -1) {
          this.remove_from_cart(v);
          this.start();
        }
      }
    },
  },
};
</script>