<template>
  <div class="app">
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import { useStore } from "vuex";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  setup() {
    const store = useStore();
    store.dispatch("tryLogin");
    store.dispatch("loadPagination");
    return {};
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: sans-serif;
  color: #333;
  font-weight: 400;
  font-size: 1.5rem;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 150rem;
  margin: 0 auto;
  padding: 0 3.2rem;
}

@media (max-width: 1200px) {
  .container {
    min-width: 120rem;
  }
}

.grid {
  display: grid;
  justify-content: flex-start;
  align-items: center;
}

.btn {
  background: none;
  cursor: pointer;
  padding: 0.1rem;
  border: none;
  margin-top: 0.2rem;
  margin-right: 0.1rem;
  padding: 0.5rem 1rem;
  background-color: #555;
  color: white;
  letter-spacing: 0.1rem;
  font-weight: 700;
}
.btn:hover,
.btn:visited {
  background-color: black;
}

/* Transitions */
.route-enter-from {
  opacity: 0;
  transform: translateZ(100);
}
.route-enter-active {
  transition: all 0.5s ease-in;
}

.route-leave-active {
  transition: all 0.5s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateZ(0rem);
}

.route-leave-to {
  opacity: 0;
  transform: translateZ(-100);
}
</style>
