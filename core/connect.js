const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b9e27f91d9dd45",
  password: "7b0b2118",
  database: "heroku_0211fb2ce26ce05",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = async (sql, values) => {
    const transaction = await pool.getConnection();
    await transaction.beginTransaction();

    let response = {
        success: true,
        payload: {
            data: null,
        }
    }

    try {
        const [ rows, fields ] = await transaction.query(sql, values);
        transaction.commit();
        response.payload.data = rows;
    } catch (err) {
        await transaction.rollback();
        response.success = false;
        response.payload.data = "Error has occurred on a transaction.";
        return response;
    } finally {
        transaction.release();
        return response;
    }
};

module.exports = {
    query,
};