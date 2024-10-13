const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const helmet = require("helmet");
const path = require("path");
const routes = require("./routes");

const app = express();

// set security HTTP headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// The compression middleware automatically compresses the response body for all requests. This reduces the size of the response, leading to faster load times and reduced bandwidth usage.
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Middleware to serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", routes);

module.exports = app;
