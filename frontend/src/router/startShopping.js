export default [
  {
    path: "/start_shopping",
    name: "start_shopping",
    component: () => import("@/views/StartShopping"),
    meta: { title: "Start shopping", icon: "shopping_bag", role: "user" },
  },
];
