export default [
  {
    path: "/products",
    name: "products",
    component: () => import("@/views/Products"),
    meta: { title: "Products", role: ["admin"] },
  },
  {
    path: "/products/new_product",
    name: "new_product",
    component: () => import("@/components/products/New"),
    meta: { title: "New product" },
  },
  {
    path: "/products/edit_product",
    name: "edit_product",
    component: () => import("@/components/products/Edit"),
    props: true,
    meta: { title: "Edit product" },
  },
];
