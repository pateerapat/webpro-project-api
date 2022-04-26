const { query } = require("../core/connect");

const jwt = require("jsonwebtoken");

module.exports = {
    getHistoryController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const sql = "SELECT `redeem_date`, `p`.`name`, `p`.`price`, `p`.`detail` FROM `prize_history` AS `ph` JOIN `users` AS `u` ON `ph`.user_id = `u`.id JOIN `prizes` AS `p` ON `ph`.prize_id = `p`.id WHERE `u`.id = ?";
            const values = [userData.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    addHistoryController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const sql = "INSERT INTO `prize_history` (`prize_id`, `user_id`) VALUES (?, ?)";
            const values = [req.body.prize_id, userData.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};