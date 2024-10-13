const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

//Mongo connection and get the express app to listen on config.port
mongoose
    .connect(process.env.MONGODB_URL, {
        autoIndex: false,
    })
    .then(() =>
        console.log("Connected to MongoDB, url:", process.env.MONGODB_URL)
    );

app.listen(process.env.PORTT, () => {
    console.log(
        `Server started on port:`,
        process.env.PORTT,
        `\nstarting ${process.env.NODE_ENV} environment`
    );
});
