<template>
  <footer class="footer">
    <a href="#top" class="btn-auth">TO THE TOP</a>
    <h4 class="open-direct">
      This site utilises the Open Library Books API, for more information visit
      <span class="open-direct--link">
        <a href="https://openlibrary.org/dev/docs/api/books">their website</a>
      </span>
    </h4>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  border-top: 2px solid black;
  margin-top: 1.2rem;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: #587c88;
  display: flex;
  justify-content: space-between;
}

.btn-auth {
  background: #555;
  color: #fff;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.1rem;
  margin-left: 3.4rem;
}

.btn-auth:hover {
  background-color: black;
}

.open-direct {
  margin-right: 1.2rem;
}
.open-direct--link {
}
</style>
