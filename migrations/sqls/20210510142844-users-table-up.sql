/* Replace with your SQL commands */
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "email" varchar(100) UNIQUE,
  "password" varchar(60),
  "role_id" INT,
  "created_at" timestamptz DEFAULT NOW(),
  "updated_at" timestamptz DEFAULT NOW()
);