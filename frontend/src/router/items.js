export default [
  {
    path: "/items/",
    name: "items",
    component: () => import("@/views/Items"),
    meta: { title: "Items", role: "admin" },
  },
  {
    path: "new_item",
    name: "new_item",
    component: () => import("@/components/items/New"),
    meta: { title: "New item" },
  },
  {
    path: "/items/edit_item",
    name: "edit_item",
    component: () => import("@/components/items/Edit"),
    props: true,
    meta: { title: "Edit item" },
  },
];
