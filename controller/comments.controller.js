const { query } = require("../core/connect");
const jwt = require("jsonwebtoken");

module.exports = {
    getCommentsController: async (req, res, next) => { 
        try {
            const sql = "SELECT `c`.`id`, `c`.`book_id`, `c`.`comment`, `c`.`like`, `c`.`comment_date`, `u`.`username` FROM `comments` AS `c` JOIN `users` AS `u` ON `c`.`comment_by` = `u`.`id` WHERE `book_id` = ?";
            const values = [req.params.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    addCommentsController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const sql = "INSERT INTO `comments` (`book_id`, `comment`, `comment_by`) VALUES (?, ?, ?)";
            const values = [req.params.id, req.body.comment, userData.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    addLikeController: async (req, res, next) => { 
        try {
            const sql = "UPDATE `comments` SET `like` = `like`+1 WHERE id = ?";
            const values = [req.params.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};