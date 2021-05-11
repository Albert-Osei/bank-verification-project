const AccountService = require("../services/account.service");

const getAccounts = async (req, res, next) => {
    try {
        const response = await AccountService.getAccounts();
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

const addAccount = async (req, res, next) => {
    const { id } = req.decoded;
    try {
        const response = await AccountService.addAccount(req.body, id);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

const updateAccount = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await AccountService.updateAccount(req.body, id);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

const deleteAccount = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await AccountService.deleteAccount(id);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};


const getBanks = async (req, res, next) => {
    try {
        const response = await AccountService.getBanks(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

const validateCustomer = async (req, res, next) => {
    try {
        const response = await AccountService.validateCustomer(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    getBanks,
    validateCustomer
};
