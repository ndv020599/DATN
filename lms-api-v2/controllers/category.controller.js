const express = require('express');
const router = express.Router();
const categoryService = require('../services/category.services');
const checkRole = require('../_helpers/checkRole')

// routes
router.post('/', checkRole.checkAdmin, createCategory);
router.put('/:id', checkRole.checkAdmin, editCategory)
router.delete('/:id', checkRole.checkAdmin, deleteCategory)
router.post('/search', searchCategory)


module.exports = router;

function createCategory(req, res, next) {
    categoryService.createCategory(req, res)
}

function editCategory(req, res, next) {
    categoryService.editCategory(req, res)
}

function deleteCategory(req, res, next) {
    categoryService.deleteCategory(req, res)
}

function searchCategory(req, res, next) {
    categoryService.searchCategory(req, res)
}