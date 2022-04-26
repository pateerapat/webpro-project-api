const { query } = require("../core/connect");

const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

module.exports = {
    registerController: async (req, res, next) => {
        try {
            const sqlDataCheck = "SELECT `username`, `email` FROM `users` WHERE `username` = ? OR `email` = ?";
            const valuesDataCheck = [req.body.username, req.body.email];
            const responseDataCheck = await query(sqlDataCheck, valuesDataCheck);
            
            if (responseDataCheck.payload.data.length != 0) {
                responseDataCheck.success = false;
                responseDataCheck.payload.data = "Caught duplicate of username or email.";
                res.status(200).json(responseDataCheck);
                res.end();
                return;
            }

            const passwordEncrypt = await bcrypt.hash(req.body.password, 10);

            const sql = "INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role`) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [req.body.username, passwordEncrypt, req.body.first_name, req.body.last_name, req.body.email, req.body.role];
            const response = await query(sql, values);

            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    loginController: async (req, res, next) => {
        try {
            const sqlDataCheck = "SELECT * FROM `users` WHERE `username` = ?";
            const valuesDataCheck = [req.body.username];
            const responseDataCheck = await query(sqlDataCheck, valuesDataCheck);
                
            if (responseDataCheck.payload.data.length == 0) {
                responseDataCheck.success = false;
                responseDataCheck.payload.data = "Username doesn't exist.";
                res.status(200).json(responseDataCheck);
                res.end();
                return;
            };

            const match = await bcrypt.compare(req.body.password, responseDataCheck.payload.data[0].password);

            if (!match) {
                responseDataCheck.success = false;
                responseDataCheck.payload.data = "Incorrect password.";
                res.status(200).json(responseDataCheck);
                res.end();
                return;
            }
            
            const jsonToken = sign({ result: responseDataCheck.payload.data[0] }, process.env.SECRET, {
                expiresIn: "1d",
            });

            const response = {
                success: true,
                payload: {
                    message: "Login successfully",
                    token: jsonToken,
                },
            };

            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        }; 
    },
    incrementController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );
            let updatedPoints;

            const sqlDataCheck = "SELECT `point` FROM `users` WHERE `username` = ?";
            const valuesDataCheck = [userData.username];
            const responseDataCheck = await query(sqlDataCheck, valuesDataCheck);

            if (req.body.method == "+") {
                updatedPoints = responseDataCheck.payload.data[0].point + req.body.point;
            } else if (req.body.method == "-") {
                updatedPoints = responseDataCheck.payload.data[0].point - req.body.point;
                if (updatedPoints < 0) {
                    const response = {
                        success: false,
                        payload: {
                            message: "Not enough point.",
                        },
                    };
                    res.status(200).json(response);
                    res.end();
                    return;
                };
            };

            const sql = "UPDATE `users` SET `point` = ? WHERE `username` = ?";
            const values = [updatedPoints, userData.username];
            const response = await query(sql, values);
            
            res.status(200).json(response);
            res.end();

        } catch (err) {
            next(err);
        };
    },
    getDataController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const response = {
                success: true,
                payload: {
                    data: userData,
                },
            };

            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    changePasswordController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const passwordEncrypt = await bcrypt.hash(req.body.password, 10);

            const sql = "UPDATE `users` SET `password` = ? WHERE `username` = ?";
            const values = [passwordEncrypt, userData.username];
            const response = await query(sql, values);

            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};