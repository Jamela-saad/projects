import { createRouter, createWebHistory } from "vue-router";
import ItemPage from "../views/ItemPage.vue";
import OptionPage from "../views/OptionPage.vue";
import CustomAttributePage from "../views/CustomAttributePage.vue";
import CategoriePage from "../views/CategoriePage.vue";
import UnitPage from "../views/UnitPage.vue";
import UserPage from "../views/UserPage.vue";
// import WelcomePage from "../views/WelcomePage.vue";

const routes = [
  {
    path: "/",
    name: "ItemPage",
    component: ItemPage,
  },
  {
    path: "/Option",
    name: "OptionPage",
    component: OptionPage,
  },
  {
    path: "/CustomAttribute",
    name: "CustomAttributePage",
    component: CustomAttributePage,
  },
  {
    path: "/Categorie",
    name: "CategoriePage",
    component: CategoriePage,
  },
  {
    path: "/Unit",
    name: "UnitPage",
    component: UnitPage,
  },
  {
    path: "/User",
    name: "UserPage",
    component: UserPage,
  },
  // {
  //   path: "/",
  //   name: "WelcomePage",
  //   component: WelcomePage,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
