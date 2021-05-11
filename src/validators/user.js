const Joi = require("joi");

const { baseValidatorForBody, baseValidatorForParams } = require("./index");

const validateUserSignup = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
    });
    baseValidatorForBody(schema, req, res, next);
};

const validateUserLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    baseValidatorForBody(schema, req, res, next);
};

const validateId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().required(),
    });
    baseValidatorForParams(schema, req, res, next);
};

module.exports = {
    validateId,
    validateUserLogin,
    validateUserSignup,
};
