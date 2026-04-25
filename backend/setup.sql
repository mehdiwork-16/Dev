-- Run once to initialise the database
CREATE DATABASE IF NOT EXISTS developme CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE developme;

CREATE TABLE IF NOT EXISTS contacts (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL,
  phone      VARCHAR(30),
  service    VARCHAR(120),
  budget     VARCHAR(80),
  message    TEXT          NOT NULL,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
