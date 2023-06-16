# Book Collection Manager

CRUD application which is designed to simplify the organisation of a user's book collection. Utilises Open Library API for adding books using their ISBNs, OCLC Numbers, LCCNs or OLIDs (https://openlibrary.org/dev/docs/api/books). A user can sign up, log in to their account and can easily add, view, update, and remove books in their collection. 

When logged in a user can add books to their list, either manually or via searching using the books identifier (ISBN, OCLC, LCCN or OLID). If using the identifier the information available for the book will be added automatically via the Open Library API. The user can enter the date they acquired the book, the status of the book (unread, reading or completed), and if completed can specify when they finished reading it. The user can filter their collection in a variety of ways allowing them to organise and sort through their book collection with ease.

YouTube demonstration providing an overview of the features: https://www.youtube.com/watch?v=xIU1O3Cqcw4

Made using Vue (including Vuelidate and Vue-Router), JavaScript, HTML and CSS.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
