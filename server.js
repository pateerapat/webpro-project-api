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
const routeUsers = require("./routes/users.route");
// const routeCarts = require("./routes/carts.route");
const routeComments = require("./routes/comments.route");
// const routeOrderItems = require("./routes/order-items.route");
// const routeOrders = require("./routes/orders.route");
const routePrizeHistory = require("./routes/prize-history.route");
const routePrizes = require("./routes/prizes.route");

app.use("/books", routeBooks);
app.use("/users", routeUsers);
// app.use("/carts", routeCarts);
app.use("/comments", routeComments);
// app.use("/order-items", routeOrderItems);
// app.use("/orders", routeOrders);
app.use("/prize-history", routePrizeHistory);
app.use("/prizes", routePrizes);

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
