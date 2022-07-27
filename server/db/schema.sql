DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS builders;
DROP TABLE IF EXISTS trades;

CREATE TABLE builders (
    builder_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_number INTEGER,
    password_hash VARCHAR(255)
);

CREATE TABLE trades (
    trade_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_number INTEGER,
    password_hash VARCHAR(255),
    trade VARCHAR(255)
);

CREATE TABLE job (
    job_id SERIAL PRIMARY KEY,
    address VARCHAR(255)
);

CREATE TABLE materials (
    material_id SERIAL PRIMARY KEY,
    material TEXT,
    job_id INTEGER REFERENCES job(job_id)
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    read BOOLEAN,
    trade_id INTEGER REFERENCES trades(trade_id),
    builder_id INTEGER REFERENCES builders(builder_id)
);