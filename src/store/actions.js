let timer;

export default {
  openAdd(context) {
    context.commit("openAdd");
  },
  closeAdd(context) {
    context.commit("closeAdd");
  },
  flagEdit(context, payload) {
    context.commit("flagEdit", payload);
  },
  unflagEdit(context) {
    context.commit("unflagEdit");
  },
  searchFilter(context, payload) {
    context.commit("searchFilter", payload);
  },
  resetFilter(context) {
    context.commit("resetFilter");
  },
  sortByStatus(context, payload) {
    context.commit("sortByStatus", payload);
  },
  sortByCat(context, payload) {
    context.commit("sortByCat", payload);
  },
  async addNewBook(context, payload) {
    const response = await fetch(
      `https://crud01-cb35c-default-rtdb.europe-west1.firebasedatabase.app/bookList/${context.state.userId}/.json`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add new book!");
    }

    context.commit("addNewBook", payload);
  },
  async editBook(context, payload) {
    const response = await fetch(
      `https://crud01-cb35c-default-rtdb.europe-west1.firebasedatabase.app/bookList/${context.state.userId}/${payload.id}/.json`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update book details!");
    }

    context.commit("editBook", payload);
  },
  async deleteBook(context, payload) {
    const response = await fetch(
      `https://crud01-cb35c-default-rtdb.europe-west1.firebasedatabase.app/bookList/${context.state.userId}/${payload}/.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete book!");
    }
    context.commit("deleteBook", payload);
    console.log("Deleted book entry");
  },
  async loadBooks(context) {
    context.commit("isLoading");
    const response = await fetch(
      `https://crud01-cb35c-default-rtdb.europe-west1.firebasedatabase.app/bookList/${context.state.userId}/.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    context.commit("finishedLoading");
    const responseBookList = [];
    for (const key in responseData) {
      const book = {
        id: key,
        title: responseData[key].title,
        author: responseData[key].author,
        series: responseData[key].series,
        seriesNumber: responseData[key].seriesNumber,
        published: responseData[key].published,
        publisher: responseData[key].publisher,
        isbn: responseData[key].isbn,
        genre: responseData[key].genre,
        language: responseData[key].language,
        aquired: responseData[key].aquired,
        completed: responseData[key].completed,
        format: responseData[key].format,
        condition: responseData[key].condition,
        status: responseData[key].status,
      };
      responseBookList.push(book);
    }
    context.commit("loadBooks", responseBookList);
  },
  // Auth
  async signup(context, payload) {
    const [email, password] = payload;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${context.state.apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Failed to register new user!");
    }
  },
  async login(context, payload) {
    const [email, password] = payload;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${context.state.apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          "Failed to authenticate login. Please check your login data."
      );
      throw error;
    }

    // logout timer, expires in from ResponseData
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  changeSignUpMode(context) {
    context.commit("changeSignUpMode");
  },
  changeShowPassword(context) {
    context.commit("changeShowPassword");
  },
  pageTo(context, payload) {
    context.commit("pageTo", payload);
  },
  paginationUpdate(context, payload) {
    localStorage.setItem("paginationSelect", payload);
    context.commit("paginationUpdate", payload);
  },
  loadPagination(context) {
    const paginationSelect = localStorage.getItem("paginationSelect");
    console.log(paginationSelect);
    if (paginationSelect !== null)
      context.commit("loadPagination", paginationSelect);
  },
};
