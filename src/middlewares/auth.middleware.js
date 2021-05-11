const jwt = require("jsonwebtoken");
const config = require("../config/env/index");
const { findUser } = require("../services/user.service");

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];
    try {
        if (!token) {
            return res.status(400).json({
                status: "error",
                code: 400,
                message: "Please supply token",
                data: null,
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        const { email } = decoded;
        const user = await findUser(email);
        if (user.length === 0) {
            throw {
                status: "error",
                code: 400,
                message: "User does not exist",
                data: null,
            };
        }
        req.decoded = decoded;
        return next();
    } catch (error) {
        return next(error);
    }
};

const verifyAdmin = (req, res, next) => {
    const type = req.decoded;
    console.log(type);
    console.log(typeof type);
    const allowedRoles = ["super_admin", "admin"];
    console.log(allowedRoles);
    try {
        if (!allowedRoles.includes(type)) {
            throw {
                code: 401,
                message: "Only admins can access this resource",
                data: null,
                status: "error",
            };
        }
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.decoded = decoded;

        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    verifyToken,
    verifyAdmin,
};
