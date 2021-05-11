const UserService = require("../services/user.service");

const loginUser = async (req, res, next) => {
    try {
        const response = await UserService.loginUser(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const response = await UserService.createUser(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};



module.exports = {
    loginUser,
    createUser,
}