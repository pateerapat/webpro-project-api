const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

const {
    getCommentsController,
    addCommentsController,
    addLikeController,
} = require("../controller/comments.controller");
const verifyToken = require("../validation/verifyToken");

router.get("/book/:id", [param("id").notEmpty()], apiValidation, getCommentsController);

router.post("/book/:id", [param("id").notEmpty(), body("comment").notEmpty()], apiValidation, verifyToken, addCommentsController);

router.post("/:id/like", [param("id").notEmpty()], apiValidation, addLikeController);

module.exports = router;
