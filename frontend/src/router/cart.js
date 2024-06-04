
export default [
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart"),
    meta: { title: "shopping_cart", icon: "shopping_cart", role: "user" },
  },
];
