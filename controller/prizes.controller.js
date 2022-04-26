const { query } = require("../core/connect");

module.exports = {
    getAllPrizesController: async (req, res, next) => { 
        try {
            const sql = "SELECT * FROM `prizes` ORDER BY `name` LIMIT 300";
            const response = await query(sql);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    quantityController: async (req, res, next) => {
        try {
            const sql = "UPDATE `prizes` SET `quantity` = `quantity`-? WHERE `id` = ?";
            const values = [req.body.quantity, req.body.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};