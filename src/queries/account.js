const getAllAccounts = `
SELECT * FROM accounts
`;

const addAccountQuery = `
INSERT INTO 
  accounts(
    account_name, 
    bank, 
    bank_code,
    balance,
    type_of_account,
    user_id
  ) 
VALUES ($1,$2,$3,$4,$5,$6) RETURNING account_name, bank, bank_code, balance, type_of_account`;

const findAccountByAccountName = `
SELECT account_name, bank, bank_code, balance, type_of_account, published_at  FROM accounts WHERE account_name=$1
`;

// const findAccountBankAccountNumber = `
// SELECT account_name, bank, bank_code, balance, type_of_account  FROM accounts WHERE account_name=$1
// `;

const updateAccountQuery = `
UPDATE accounts SET account_name=$1, bank=$2, bank_code=$3, balance=$4, type_of_account=$5, created_at=NOW(), updated_at=NOW() WHERE id=$6 
RETURNING id, account_name, bank, bank_code, balance, type_of_account,published_at, created_at, updated_at`;

const deleteAccountQuery = `
DELETE FROM accounts WHERE id=$1`;

module.exports = {
    getAllAccounts,
    addAccountQuery,
    updateAccountQuery,
    deleteAccountQuery,
    findAccountByAccountName,
};
