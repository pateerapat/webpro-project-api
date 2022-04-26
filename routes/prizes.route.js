const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

const {
    getAllPrizesController,
    quantityController,
} = require("../controller/prizes.controller");

router.get("/get/all", apiValidation, getAllPrizesController);

router.post("/quantity", [body("quantity").notEmpty(), body("id").notEmpty()], apiValidation, quantityController);

module.exports = router;
