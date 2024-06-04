export default [
  {
    path: "/offers",
    name: "offers",
    component: () => import("@/views/Offers"),
    meta: { title: "Offers", icon: "local_offer", role: "user" },
  },
];
