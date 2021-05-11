const dotenv = require("dotenv");

dotenv.config();

const test = {
    DATABASE_URL: process.env.TEST_DATABASE_URL,
    APP_PORT: process.env.APP_PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY
};

module.exports = test;