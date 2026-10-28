# Library Books REST API Design

## Overview

This API manages a library's book collection. It supports listing books,
retrieving an individual book, creating books, updating book details,
deleting books and searching for books by author.

Base URL: `/api`

## Endpoints

### 1. List all books

- **Method:** `GET`
- **Path:** `/api/books`
- **Description:** Returns a list of all books in the library.
- **Success status:** `200 OK`
- **Example request body:** Not required.

### 2. Get one book

- **Method:** `GET`
- **Path:** `/api/books/{id}`
- **Description:** Returns the details of one book identified by its ID.
- **Success status:** `200 OK`
- **Example request body:** Not required.
- **Example path:** `/api/books/12`

### 3. Create a book

- **Method:** `POST`
- **Path:** `/api/books`
- **Description:** Creates a new book in the library.
- **Success status:** `201 Created`
- **Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publishedYear": 1958
}

