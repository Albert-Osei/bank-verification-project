/* Replace with your SQL commands */

CREATE TABLE "accounts" (
  "id" SERIAL PRIMARY KEY,
  "account_name" varchar(255),
  "bank" varchar(255),
  "bank_code" varchar(255),
  "balance" varchar(255),
  "type_of_account" varchar(255),
  "published_at" timestamptz,
  "created_at" timestamptz DEFAULT NOW(),
  "updated_at" timestamptz DEFAULT NOW()
);