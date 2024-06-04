export default [
  {
    path: "/access_denied",
    name: "access_denied",
    component: () => import("@/views/errors/AccessDenied"),
    meta: { title: "Access Denied" },
  },
  {
    path: "/not_found",
    name: "not_found",
    component: () => import("@/views/errors/NotFound"),
    meta: { title: "Not Found" },
  },
];
