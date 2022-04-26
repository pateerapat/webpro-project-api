const express = require("express");
const router = express.Router();
const verifyToken = require("../validation/verifyToken");
const { body, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

const {
    registerController,
    loginController,
    incrementController,
    getDataController,
    changePasswordController,
} = require("../controller/users.controller");

router.post("/register", [body("password").notEmpty(), body("username").notEmpty(), body("first_name").notEmpty(), 
body("last_name").notEmpty(), body("email").notEmpty(), body("role").notEmpty()], apiValidation, registerController);

router.post("/login", [body("username").notEmpty(), body("password").notEmpty()], apiValidation, loginController);

router.post("/point", [body("method").notEmpty(), body("point").notEmpty()], apiValidation, verifyToken, incrementController);

router.post("/change/password", [body("password").notEmpty()], apiValidation, verifyToken, changePasswordController);

router.get("/get/data", apiValidation, verifyToken, getDataController);

module.exports = router;