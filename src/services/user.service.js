const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/env/index");
const { runQuery } = require("../config/database.config");
const { findUserByEmail, addUser, getAllRoles } = require("../queries/users");


const findUser = async (email) => {
    const user = await runQuery(findUserByEmail, [email]);
    return user;
};

const loginUser = async (body) => {
    const { email, password } = body;
    console.log(email);
    console.log(password);
    const user = await findUser(email);
    if (user.length === 0) {
        throw {
            status: "error",
            message: "Wrong email and password combination",
            code: 404,
            data: null,
        };
    }

    const { password: dbPassword, role_id, name, id } = user[0];
    console.log(dbPassword);
    const userPassword = bcrypt.compareSync(password, dbPassword); // true
    if (!userPassword) {
        throw {
            status: "error",
            message: "Wrong password and email combination",
            code: 400,
            data: null,
        };
    }

    const options = {
        expiresIn: "1d",
    };

    const roles = await runQuery(getAllRoles);
    const userRole = roles.find((element) => element.id === role_id);
    const token = jwt.sign(
        {
            id,
            email,
            role_id,
            name,
            type: userRole.type,
        },
        config.JWT_SECRET_KEY,
        options
    );
    return {
        status: "success",
        message: "Authentication successful",
        code: 200,
        data: {
            user: {
                id,
                email,
                name,
                role_id,
                type: userRole.type,
            },
            token,
        },
    };
};

const createUser = async (body) => {
    const { name, email, password } = body;

    const user = await findUser(email);
    if (user.length > 0) {
        throw {
            code: 409,
            message: "User already exists",
            data: null,
            status: "error",
        };
    }

    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);

    const roles = await runQuery(getAllRoles);
    const userRole = roles.find((element) => element.type === "user");
    const response = await runQuery(addUser, [name, email, hash, userRole.id]);

    return {
        code: 201,
        status: "success",
        message: "New user added successfully",
        data: response[0],
    };
};



module.exports = {
    loginUser,
    createUser,
    findUser,
};