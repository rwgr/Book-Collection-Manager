<template>
  <main class="main">
    <div class="container">
      <div class="filter-container">
        <filter-component></filter-component>
        <div class="btn-add-container">
          <button class="btn-add" @click="openAdd">ADD NEW BOOK</button>
        </div>
      </div>
      <transition name="add" mode="out-in">
        <add-book v-if="openAddBook"></add-book>
      </transition>

      <div class="list">
        <div
          class="list-item"
          v-for="book in filteredBookList"
          :key="book.id"
          v-if="filteredBookList.length > 0"
        >
          <div class="list-titles">
            <div>Author</div>
            <div>Title</div>
            <div>Series</div>
          </div>
          <div class="list-items">
            <div>{{ book.author }}</div>
            <div>{{ book.title }}</div>
            <div v-if="book.series">
              {{ book.series }}
              <span v-if="book.seriesNumber">#{{ book.seriesNumber }}</span>
            </div>
            <div v-else>&nbsp;</div>
          </div>
          <div class="list-titles">
            <div>Published</div>

            <div>Publisher</div>
            <div>Identifier</div>
          </div>
          <div class="list-items">
            <div v-if="book.published">{{ book.published }}</div>
            <div v-else>&nbsp;</div>
            <div v-if="book.publisher">{{ book.publisher }}</div>
            <div v-else>&nbsp;</div>
            <div v-if="book.isbn">{{ book.isbn }}</div>
            <div v-else>&nbsp;</div>
          </div>
          <div class="list-titles">
            <div>Genre</div>
            <div>Language</div>
            <div>Format</div>
          </div>
          <div class="list-items">
            <div v-if="book.genre">{{ book.genre }}</div>
            <div v-else>&nbsp;</div>
            <div v-if="book.language">{{ book.language }}</div>
            <div v-else>&nbsp;</div>
            <div v-if="book.format">{{ book.format }}</div>
            <div v-else>&nbsp;</div>
          </div>
          <div class="list-titles">
            <div>Aquired</div>
            <div>Condition</div>
            <div>Completed</div>
          </div>
          <div class="list-items">
            <div v-if="book.aquired">{{ book.aquired }}</div>
            <div v-else>&nbsp;</div>
            <div v-if="book.condition">{{ book.condition }}</div>
            <div v-else>&nbsp;</div>
            <div v-if="book.completed">{{ book.completed }}</div>
            <div v-else>N/A</div>
          </div>
          <div class="list-titles">
            <div class="status-title">Status</div>

            <div
              class="status"
              :class="[
                book.status === 'READING'
                  ? 'status-reading'
                  : book.status === 'TO-READ'
                  ? 'status-toread'
                  : book.status === 'COMPLETED'
                  ? 'status-completed'
                  : null,
              ]"
            >
              {{ book.status }}
            </div>
          </div>
          <div class="list-buttons">
            <button class="btn btn-main btn-edit" @click.prevent="openEdit">
              EDIT
            </button>
            <button class="btn btn-main" @click.prevent="deleteBook">
              DELETE
            </button>
            <p class="book-entry-id" id="book-id">{{ book.id }}</p>
          </div>
        </div>
        <div v-else class="list-item no-result">
          There are no results to display.
        </div>
      </div>

      <div class="pagination" v-if="!anyFilters">
        <button
          class="btn"
          :class="[currentPage <= 1 ? 'btn-pagination-hide' : null]"
          @click="pageTo(currentPage - 1)"
        >
          PREV PAGE
        </button>
        <ul v-if="paginationNumber !== 'all'">
          <li class="pagination-text-current">Page {{ currentPage }}</li>
          <li class="pagination-text-total">of {{ numberOfPages }} page(s)</li>
          <li class="pagination-text-total">
            <strong>(</strong> {{ bookList.length }} results total
            <strong>)</strong>
          </li>
        </ul>
        <ul v-else>
          <li class="pagination-text-current">
            Showing all {{ bookList.length }} results
          </li>
        </ul>
        <button
          class="btn"
          @click="pageTo(currentPage + 1)"
          :class="[
            currentPage === numberOfPages || paginationNumber === 'all'
              ? 'btn-pagination-hide'
              : null,
          ]"
        >
          NEXT PAGE
        </button>
      </div>
      <div class="pagination" v-else>
        <p class="pagination-text-current">
          {{ filteredBookList.length }} results found
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from "vuex";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

import AddBook from "./AddBook.vue";
import FilterComponent from "./FilterComponent.vue";

export default {
  components: {
    AddBook,
    FilterComponent,
  },
  emits: ["openEdit"],
  setup(_, { emit }) {
    const store = useStore();
    const router = useRouter();
    const filteredBookList = computed(() => store.getters.getFilteredBookList);
    const currentPage = computed(() => store.getters.getCurrentPage);
    const numberOfPages = computed(() => store.getters.getNumberOfPages);
    const paginationNumber = computed(() => store.getters.getPaginationNumber);
    const bookList = computed(() => store.getters.getBookList);
    const anyFilters = computed(() => store.getters.getAnyFilters);

    const openAddBook = computed(() => store.getters.getOpenAddBook);
    const didAutoLogout = computed(() => store.getters.getdidAutoLogout);

    watch(didAutoLogout, () => {
      router.push("/login");
    });

    function loadBooks() {
      store.dispatch("loadBooks");
    }
    loadBooks();

    function openAdd() {
      store.dispatch("openAdd");
    }

    function pageTo(page) {
      if (
        page === 0 ||
        page > numberOfPages.value ||
        paginationNumber.value === "all"
      ) {
        return;
      } else {
        store.dispatch("pageTo", page);
      }
    }
    function openEdit(e) {
      const id = e.target
        .closest("div")
        .parentNode.querySelector("p").textContent;

      store.dispatch("flagEdit", id);
      store.dispatch("openAdd");
    }

    function deleteBook(e) {
      const id = e.target.closest("div").querySelector("p").textContent;
      if (!id) return;

      if (confirm("Are you sure you want to delete this book entry?")) {
        alert("Entry deleted!");

        store.dispatch("deleteBook", id);
        store.dispatch("loadBooks");
      } else {
        return;
      }
    }
    return {
      filteredBookList,
      openEdit,
      deleteBook,
      openAdd,
      openAddBook,
      currentPage,
      numberOfPages,
      pageTo,
      paginationNumber,
      bookList,
      anyFilters,
    };
  },
};
</script>

<style scoped>
.main {
  flex: 1;
}
.filter-container {
  width: 100%;
  border: 0.2rem solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.btn-add-container {
  padding: 1rem 0rem 1rem 1rem;
  background-color: #88587c;
  margin: 0.2rem;
}

.btn-add {
  width: 7.6rem;
  margin-right: 1rem;
  padding: 1.2rem 0.6rem;
  font-size: 1.6rem;
  background-color: #88587c;
  color: #fff;
  font-weight: 700;
  line-height: 1.2;
  border: 2px solid #fff;
  text-align: center;
  cursor: pointer;
}

.btn-add:hover,
.btn-add:visited {
  background-color: #fff;
  color: #88587c;
}

/* List Item */
.list {
  border-left: 0.2rem solid black;
  border-right: 0.2rem solid black;
  display: flex;
  flex-direction: column;
  backface-visibility: hidden;
}

.list-item {
  display: grid;
  justify-content: flex-start;
  align-items: center;
  grid-template-columns: 0.3fr 1fr 0.3fr 0.8fr 0.3fr 0.5fr 0.3fr 0.5fr 0.5fr 0.5fr;
  border-bottom: 2px solid black;
  padding: 0.2rem 0.1rem;
  animation: moveInRight 1s ease-out;
}

@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }

  80% {
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
.list-item:nth-child(even) {
  background-color: #e7dee5;
}
.list-item:hover {
  background-color: rgb(201, 201, 201);
}
.list-titles {
  text-align: center;
  font-weight: 700;
}

.list-titles--span {
  font-size: 1.2rem;
  font-weight: 700;
}
.list-items {
  text-align: start;
  margin-left: 1rem;
}
.status-title {
  padding: 0.1rem 0.2rem;
}
.status {
  padding: 0.5rem;
  text-align: center;
  border-radius: 1rem;
  color: #fff;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.no-result {
  display: block;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
}
.list-buttons {
  text-align: end;
}
.status-reading {
  background-color: green;
}
.status-toread {
  background-color: #999;
}
.status-completed {
  background-color: rgb(40, 124, 235);
}
.btn-main {
  padding: 0.5rem;
  width: 70%;
}

.btn-main:hover,
.btn-main:visited {
  background-color: black;
}

.book-entry-id {
  display: none;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.2rem;
  gap: 1.2rem;
  text-align: center;
  /* absolute broken at small view widths
  position: absolute;
  bottom: 1%;
  left: 40%; */
}
.pagination-text-current {
  font-weight: 600;

  font-size: 1.5rem;
  list-style: none;
}
.pagination-text-total {
  font-weight: 400;
  list-style: none;
}
.btn-pagination-hide {
  opacity: 0;
  cursor: auto;
}

/* AddBook Transitions */
.add-enter-from {
  opacity: 0;
  transform: translateZ(100);
}
.add-enter-active {
  transition: all 0.3s ease-in;
}

.add-leave-active {
  transition: all 0.3s ease-in;
}

.add-enter-to,
.add-leave-from {
  opacity: 1;
  transform: translateZ(0rem);
}

.add-leave-to {
  opacity: 0;
  transform: translateZ(-100);
}

/* ListItem Transitions */
.list-enter-from {
  opacity: 0;
  transform: translateZ(100);
}
.list-enter-active {
  transition: all 0.3s ease-in;
}

.list-leave-active {
  transition: all 0.3s ease-in;
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateZ(0rem);
}

.list-leave-to {
  opacity: 0;
  transform: translateZ(-100);
}
</style>
