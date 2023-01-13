const express = require("express");
const router = express.Router();
const userService = require("../services/users.services");
const checkRole = require("../_helpers/checkRole");

// routes
router.post("/login", login);
router.post("/signup", checkRole.checkAdmin, signup);
router.put("/changepass", changePass);
router.get("/profile", getProfile);
router.put("/profile/:id", changeProfile);
router.delete("/profile/:id", checkRole.checkAdmin, deleteProfile);
router.post("/search", checkRole.checkAdmin, searchProfile);

module.exports = router;

function login(req, res, next) {
  userService.login(req, res);
}

function signup(req, res, next) {
  userService.signup(req, res);
}

function changePass(req, res, next) {
  userService.changePass(req, res);
}

function getProfile(req, res, next) {
  userService.getProfile(req, res);
}

function changeProfile(req, res, next) {
  userService.changeProfile(req, res);
}

function deleteProfile(req, res, next) {
  userService.deleteProfile(req, res);
}

function searchProfile(req, res, next) {
  userService.searchProfile(req, res);
}
