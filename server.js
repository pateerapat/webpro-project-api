const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "THIS IS AN API",
    });
});

const routeBooks = require("./routes/books.route");

app.use("/books", routeBooks);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message,
        }
    });
});

app.listen(PORT, () => {
    console.log("Running on PORT:" + PORT);
});
