export default [
  {
    path: "/most_desired",
    name: "most_desired",
    component: () => import("@/views/MostDesired"),
    meta: { title: "Most desired", icon: "favorite", role: "user" },
  },
];
