CREATE DATABASE REACT;
USE REACT;
CREATE TABLE personagens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personagem VARCHAR(100),
  serie VARCHAR(100),
  ano INT,
  genero VARCHAR(50)
);
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;
SELECT * FROM personagens;