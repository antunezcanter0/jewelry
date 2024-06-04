import Vue from "vue";
import VueRouter from "vue-router";
import home from "./home";
import authUser from "./authUser";
import categories from "./categories";
import products from "./products";
import items from "./items";
import listItems from "./listItems";
import cart from "./cart";
import startShopping from "./startShopping";
import offers from "./offers";
import mostDesired from "./mostDesired";
import newItems from "./newItems";
import bestSellers from "./bestSellers";
import myShopping from "./myShopping";
import errors from "./errors";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  ...home,
  ...authUser,
  ...categories,
  ...products,
  ...items,
  ...listItems,
  ...cart,
  ...startShopping,
  ...offers,
  ...mostDesired,
  ...newItems,
  ...bestSellers,
  ...myShopping,
  ...errors,
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("get_token_status");

  const need_auth = ["cart", "my_shopping"];
  const need_admin = [
    "items",
    "new_item",
    "edit_item",
    "categories",
    "new_categorie",
    "edit_categorie",
    "products",
    "new_product",
    "edit_product",
  ];

  const auth_user = router.app.$store.state.auth_user;

  if (need_auth.includes(to.name)) {
    if (!auth_user.user) {
      next("/login");
    }

    if (!auth_user.isAuthenticated) {
      next("/login");
    }
  }

  if (need_admin.includes(to.name)) {
    if (!auth_user.user) {
      next("/login");
    }

    if (!auth_user.isAuthenticated) {
      next("/login");
    }

    if (auth_user.user.role !== "admin") {
      next("/access_denied");
    }
  }

  next();
});

export default router;
