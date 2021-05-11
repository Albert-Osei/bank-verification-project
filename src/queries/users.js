/**
 * find user by email
 * - email
 */
const findUserByEmail = `
SELECT id, role_id,  name, password, email  FROM users WHERE email=$1
`;
/**
 * get all roles
 */
const getAllRoles = `
SELECT id, type  FROM roles
`;
/**
 * add user
 * - name
 * - email
 * - password
 * - role_id
 *
 */
const addUser = `
INSERT INTO 
  users(
    name, 
    email, 
    password, 
    role_id
  ) 
VALUES ($1,$2,$3,$4) RETURNING id, name, email, role_id`;

module.exports = {
    addUser,
    findUserByEmail,
    getAllRoles,
};
