export default [
  {
    path: "/list_items/:id",
    name: "list_items",
    component: () => import("@/views/ListItems"),
    props: true,
    meta: { title: "List items" },
  },
];
