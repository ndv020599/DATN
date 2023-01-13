const express = require('express');
const router = express.Router();
const requestService = require('../services/request.services.js');
const checkRole = require('../_helpers/checkRole')

// routes

router.post('/', createRequest)
router.post('/search', searchRequest)
router.post('/searchByAll', searchRequestOfAllBook)
router.post('/searchByBook', searchByBook)
router.post('/status', updateRequest)
router.delete('/:id', deleteRequest)

module.exports = router;

function createRequest(req, res, next) {
    requestService.createRequest(req, res)
}

function searchRequest(req, res, next) {
    requestService.searchRequest(req, res)
}

function updateRequest(req, res, next) {
    requestService.updateRequest(req, res)
}
function searchRequestOfAllBook(req, res, next) {
    requestService.searchRequestOfAllBook(req, res)
}

function searchByBook(req, res, next) {
    requestService.searchByBook(req, res)
}

function deleteRequest(req, res, next) {
    requestService.deleteRequest(req, res)
}