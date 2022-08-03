DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS assigned_jobs;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_number INTEGER,
    password_hash VARCHAR(255),
    role VARCHAR(255),
    job VARCHAR(255)
);
-- CREATE TABLE builders (
--     builder_id SERIAL PRIMARY KEY,
--     name VARCHAR(255),
--     email VARCHAR(255),
--     phone_number INTEGER,
--     password_hash VARCHAR(255)
-- );

-- CREATE TABLE trades (
--     trade_id SERIAL PRIMARY KEY,
--     name VARCHAR(255),
--     email VARCHAR(255),
--     phone_number INTEGER,
--     password_hash VARCHAR(255),
--     trade VARCHAR(255)
-- );

CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE assigned_jobs (
    assigned_job_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    trade VARCHAR(255),
    trade_id INTEGER,
    job_id INTEGER REFERENCES jobs(job_id),
    user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE materials (
    material_id SERIAL PRIMARY KEY,
    material TEXT,
    qty VARCHAR(255),
    trade VARCHAR(255),
    job_id INTEGER REFERENCES jobs(job_id),
    user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    read BOOLEAN,
    user_id INTEGER REFERENCES users(user_id)
);


CREATE TABLE connections (
    connections_id SERIAL PRIMARY KEY,
    connected_user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number INTEGER NOT NULL,
    role VARCHAR(255) NOT NULL,
    job VARCHAR(255),
    user_id INTEGER REFERENCES users(user_id)
);