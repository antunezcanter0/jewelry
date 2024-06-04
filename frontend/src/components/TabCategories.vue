<template>
  <div>
    <v-card flat>
      <v-tabs right show-arrows icons-and-text v-model="model">
        <v-tab v-for="item in items" :key="`${item[0].id}`">
          <v-chip
            pill
            outlined
            label
            color="strong_gold"
            class="text-capitalize"
          >
            <v-avatar left tile>
              <v-img :src="get_image(item[0].imagen, app.url)"> </v-img>
            </v-avatar>
            {{ item[0].categoria }}
          </v-chip>
        </v-tab>

        <v-tab-item v-for="item in items" :key="`${item[0].categoria}`">
          <v-card flat class="d-flex flex-row flex-wrap align-stretch px-0">
            <template v-for="item in item[1]">
              <v-col
                md="3"
                :key="`product-${item.producto}`"
                v-if="item.existencia > 0"
              >
                <v-card tile outlined hover @click="show_items(item)">
                  <v-img
                    class="align-end"
                    :src="get_image(item.imagen, app.url)"
                    height="300"
                  >
                    <div
                      style="
                        background-color: white;
                        opacity: 0.7;
                        font-family: Georgia;
                      "
                      class="black--text font-weight-bold px-2 py-2"
                    >
                      <v-row>
                        <v-col cols="9">
                          <span>{{ item.producto }}</span>
                        </v-col>

                        <v-col cols="2" class="text-center">
                          <v-btn text tile small>{{ item.existencia }}</v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-img>
                </v-card>
              </v-col>
            </template>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";
import { get_image } from "../utils";

export default {
  name: "TabCategories",

  components: {},

  data() {
    return {
      items: [],
      expanded: false,
      model: "",
    };
  },

  created() {
    this.start();
  },

  computed: {
    ...Vuex.mapState(["app", "full_dialog_add_cart"]),
  },

  methods: {
    get_image,

    start() {
      const url = `${this.app.url}/categorias`;

      axios.get(url).then((response) => {
        const items = response.data;

        for (let item of items) {
          axios({
            method: "get",
            url: `${this.app.url}/productos_x_categoria`,
            params: item,
          }).then((response) => {
            let tmp_items = [];

            const _ = async () => {
              for (let i of response.data) {
                const params = {
                  id_producto_categoria: i.id,
                };

                await axios({
                  method: "get",
                  url: `${this.app.url}/suma_articulos`,
                  params: params,
                }).then((response) => {
                  const suma = response.data[0].sum ? response.data[0].sum : 0;
                  i.existencia = suma;
                  tmp_items.push(i);
                });
              }

              await this.items.push([item, tmp_items]);
            };

            _();
          });
        }
      });
    },

    show_items(item) {
      const id = item.id;
      this.$router.push({ name: "list_items", params: { id } });
    },
  },
};
</script>