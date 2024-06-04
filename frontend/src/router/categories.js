export default [
  {
    path: "/categories",
    name: "categories",
    component: () => import("@/views/Categories"),
    meta: { title: "Categories", role: "admin" },
  },
  {
    path: "/categories/new_category",
    name: "new_category",
    component: () => import("@/components/categories/New"),
    meta: { title: "New category" },
  },
  {
    path: "/categories/edit_category",
    name: "edit_category",
    component: () => import("@/components/categories/Edit"),
    props: true,
    meta: { title: "Edit category" },
  },
];

