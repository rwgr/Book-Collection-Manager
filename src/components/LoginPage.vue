<template>
  <div class="container login-flex">
    <form class="login-form">
      <h2 class="login-heading" v-if="!signUpMode">Login</h2>
      <h2 class="login-heading" v-else>Sign Up</h2>
      <div>
        <div>
          <label for="email">E-mail:</label>
        </div>
        <div>
          <input type="text" id="email" v-model="authInputs.email" />
        </div>
        <span class="input-error" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
        <span class="input-error" v-if="v$login.email.$error">{{
          v$login.email.$errors[0].$message
        }}</span>
      </div>
      <div>
        <div class="pass-flex">
          <label for="password">Password:</label>
          <button
            type="button"
            class="btn-show-pass"
            @click.prevent="changeShowPassword"
          >
            Show Password
          </button>
        </div>
        <div>
          <input
            type="password"
            title="Minimum length of 6 characters"
            v-model="authInputs.password.password"
            v-if="!showPassword"
          />
          <input
            type="text"
            title="Minimum length of 6 characters"
            v-model="authInputs.password.password"
            v-else
          />
        </div>
        <span class="input-error" v-if="v$.password.password.$error">{{
          v$.password.password.$errors[0].$message
        }}</span>
        <span class="input-error" v-if="v$login.password.password.$error">{{
          v$login.password.password.$errors[0].$message
        }}</span>
      </div>
      <div v-if="signUpMode">
        <div class="pass-flex">
          <label for="confirm">Confirm Password:</label>
        </div>
        <div>
          <input
            type="password"
            id="confirm"
            v-model="authInputs.password.confirm"
          />
        </div>
      </div>
      <div v-if="signUpMode">
        <span class="input-error" v-if="v$.password.confirm.$error">{{
          v$.password.confirm.$errors[0].$message
        }}</span>
      </div>
      <div>
        <p v-if="!signUpMode">
          Don't have an account yet?
          <button
            type="button"
            class="btn btn-signup"
            @click.prevent="changeSignUpMode"
          >
            SIGN UP
          </button>
        </p>
        <p v-else>
          Already have an account?
          <button
            type="button"
            class="btn btn-signup"
            @click.prevent="changeSignUpMode"
          >
            LOGIN
          </button>
        </p>
      </div>
      <button class="btn" v-if="!signUpMode" @click.prevent="login">
        LOGIN
      </button>
      <button class="btn" v-else @click.prevent="signup">SIGN UP</button>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { minLength, sameAs, email, required } from "@vuelidate/validators";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const signUpMode = computed(() => store.getters.getSignUpMode);
    const showPassword = computed(() => store.getters.getShowPassword);

    const authInputs = reactive({
      email: "",
      password: {
        password: "",
        confirm: "",
      },
    });

    const rulesSignup = computed(() => {
      return {
        email: { required, email },
        password: {
          password: { required, minLength: minLength(6) },
          confirm: {
            required,
            sameAs: sameAs(authInputs.password.password),
          },
        },
      };
    });

    const rulesLogin = computed(() => {
      return {
        email: { required, email },
        password: {
          password: { required, minLength: minLength(6) },
        },
      };
    });

    const v$ = useVuelidate(rulesSignup, authInputs);
    const v$login = useVuelidate(rulesLogin, authInputs);

    async function signup() {
      v$.value.$validate();
      try {
        if (!v$.value.$error) {
          await store.dispatch("signup", [
            authInputs.email,
            authInputs.password.password,
          ]);

          await store.dispatch("login", [
            authInputs.email,
            authInputs.password.password,
          ]);
          router.push("/collection");
        } else {
          throw new Error(
            "There was an issue with the entered email or passwords. Please ensure these are correct, and try again."
          );
        }
      } catch (err) {
        alert(err);
        console.error(err);
      }
    }

    async function login() {
      v$login.value.$validate();
      try {
        if (!v$login.value.$error) {
          await store.dispatch("login", [
            authInputs.email,
            authInputs.password.password,
          ]);
          router.push("/collection");
        } else {
          console.log(v$login.value.$errors);
          throw new Error(
            "There was an issue with the entered email or password. Please ensure these are correct, and try again."
          );
        }
      } catch (err) {
        alert(err);
        console.error(err);
      }
    }

    function changeSignUpMode() {
      v$.value.$reset();
      v$login.value.$reset();
      store.dispatch("changeSignUpMode");
    }
    function changeShowPassword() {
      store.dispatch("changeShowPassword");
    }

    return {
      signUpMode,
      changeSignUpMode,
      signup,
      login,
      changeShowPassword,
      showPassword,
      authInputs,
      v$,
      v$login,
    };
  },
};
</script>

<style scoped>
.login-flex {
  display: flex;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: auto;
  width: auto;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 2px solid black;
  padding: 2.4rem 4.8rem;
}
.login-heading {
  text-align: center;
  font-size: 2.1rem;
  border-bottom: 2px dashed black;
  padding: 0 0 1.2rem 0;
}

.pass-flex {
  display: flex;
  justify-content: space-between;
}
.btn-show-pass {
  background: none;
  border: none;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.25rem;
}

.login-form label {
  padding: 0.1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.login-form input {
  padding: 0.1rem;
  font-size: 1.8rem;
  margin-top: 0.3rem;
}

.login-form p {
  font-size: 1.4rem;
  font-style: italic;
}

.btn-signup {
  margin-left: 0.8rem;
  background-color: #888;
}

.input-error {
  color: red;
}
</style>
