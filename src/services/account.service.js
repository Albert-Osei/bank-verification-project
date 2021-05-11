const { runQuery } = require("../config/database.config");
const {
    findAccountByAccountName,
    addAccountQuery,
    updateAccountQuery,
    deleteAccountQuery,
    getAllAccounts,
} = require("../queries/account");
const { makeGetRequest } = require('../util/axios.util');




const getAccounts = async () => {
    const accounts = await runQuery(getAllAccounts);
    return {
        status: "success",
        message: "Account fetched succesfully",
        code: 200,
        data: accounts,
    };
};

const addAccount = async (body, id) => {
    const { account_name, bank, bank_code, balance, type_of_account } = body;

    const account = await runQuery(findAccountByAccountName, [account_name]);
    if (account.length > 0) {
        throw {
            status: "error",
            message: "Account already exist",
            code: 409,
            data: null,
        };
    }
    const response = await runQuery(addAccountQuery, [
        account_name,
        bank,
        bank_code,
        balance,
        type_of_account,
        id,
    ]);

    return {
        status: "success",
        message: "Account created successfully",
        code: 201,
        data: response[0],
    };
};

const updateAccount = async (body, id) => {
    const { account_name, bank, bank_code, balance, type_of_account } = body;

    const account = await runQuery(findAccountByAccountName, [account_name]);

    if (account.length === 0) {
        throw {
            status: "error",
            message: " Account not found",
            code: 400,
            data: null,
        };
    }
    const response = await runQuery(updateAccountQuery, [
        account_name,
        bank,
        bank_code,
        balance,
        type_of_account,
        id,
    ]);
    return {
        status: "success",
        message: "Account updated successfully",
        code: 200,
        data: response[0],
    };
};

const deleteAccount = async (id) => {
    const account = await runQuery(findAccountByAccountName, [account_name]);
    if (account.length === 0) {
        accounts.splice(account, 1);
        throw {
            status: "error",
            message: "Account does not exist",
            code: 400,
            data: null,
        };
    }
    const response = await runQuery(deleteAccountQuery, [id]);

    return {
        status: "success",
        message: "Account deleted successfully",
        code: 200,
        data: response[0],
    };
};


//Bank verification and customer validation
const getBanks = async () => {
    const url = process.env.GET_BANKS_URL;
    const response = await makeGetRequest(url);
    return {
        code: 200,
        status: 'success',
        data: response.data
    }
}

const validateCustomer = async (body) => {
    const { account_number, bank_code } = body;
    // const url = process.env.VALID_CUSTOMER_URL;
    const url = `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`;
    const response = await makeGetRequest(url);
    return {
        code: 200,
        status: 'success',
        data: response.data
    }
}



module.exports = {
    getAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    getBanks,
    validateCustomer
};
