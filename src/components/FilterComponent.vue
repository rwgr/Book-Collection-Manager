<template>
  <div class="filter">
    <div class="pagination-select">
      <div>
        <h3 class="filter-heading">RESULTS PER PAGE:</h3>
      </div>
      <div class="pagination-list">
        <select
          name="pagination-list"
          id="pagination-list"
          v-model="paginationSelect"
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="all">All</option>
        </select>
        <div class="search-box-btns">
          <button class="btn" @click.prevent="paginationUpdate">SAVE</button>
        </div>
      </div>
    </div>
    <form class="search-box" @submit.prevent="submitSearch">
      <div>
        <h3 class="filter-heading">SEARCH LIST FOR:</h3>
      </div>
      <div class="search-checkboxes">
        <label for="search-title" class="search-checkboxes--label"
          >Title:
        </label>
        <input
          id="search-title"
          type="radio"
          name="searchby"
          value="title"
          v-model="searchBox.check"
        />
        <label for="search-author" class="search-checkboxes--label"
          >Author:
        </label>
        <input
          id="search-author"
          type="radio"
          name="searchby"
          value="author"
          v-model="searchBox.check"
        />
        <label for="search-series" class="search-checkboxes--label"
          >Series:
        </label>
        <input
          id="search-series"
          type="radio"
          name="searchby"
          value="series"
          v-model="searchBox.check"
        />
        <label for="search-isbn" class="search-checkboxes--label"
          >Identifier:
        </label>
        <input
          id="search-isbn"
          type="radio"
          name="searchby"
          value="isbn"
          v-model="searchBox.check"
        />
        <span class="input-error" v-if="v$.check.$error"
          >Please select a search type above</span
        >
      </div>
      <div>
        <input
          class="search-field"
          type="search"
          id="search"
          v-model="searchBox.input"
        />
      </div>
      <div class="search-box-btns">
        <button class="btn search-btn" @click.prevent="submitSearch">
          SEARCH
        </button>
        <button type="button" class="btn reset-btn" @click.prvent="resetSearch">
          RESET FILTERS
        </button>
      </div>
    </form>
    <div class="sortby-cat">
      <h3 class="filter-heading">SORT LIST BY:</h3>
      <select name="sortby-list" id="sortby-list" v-model="sortCat">
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="series">Series</option>
        <option value="published">Published</option>
        <option value="publisher">Publisher</option>
        <option value="isbn">ISBN</option>
        <option value="genre">Genre</option>
        <option value="language">Language</option>
        <option value="format">Format</option>
        <option value="aquired">Aquired</option>
        <option value="condition">Condition</option>
        <option value="completed">Completed</option>
        <option value="status">Status</option>
      </select>
      <div class="search-box-btns">
        <button class="btn" @click.prevent="sortByCat">SORT</button>
      </div>
    </div>
    <div class="status-sort">
      <h3 class="filter-heading">SORT BY STATUS:</h3>
      <div class="status-sort-box">
        <button type="button" class="btn-sort" @click="sortByStatus">
          ALL BOOKS
        </button>
        <button
          type="button"
          class="btn-sort btn-sort-reading"
          @click="sortByStatus"
        >
          READING
        </button>
        <button
          type="button"
          class="btn-sort btn-sort-completed"
          @click="sortByStatus"
        >
          COMPLETED
        </button>
        <button
          type="button"
          class="btn-sort btn-sort-toread"
          @click="sortByStatus"
        >
          TO-READ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    const store = useStore();
    const searchBox = reactive({
      check: "",
      input: "",
    });
    const sortCat = ref("");
    const paginationSelect = ref("");

    const rules = computed(() => {
      return {
        check: { required },
        input: { required },
      };
    });

    const v$ = useVuelidate(rules, searchBox);

    function submitSearch() {
      v$.value.$validate();
      try {
        if (!v$.value.$error) {
          store.dispatch("searchFilter", searchBox);
        } else {
          throw new Error("No match found!");
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    function resetSearch() {
      v$.value.$reset();
      searchBox.check = "";
      searchBox.input = "";
      store.dispatch("resetFilter");
    }

    function sortByStatus(e) {
      const target = e.target.textContent.trim();
      store.dispatch("sortByStatus", target);
    }

    function sortByCat() {
      store.dispatch("sortByCat", sortCat.value);
    }

    function paginationUpdate() {
      store.dispatch("paginationUpdate", paginationSelect.value);
    }

    return {
      searchBox,
      submitSearch,
      resetSearch,
      v$,
      sortByStatus,
      sortByCat,
      sortCat,
      paginationSelect,
      paginationUpdate,
    };
  },
};
</script>

<style scoped>
.filter {
  width: 93.5%;
  display: flex;
}

.search-box {
  display: flex;
  flex-direction: column;
  width: 25%;
  border-right: 2px dashed #555;
  padding: 0 1rem;
  justify-content: flex-end;
}

.search-checkboxes {
  margin-bottom: 0.5rem;
  margin-top: auto;
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.2fr 1fr;
  gap: 0.2rem;
  justify-content: center;
}

.search-checkboxes--label {
  justify-self: flex-end;
}

.filter-heading {
  border-bottom: 1px dashed #555;
  margin-bottom: 0.5rem;
}

.search-checkboxes label {
  font-weight: 500;
}

.search-checkboxes input {
  margin-right: 0.8rem;
}

.search-field {
  width: 100%;
  margin-right: 1rem;
  padding: 0.2rem 0.4rem;
}

.search-box-btns {
  padding: 0.4rem 0.8rem;
  display: flex;
  justify-content: space-evenly;
}

.input-error {
  color: red;
}

.sortby-cat {
  display: flex;
  flex-direction: column;
  border-right: 2px dashed #555;
  padding: 0 2rem;
  margin-right: 1rem;
  justify-content: space-between;
}

.sortby-cat select {
  padding: 0.2rem 0.4rem;
  margin-top: 1rem;
}

.status-sort {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 4rem;
  /* padding: 0 2rem;
  border-right: 2px dashed #555; */
}

.status-sort-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 1.2rem;
  margin-left: 1.2rem;
}
.reset-btn {
  background-color: rgb(177, 5, 5);
}
.btn-sort {
  padding: 0.5rem 1rem;
  border: 2px solid #333;
  background: none;
  cursor: pointer;
  letter-spacing: 0.1rem;
  font-weight: 700;
  width: 90%;
}

@media (max-width: 1200px) {
}

.btn-sort:hover,
.btn-sort:visited {
  background-color: black;
  color: #fff;
}
.btn-sort-reading {
  background-color: green;
  color: #fff;
}
.btn-sort-completed {
  background-color: rgb(40, 124, 235);
  color: #fff;
}
.btn-sort-toread {
  background-color: #999;
  color: #fff;
}

.pagination-select {
  display: flex;
  flex-direction: column;
  border-right: 2px dashed #555;
  padding: 0 2rem 0 1.5rem;
  margin-right: 1rem;
  justify-content: space-between;
  width: 10%;
}
.pagination-list select {
  margin-top: auto;
  width: 100%;
}
</style>
