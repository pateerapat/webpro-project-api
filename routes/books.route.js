const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

const {
    getAllBookController,
    getBookController,
} = require("../controller/books.controller");

router.get("/get", [query("page").notEmpty()], apiValidation, getAllBookController);

router.get("/get/book/:id", [param("id").notEmpty()], apiValidation, getBookController);

module.exports = router;
