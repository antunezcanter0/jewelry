export default [
  {
    path: "/my_shopping",
    name: "my_shopping",
    component: () => import("@/views/MyShopping"),
    meta: { title: "My shopping", icon: "local_mall", role: "user" },
  },
];
