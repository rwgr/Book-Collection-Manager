export default {
  openAdd(state) {
    state.openAddBook = !state.openAddBook;
  },
  closeAdd(state) {
    state.openAddBook = false;
  },
  flagEdit(state, payload) {
    state.flagEdit = payload;
  },
  unflagEdit(state) {
    state.flagEdit = null;
  },
  addNewBook(state, payload) {
    state.bookList.push(payload);
  },
  editBook(state, payload) {
    const updatedBookList = state.bookList.filter(
      (book) => book.id !== payload.id
    );
    updatedBookList.push(payload);
    state.bookList = updatedBookList;
  },
  isLoading(state) {
    state.isLoading = true;
  },
  finishedLoading(state) {
    state.isLoading = false;
  },
  loadBooks(state, payload) {
    state.bookList = payload;
  },
  deleteBook(state, payload) {
    const updatedBookList = state.bookList.filter(
      (book) => book.id !== payload
    );
    state.bookList = updatedBookList;
  },
  searchFilter(state, payload) {
    state.searchCheck = payload.check;
    state.searchInput = payload.input;
  },
  resetFilter(state) {
    state.searchCheck = null;
    state.searchInput = null;
    state.sortStatus = null;
  },
  sortByStatus(state, payload) {
    if (payload.toLowerCase() === "all books") {
      state.sortStatus = null;
    } else {
      state.sortStatus = payload.toUpperCase();
    }
  },
  sortByCat(state, payload) {
    state.sortCat = payload;
  },
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
    state.isLoggedIn = true;
  },
  logout(state) {
    state.isLoggedIn = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  changeSignUpMode(state) {
    state.signUpMode = !state.signUpMode;
  },
  changeShowPassword(state) {
    state.showPassword = !state.showPassword;
  },
  pageTo(state, payload) {
    state.currentPage = payload;
  },
  paginationUpdate(state, payload) {
    state.paginationNumber = payload;
    state.currentPage = 1;
    console.log(state.paginationNumber);
  },
  loadPagination(state, payload) {
    state.paginationNumber = payload;
    console.log(state.paginationNumber);
  },
};
