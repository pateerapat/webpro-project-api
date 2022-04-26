const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

const {
    getAllBooksController,
    getBookController,
    quantityController,
} = require("../controller/books.controller");

router.get("/get/all", apiValidation, getAllBooksController);

router.get("/get/book/:id", [param("id").notEmpty()], apiValidation, getBookController);

router.post("/quantity", [body("quantity").notEmpty(), body("id").notEmpty()], apiValidation, quantityController);

module.exports = router;
