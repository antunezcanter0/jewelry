<template>
  <div>
    <v-card>
      <v-alert tile text type="info" border="left">
        {{ $t("track_status_ordered_item") }}
      </v-alert>

      <v-card-title>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="purchase_id"
          append-icon="search"
          :label="`${$t('purchase_id')}`"
          @click:append="find_order"
          @keypress.enter="find_order"
        ></v-text-field>
      </v-card-title>

      <v-card-text v-if="errors">
        <v-alert type="error" border="left" color="error">{{ errors }}</v-alert>
      </v-card-text>
    </v-card>

    <v-stepper vertical v-model="status">
      <template v-for="(item, index) in order_status">
        <v-stepper-step
          :key="item.id"
          :complete="status >= item.id && status < 4"
          :step="item.id"
          color="strong_gold"
        >
          {{ item.estado_orden }}
        </v-stepper-step>

        <v-stepper-content :key="'content' + index" :step="item.id">
          <v-alert colored-border outlined border="left" type="success" color="tertiary_gold" class="strong_gold--text">
            {{ item.descripcion }}
          </v-alert>
        </v-stepper-content>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: "MyShopping",

  data() {
    return {
      purchase_id: null,
      status: 0,
      order_status: [],
      errors: null,
    };
  },

  computed: {
    ...Vuex.mapState(["app"]),
  },

  mounted() {
    this.start();
  },

  methods: {
    start() {
      const url = `${this.app.url}/estados_ordenes`;
      const user = JSON.parse(window.sessionStorage.getItem("user"));

      axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((response) => {
          this.order_status = response.data;
        })
        .catch((err) => {
          const status = err.response.status;
          if (status == 401) {
            this.$router.push("/login");
          } else {
            console.log(JSON.stringify(err.response));
          }
        });
    },

    find_order() {
      const url = `${this.app.url}/orden`;
      const user = JSON.parse(window.sessionStorage.getItem("user"));
      const params = { id_venta: this.purchase_id };

      axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${user.token}` },
        params: params,
      })
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.status = response.data[0].id_estado_orden;
          console.log(status)
        })
        .catch((err) => {
          const status = err.response.status;
          if (status == 401) {
            this.$router.push("/login");
          } else {
            console.log(JSON.stringify(err.response));
          }
        });
    },
  },
};
</script>