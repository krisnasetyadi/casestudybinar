CREATE DATABASE binar;

CREATE TABLE binar_users(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR (250) NOT NULL,
    user_email VARCHAR(250) NOT NULL,
    user_password VARCHAR (250) NOT NULL
);
-- CREATE EXTENSION UUID-OSSP
-- create extension if not exists "uuid-ossp";

-- fake user
INSERT INTO binar_users (user_name,user_email,user_password) VALUES ('john','john@gmail.com','john123');

-- TODO
CREATE TABLE todos(todo_id SERIAL PRIMARY KEY, description VARCHAR(250));

-- Fake value
