const { query } = require('../core/connect');

module.exports = {
    getAllBookController: async (req, res, next) => { 
        try {
            const sql = "SELECT * FROM `books` ORDER BY `title` LIMIT 300";
            const response = await query(sql);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    getBookController: async (req, res, next) => { 
        try {
            const sql = "SELECT * FROM `books` WHERE `id` = ?";
            const values = [req.params.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};