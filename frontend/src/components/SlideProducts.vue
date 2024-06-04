<template>
  <div>
    <v-card tile>
      <v-card-text>
        <v-slide-group show-arrows>
          <v-slide-item
            v-for="item in producto.items"
            :key="item.producto"
            v-slot="{ active, toggle }"
          >
            <v-chip
              class="mx-1"
              :input-value="active"
              acive-class="purple"
              color="primary darken-2"
              depressed
              rounded
              outlined
              @click="toggle"
            >
              <v-avatar left>
                <v-icon></v-icon>
              </v-avatar>
              {{ item.producto }}
            </v-chip>
          </v-slide-item>
        </v-slide-group>
      </v-card-text>
    </v-card>

    <v-card tile>
      <v-card-text>
        <v-slide-group show-arrows>
          <v-slide-item
            v-for="item in articulo.items"
            :key="item.id"
            v-slot="{ active, toggle }"
          >
            <v-card class="ma-4" @click="toggle">
              <v-card-text>
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      color="white"
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition>

                  {{ item }}
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn block dark></v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";

export default {
  name: "SlideProducto",

  computed: {
    ...Vuex.mapState(["app"]),
  },

  data() {
    return {
      producto: {
        items: [],
        model: null,
      },
      articulo: { items: [] },
    };
  },

  created() {
    this.start();
  },

  methods: {
    start() {
      axios
        .all([
          axios.get(`${this.app.url}/productos`),
          axios.get(`${this.app.url}/productos_categorias`),
        ])
        .then((response) => {
          this.producto.items = response[0].data;
          this.producto.model = response[1].data[0];

          const url = `${this.app.url}/articulo_producto/${this.producto.model.id_producto}`;
          axios({
            method: "get",
            url: url,
          }).then((response) => {
            this.articulo.items = response.data;
          });
        });
    },
  },
};
</script>