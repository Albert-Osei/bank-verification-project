const Joi = require("joi");

const { baseValidatorForBody } = require("./index");

const validateAccountInfo = (req, res, next) => {
    const schema = Joi.object({
        account_number: Joi.string().required(),
        bank_code: Joi.number().required(),
    });
    baseValidatorForBody(schema, req, res, next);
};

module.exports = {
    validateAccountInfo,
};