import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const store = createStore({
  state() {
    return {
      openAddBook: false,
      flagEdit: null,
      bookList: [],
      isLoading: null,
      searchCheck: null,
      searchInput: null,
      sortStatus: null,
      sortCat: null,
      apiKey: "example",
      token: null,
      userId: null,
      didAutoLogout: false,
      isLoggedIn: false,
      signUpMode: false,
      showPassword: false,

      currentPage: 1,
      paginationNumber: 10,
    };
  },
  mutations,
  actions,
  getters,
});

export default store;
