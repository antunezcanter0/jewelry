<template>
  <div>
    <Welcome />

    <div>
      <v-divider></v-divider>

      <v-sheet>
        <v-card-title
          style="font-family: geargia"
          class="font-italic text-capitalize font-weight-bold strong_gold--text"
        >
          {{ $t('best_selling_items') }}
        </v-card-title>
        <v-divider></v-divider>
      </v-sheet>

      <alert :message="`${$t('message4')}`"></alert>
      <best-sellers></best-sellers>
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
import Vuex from "vuex";
import Welcome from "../components/Welcome";
import AddCartDialog from "../components/AddCartDialog.vue";
import Alert from "../components/Alert.vue";
import BestSellers from "./BestSellers.vue";

export default {
  name: "Home",

  components: {
    Welcome,
    AddCartDialog,
    Alert,
    BestSellers,
  },

  computed: {
    ...Vuex.mapState(["full_dialog_add_cart"]),
  },
};
</script>
