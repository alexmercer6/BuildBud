DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS builders;
DROP TABLE IF EXISTS trades;

CREATE TABLE builders (
    builder_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255)
);

CREATE TABLE trades (
    trade_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255)
);

CREATE TABLE job (
    job_id SERIAL PRIMARY KEY,
    address VARCHAR(255)
);

CREATE TABLE materials (
    material_id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES job(job_id)
);