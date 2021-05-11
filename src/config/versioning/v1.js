const express = require("express");
const api = express.Router();
const accounts = require("../../routes/account");
const users = require("../../routes/user");

api.get("/", (req, res) =>
    res.status(200).json({
        status: "success",
        message: "Welcome to your bank_account verification system",
    })
);

api.use("/accounts", accounts);
api.use("/users", users);

module.exports = api;