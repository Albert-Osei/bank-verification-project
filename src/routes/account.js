const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/account.controllers");
const AccountValidator = require("../validators/account");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middleware");
const { getBanks, validateCustomer } = require("../controllers/account.controllers");
const { validateAccountInfo } = require('../validators/customer.validator')


router.get("/", verifyAdmin, verifyToken, AccountController.getAccounts);

router.post(
    "/",
    verifyToken,
    AccountValidator.validateNewAccount,
    AccountController.addAccount
);

router.put("/:id", verifyToken, AccountController.updateAccount);

router.delete("/:id", verifyToken, AccountController.deleteAccount);

router.get('/get-banks', verifyToken, getBanks);

router.post('/validate-customer', verifyToken, validateAccountInfo, validateCustomer)

module.exports = router;
