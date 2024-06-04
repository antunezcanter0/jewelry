import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    app: {
      url: null,
      name: null,
      title: null,
      url_recover: null,
    },
    rules: {
      isRequired: (v) => !!v || "This value is required!",
      isNumber: (v) => !isNaN(parseFloat(v)) || "The value must be a number!",
    },
    full_dialog_add_cart: { show: false },
    cart: { items: [] },
    navigation_drawer: { show: false },
    navigation_drawer_admin: { show: false },
    page_before_login: "",
    forma_pago: { model: null },
    entrega_domicilio: false,
    direccion_entrega: null,
    auth_user: {
      user: null,
      isAuthenticated: false,
    },
    views_ignored: [
      "home",
      "login",
      "register",
      "profile",
      "change_password",
      "lost_password",
    ],
  },

  mutations: {
    UPDATE_APP_STATES(state) {
      state.app.url = process.env.VUE_APP_URL;
      state.app.name = process.env.VUE_APP_NAME;
      state.app.title = process.env.VUE_APP_TITLE;
      state.app.url_recover = process.env.VUE_APP_URL_RECOVER;
    },

    SHOW_FULL_DIALOG_ADD_CART(state, value) {
      state.full_dialog_add_cart.show = value;
    },

    UPDATE_CART(state, params) {
      if (params.index === -1) {
        state.cart.items.push(params.value);
      } else {
        state.cart.items[params.index] = params.value;
      }

      window.sessionStorage.setItem("cart", JSON.stringify(state.cart.items));
    },

    CLEAR_CART(state) {
      state.cart.items = [];
      window.sessionStorage.setItem("cart", JSON.stringify(state.cart.items));
    },

    REMOVE_FROM_CART(state, value) {
      state.cart.items.splice(value, 1);
      window.sessionStorage.setItem("cart", JSON.stringify(state.cart.items));
    },

    UPDATE_ITEM_CART(state, value) {
      state.cart.items[value.index].cantidad = value.cantidad;
      state.cart.items[value.index].subtotal = value.subtotal;
      window.sessionStorage.setItem("cart", JSON.stringify(state.cart.items));
    },

    SHOW_NAV_DRAWER(state, value) {
      state.navigation_drawer.show = value;
    },

    SHOW_NAV_DRAWER_ADMIN(state, value) {
      state.navigation_drawer_admin.show = value;
    },

    UPDATE_PAGE_BEFORE_LOGIN(state, value) {
      state.page_before_login = value;
    },

    UPDATE_FORMA_PAGO(state, value) {
      state.forma_pago.model = value;
    },

    UPDATE_ENTREGA_DOMICILIO(state, value) {
      state.entrega_domicilio = value;
    },

    UPDATE_DIRECCION_ENTREGA(state, value) {
      state.direccion_entrega = value;
    },

    UPDATE_USER_STATUS(state, value) {
      state.auth_user.isAuthenticated = value.isAuthenticated;
      state.auth_user.user = value.user;

      sessionStorage.isAuthenticated = JSON.stringify(value.isAuthenticated);
      sessionStorage.user = JSON.stringify(value.user);
    },
  },

  actions: {
    update_cart({ state, commit }, value) {
      const index = state.cart.items.findIndex((i) => {
        return i.id == value.id;
      });

      commit("UPDATE_CART", { index, value });
    },

    get_token_status({ commit }) {
      if (sessionStorage.user) {
        try {
          const token = JSON.parse(sessionStorage.user).token;
          const { exp } = JSON.parse(atob(token.split(".")[1]));

          if (Date.now() < exp * 1000) {
            const user = JSON.parse(sessionStorage.user);
            const isAuthenticated = true;

            commit("UPDATE_USER_STATUS", {
              isAuthenticated,
              user,
            });
          } else {
            const user = null;
            const isAuthenticated = false;

            commit("UPDATE_USER_STATUS", {
              isAuthenticated,
              user,
            });
          }
        } catch {
          const user = null;
          const isAuthenticated = false;

          commit("UPDATE_USER_STATUS", {
            isAuthenticated,
            user,
          });
        }
      } else {
        const user = null;
        const isAuthenticated = false;

        commit("UPDATE_USER_STATUS", {
          isAuthenticated,
          user,
        });
      }
    },
  },

  modules: {},
});
