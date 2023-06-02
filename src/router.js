import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";
import { computed } from "vue";

import MainPage from "./components/MainPage.vue";
import LoginPage from "./components/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LoginPage },
    { path: "/login", component: LoginPage },
    { path: "/collection", name: "collection", component: MainPage },
  ],
});

const userId = computed(() => store.getters.getUserId);

router.beforeEach(function (to, _, next) {
  if (to.name !== "collection") {
    next();
  } else if (to.name === "collection" && userId.value) {
    next();
  } else {
    alert("You need to login to view your collection");
    console.error("Please login to view your collection");
    next("/login");
  }
});

export default router;
