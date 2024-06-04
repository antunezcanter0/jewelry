export default [
  {
    path: "/new_items",
    name: "new_items",
    component: () => import("@/views/NewItems"),
    meta: { title: "New items", icon: "article", role: "user" },
  },
];
