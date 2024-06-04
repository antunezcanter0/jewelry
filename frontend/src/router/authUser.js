export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "Login" },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "Register" },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/auth/Profile"),
    meta: { title: "Profile" },
  },
  {
    path: "/change_password/:email",
    name: "change_password",
    component: () => import("@/components/auth_user/ChangePassword"),
    meta: { title: "Change Password" },
  },
  {
    path: "/lost_password",
    name: "lost_password",
    component: () => import("@/components/auth_user/LostPassword"),
    meta: { title: "Lost Pasword" },
  },
  {
    path: "/auth_user",
    name: "auth_user",
    component: () => import("@/views/auth/AuthUser"),
    meta: { title: "Auth User", role: "admin" },
  },
  // {
  //   path: "/new_user",
  //   name: "new_user",
  //   component: () => import("@/components/auth_user/New"),
  //   meta: { title: "New User", role: "admin" },
  // },
  // {
  //   path: "/edit_user",
  //   name: "edit_user",
  //   component: () => import("@/components/auth_user/Edit"),
  //   meta: { title: "Edit User", role: "admin" },
  // },
];
