export default {
  getBookList(state) {
    return state.bookList;
  },
  getOpenAddBook(state) {
    return state.openAddBook;
  },
  getFlagEdit(state) {
    return state.flagEdit;
  },
  getCurrentPage(state) {
    return state.currentPage;
  },
  getPaginationNumber(state) {
    return state.paginationNumber;
  },
  getNumberOfPages(state) {
    return Math.ceil(state.bookList.length / state.paginationNumber);
  },
  getFilteredBookList(state) {
    const currentPage = state.currentPage;
    let paginationNumber = state.paginationNumber;

    if (paginationNumber === "all") {
      paginationNumber = 100000;
    }

    const start = (currentPage - 1) * paginationNumber;
    const end = currentPage * paginationNumber;
    // let bookList = state.bookList.slice(start, end);

    let bookList = state.bookList
      .sort((a, b) => a.author.localeCompare(b.author))
      .slice(start, end);

    if (state.sortCat)
      bookList = state.bookList
        .sort((a, b) => a[state.sortCat].localeCompare(b[state.sortCat]))
        .slice(start, end);

    if (state.sortStatus && !state.searchCheck) {
      return state.bookList.filter((book) => book.status === state.sortStatus);
    } else if (state.searchCheck && state.sortStatus) {
      return state.bookList
        .filter((book) => book.status === state.sortStatus)
        .filter((book) =>
          book[state.searchCheck]
            .toLowerCase()
            .includes(state.searchInput.toLowerCase())
        );
    } else if (state.searchCheck && !state.sortStatus) {
      return state.bookList.filter((book) =>
        book[state.searchCheck]
          .toLowerCase()
          .includes(state.searchInput.toLowerCase())
      );
    } else {
      return bookList;
    }
    // bookList = state.bookList.sort((a, b) => a.author.localeCompare(b.author));

    // if (state.sortCat)
    //   bookList = state.bookList.sort((a, b) =>
    //     a[state.sortCat].localeCompare(b[state.sortCat])
    //   );

    // if (state.sortStatus && !state.searchCheck) {
    //   return bookList.filter((book) => book.status === state.sortStatus);
    // } else if (state.searchCheck && state.sortStatus) {
    //   return state.bookList
    //     .filter((book) => book.status === state.sortStatus)
    //     .filter((book) =>
    //       book[state.searchCheck]
    //         .toLowerCase()
    //         .includes(state.searchInput.toLowerCase())
    //     );
    // } else if (state.searchCheck && !state.sortStatus) {
    //   return bookList.filter((book) =>
    //     book[state.searchCheck]
    //       .toLowerCase()
    //       .includes(state.searchInput.toLowerCase())
    //   );
    // } else {
    //   return bookList;
    // }
  },
  getUserId(state) {
    return state.userId;
  },
  getSignUpMode(state) {
    return state.signUpMode;
  },
  getShowPassword(state) {
    return state.showPassword;
  },

  getdidAutoLogout(state) {
    return state.didAutoLogout;
  },
  getAnyFilters(state) {
    if (state.searchCheck || state.searchInput || state.sortStatus) return true;
  },
};
