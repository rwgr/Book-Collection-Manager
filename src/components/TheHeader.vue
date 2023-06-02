<template>
  <header class="header">
    <router-link to="/collection" class="main-heading"
      >Book Collection Manager</router-link
    >
    <nav class="auth-buttons">
      <button class="btn-auth" @click.prevent="logout" v-if="userId">
        LOGOUT
      </button>
      <router-link class="btn-auth" to="/login" v-else
        >LOGIN / SIGN UP</router-link
      >
    </nav>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const userId = computed(() => store.getters.getUserId);

    function logout() {
      store.dispatch("logout");
      router.push("/");
    }

    return { userId, logout };
  },
};
</script>

<style scoped>
.header {
  border-bottom: 2px solid black;
  height: 9rem;
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #587c88;
  width: 100%;
}

.main-heading {
  font-size: 2.5rem;
  margin-left: 4rem;
  text-decoration: none;
  /* color: #333; */
  font-weight: 700;
  font-style: italic;
  color: #fff;
}

.login {
  margin-right: 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
}
.login label {
  padding: 0 1rem;
}

.login input {
  max-width: 18rem;
  padding: 0.3rem;
}

.auth-buttons {
  margin-right: 3.4rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.btn-auth {
  background: #555;
  color: #fff;
  padding: 1.2rem 2.4rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.1rem;
  border: none;
}

.btn-auth:hover {
  background-color: black;
}
</style>
