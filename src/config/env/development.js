const dotenv = require("dotenv");

dotenv.config();

const development = {
    DATABASE_URL: process.env.DEV_DATABASE_URL,
    APP_PORT: process.env.APP_PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY
};

module.exports = development;