<template>
  <div class="backdrop">
    <dialog open class="dialog">
      <h2 class="dialog-heading" v-if="!flagEdit">Add a New Book</h2>
      <h2 class="dialog-heading" v-else>Edit Book Details</h2>
      <div class="search-container">
        <h4>Search By Identifier (ISBN, OCLC, LCCN or OLID)</h4>
        <div class="search-container--inputs">
          <label for="isbn-search-type">Type:</label>
          <select
            name="isbn-search-type"
            id="isbn-search-type"
            v-model.trim="isbnSearch.format"
          >
            <option value="OCLC">OCLC</option>
            <option value="ISBN">ISBN</option>
            <option value="LCCN">LCCN</option>
            <option value="OLID">OLID</option>
          </select>
          <label for="isbn-search-number">Number:</label>
          <input
            type="number"
            id="isbn-search-number"
            v-model.trim="isbnSearch.searchNo"
            class="search-container--inputs-input"
          />
          <button class="btn btn-small" @click="isbnSearchRequest">
            SEARCH
          </button>
        </div>
      </div>
      <form class="addBookForm">
        <div class="form-item">
          <label for="title" class="input-title-required"
            >Title:
            <span class="input-error" v-if="v$.title.$error">{{
              v$.title.$errors[0].$message
            }}</span></label
          >
          <input type="text" id="title" v-model.trim="newBook.title" />
        </div>
        <div class="form-item">
          <label for="author" class="input-title-required"
            >Author:
            <span class="input-error" v-if="v$.author.$error">{{
              v$.author.$errors[0].$message
            }}</span></label
          >
          <input type="text" id="author" v-model.trim="newBook.author" />
        </div>
        <div class="form-item">
          <label for="series"
            >Series:
            <span class="input-error" v-if="v$.series.$error">{{
              v$.series.$errors[0].$message
            }}</span></label
          >
          <input type="text" id="series" v-model.trim="newBook.series" />
        </div>
        <div class="form-item">
          <label for="seriesNumber"
            >Series Number:
            <span class="input-error" v-if="v$.seriesNumber.$error">{{
              v$.seriesNumber.$errors[0].$message
            }}</span></label
          >
          <input
            type="number"
            id="seriesNumber"
            v-model.trim="newBook.seriesNumber"
          />
        </div>
        <div class="form-item">
          <label for="published"
            >Year Published:
            <span class="input-error" v-if="v$.published.$error">{{
              v$.published.$errors[0].$message
            }}</span></label
          >
          <input type="text" id="published" v-model.trim="newBook.published" />
        </div>
        <div class="form-item">
          <label for="publisher"
            >Publisher:
            <span class="input-error" v-if="v$.publisher.$error">{{
              v$.publisher.$errors[0].$message
            }}</span></label
          >
          <input type="text" id="publisher" v-model.trim="newBook.publisher" />
        </div>
        <div class="form-item">
          <label for="isbn"
            >ISBN / OCLC / LCCN / OLID:
            <span class="input-error" v-if="v$.isbn.$error">{{
              v$.isbn.$errors[0].$message
            }}</span></label
          >
          <input type="text" id="isbn" v-model.trim="newBook.isbn" />
        </div>
        <div class="form-item">
          <label for="genre"
            >Genre:
            <span class="input-error" v-if="v$.genre.$error">{{
              v$.genre.$errors[0].$message
            }}</span></label
          >
          <input type="text" id="genre" v-model.trim="newBook.genre" />
        </div>
        <div class="form-item">
          <label for="language"
            >Language:
            <span class="input-error" v-if="v$.language.$error">{{
              v$.language.$errors[0].$message
            }}</span></label
          >
          <input type="text" id="language" v-model.trim="newBook.language" />
        </div>
        <div class="form-item">
          <label for="aquired"
            >Date Aquired:
            <span class="input-error" v-if="v$.aquired.$error">{{
              v$.aquired.$errors[0].$message
            }}</span></label
          >
          <input type="date" id="aquired" v-model="newBook.aquired" />
        </div>
        <div class="form-item">
          <label for="format"
            >Format:
            <span class="input-error" v-if="v$.format.$error">{{
              v$.format.$errors[0].$message
            }}</span></label
          >
          <select name="format" id="format" v-model="newBook.format">
            <option value="E-book">E-Book</option>
            <option value="Hardcover">Hardcover</option>
            <option value="Paperback">Paperback</option>
          </select>
        </div>
        <div class="form-item">
          <label for="condition"
            >Condition:
            <span class="input-error" v-if="v$.condition.$error">{{
              v$.condition.$errors[0].$message
            }}</span></label
          >
          <select name="condition" id="condition" v-model="newBook.condition">
            <option value="N/A">N/A</option>
            <option value="Poor">Poor</option>
            <option value="Good">Good</option>
            <option value="Very Good">Very Good</option>
            <option value="New">New</option>
          </select>
        </div>
        <div class="form-item">
          <label for="status" class="input-title-required"
            >Status:
            <span class="input-error" v-if="v$.status.$error">{{
              v$.status.$errors[0].$message
            }}</span></label
          >
          <select name="status" id="status" v-model="newBook.status">
            <option value="TO-READ">To-Read</option>
            <option value="READING">Reading</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div class="form-item" v-if="newBook.status === 'COMPLETED'">
          <label for="completed"
            >Date Completed:
            <span class="input-error" v-if="v$.completed.$error">{{
              v$.completed.$errors[0].$message
            }}</span></label
          >
          <input type="date" id="completed" v-model="newBook.completed" />
        </div>
        <div v-else>&nbsp;</div>
        <button type="button" class="btn btn-main" @click.prevent="closeAdd">
          CANCEL
        </button>
        <button
          class="btn btn-main btn-submit"
          v-if="!flagEdit"
          @click.prevent="addNewBook"
        >
          ADD NEW BOOK
        </button>
        <button
          class="btn btn-main btn-submit"
          v-else
          @click.prevent="editBook"
        >
          SAVE CHANGES
        </button>
      </form>
    </dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";

export default {
  setup() {
    const store = useStore();

    const newBook = reactive({
      title: "",
      author: "",
      series: "",
      seriesNumber: "",
      published: "",
      publisher: "",
      isbn: "",
      genre: "",
      language: "",
      aquired: "",
      completed: "",
      format: "",
      condition: "",
      status: "",
    });

    const isbnSearch = reactive({
      searchNo: "",
      format: "",
    });

    async function isbnSearchRequest() {
      const format = isbnSearch.format;
      const searchNo = isbnSearch.searchNo;
      try {
        const response = await fetch(
          `https://openlibrary.org/api/books?bibkeys=${format}:${searchNo}&jscmd=details&format=json`
        );

        const responseData = await response.json();
        // responseData object is empty = nothing found
        if (Object.keys(responseData).length === 0) {
          throw new Error(
            "No book could be found using the number provided. Please confirm the number you have entered is correct and try again."
          );
        }
        const responseFormat = Object.values(responseData)[0];
        newBook.author = responseFormat.details.authors[0].name;
        newBook.publisher = responseFormat.details.publishers[0];
        newBook.published = responseFormat.details.publish_date;
        newBook.title = responseFormat.details.title;

        newBook.isbn = responseFormat.bib_key;

        if (responseFormat.details.series) {
          newBook.series = responseFormat.details.series[0].split(",")[0];
          newBook.seriesNumber = parseInt(
            responseFormat.details.series[0].split(",")[1].replace("#", "")
          );
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    const flagEdit = computed(() => store.getters.getFlagEdit);
    const [editedBook] = store.state.bookList.filter(
      (book) => book.id === flagEdit.value
    );

    if (flagEdit.value !== null) {
      newBook.id = flagEdit.value;
      newBook.title = editedBook.title;
      newBook.author = editedBook.author;
      newBook.series = editedBook.series;
      newBook.seriesNumber = editedBook.seriesNumber;
      newBook.published = editedBook.published;
      newBook.publisher = editedBook.publisher;
      newBook.isbn = editedBook.isbn;
      newBook.genre = editedBook.genre;
      newBook.language = editedBook.language;
      newBook.aquired = editedBook.aquired;
      newBook.completed = editedBook.completed;
      newBook.format = editedBook.format;
      newBook.condition = editedBook.condition;
      newBook.status = editedBook.status;
    }

    const rules = computed(() => {
      return {
        title: { required, maxLengthValue: maxLength(35) },
        author: { required, maxLengthValue: maxLength(30) },
        status: { required },
        series: { maxLengthValue: maxLength(30) },
        seriesNumber: {},
        published: {},
        publisher: { maxLengthValue: maxLength(30) },
        isbn: {},
        genre: { maxLengthValue: maxLength(18) },
        language: { maxLengthValue: maxLength(18) },
        aquired: {},
        completed: {},
        format: { maxLengthValue: maxLength(18) },
        condition: {},
      };
    });
    const v$ = useVuelidate(rules, newBook);

    function addNewBook() {
      v$.value.$validate();
      try {
        if (!v$.value.$error) {
          store.dispatch("addNewBook", newBook);
          closeAdd();
        } else {
          throw new Error(
            "There was an issue with the information entered, please ensure that all fields have been completed correctly and try again."
          );
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
      store.dispatch("unflagEdit");
      store.dispatch("loadBooks");
    }

    function editBook() {
      v$.value.$validate();
      try {
        if (!v$.value.$error) {
          store.dispatch("editBook", newBook);
          closeAdd();
          store.dispatch("unflagEdit");
        } else {
          throw new Error(
            "There was an issue with the information entered, please ensure that all fields have been completed correctly and try again."
          );
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    function closeAdd() {
      store.dispatch("closeAdd");
      store.dispatch("unflagEdit");
    }

    return {
      closeAdd,
      newBook,
      addNewBook,
      v$,
      flagEdit,
      editBook,
      isbnSearch,
      isbnSearchRequest,
    };
  },
};
</script>

<style scoped>
/* Removes Arrows from number type inputs */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.dialog {
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dialog-heading {
  text-align: center;
  padding: 1rem;
  font-size: 2.6rem;
  color: #333;
}

.addBookForm {
  display: grid;
  justify-content: flex-start;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1.2rem;
  padding: 2.4rem;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 75%;
  margin-left: 5rem;
  padding: 0rem 0.5rem;
  text-align: center;
}

.search-container--inputs {
  display: flex;
  align-self: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.search-container--inputs-input {
  padding: 0.5rem;
  border: 1px solid black;
}

.form-item {
  display: flex;
  flex-direction: column;
  padding: 0rem 0.5rem;
  margin-bottom: 1rem;
}

.form-item label {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.form-item input,
select {
  border: 1px solid black;
  padding: 0.5rem;
}

.input-error {
  color: #444;
  font-weight: 600;
}

.input-title-required {
  color: red;
}

.btn-main {
  padding: 1rem;
  background-color: #444;
  color: white;
  font-weight: 700;
  margin-top: 1.2rem;
  letter-spacing: 0.1rem;
}

.btn-submit {
  background-color: #88587c;
}

.btn-small {
  margin-bottom: 0.1rem;
}

.btn-main:hover,
.btn-main:visited {
  background-color: black;
}
</style>
