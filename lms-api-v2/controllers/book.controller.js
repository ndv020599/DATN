const express = require("express");
const router = express.Router();
const bookService = require("../services/book.services");
const checkRole = require("../_helpers/checkRole");

// routes

router.post("/", checkRole.checkAdmin, createBook);
router.put("/:id", checkRole.checkAdmin, editBook);
router.delete("/:id", checkRole.checkAdmin, deleteBook);
router.post("/search", searchBook);
router.post("/searchByCode", searchBookByCode);

module.exports = router;

function createBook(req, res, next) {
  bookService.createBook(req, res);
}

function editBook(req, res, next) {
  bookService.editBook(req, res);
}

function deleteBook(req, res, next) {
  bookService.deleteBook(req, res);
}

function searchBook(req, res, next) {
  bookService.searchBook(req, res);
}

function searchBookByCode(req, res, next) {
  bookService.searchBookByCode(req, res);
}
