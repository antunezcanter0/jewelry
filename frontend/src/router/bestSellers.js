export default [
  {
    path: "/best_sellers",
    name: "best_sellers",
    component: () => import("@/views/BestSellers"),
    meta: { title: "Best sellers", icon: "star_rate", role: "user" },
  },
];
