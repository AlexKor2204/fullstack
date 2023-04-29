import dal_mysql from "../Utils/dal_mysql";

const mysql_schema ="CREATE SCHEMA IF NOT EXISTS shopping"
const mysql_user = "CREATE TABLE IF NOT EXISTS users (name VARCHAR(45) NULL, lastName VARCHAR(45) NULL, email VARCHAR(100) NOT NULL, id VARCHAR(10) NOT NULL, password VARCHAR(45) NULL, city VARCHAR(45) NULL, street VARCHAR(45) NULL, role VARCHAR(45) NULL,PRIMARY KEY (`id`, `email`));"
// const mysql_admin = "CREATE TABLE IF NOT EXISTS admin (username VARCHAR(45) NULL, password VARCHAR(45) NULL);";
const mysql_category = "CREATE TABLE IF NOT EXISTS category (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NULL, PRIMARY KEY (`id`));"
const mysql_products = "CREATE TABLE IF NOT EXISTS products (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NULL, category VARCHAR(45) NULL, price INT NULL, image VARCHAR(200) NULL, PRIMARY KEY (`id`));"
const mysql_cart = "CREATE TABLE IF NOT EXISTS cart (id INT NOT NULL AUTO_INCREMENT, costumerId VARCHAR(45) NULL, createdAt DATETIME NULL, PRIMARY KEY (`id`));"
const mysql_cartItem = "CREATE TABLE IF NOT EXISTS cartitem (id INT NOT NULL AUTO_INCREMENT, itemId INT NULL, quantity INT NULL, totalPrice INT NULL, cartId INT NULL, PRIMARY KEY (`id`));"
const mysql_purchase = "CREATE TABLE IF NOT EXISTS purchase (id INT NOT NULL AUTO_INCREMENT, costumerId VARCHAR(45) NULL, cartId INT NULL, totalPrice INT NULL, city VARCHAR(45) NULL, street VARCHAR(45) NULL, deliveryDate DATE NULL, orderedAt DATE NULL, paymentNum VARCHAR(4) NULL, PRIMARY KEY (`id`));"

const mysql_init = () =>{
    dal_mysql.execute (mysql_schema);
    dal_mysql.execute (mysql_user);
    // dal_mysql.execute (mysql_admin);
    dal_mysql.execute (mysql_category);
    dal_mysql.execute (mysql_products);
    dal_mysql.execute (mysql_cart);
    dal_mysql.execute (mysql_cartItem);
    dal_mysql.execute (mysql_purchase);

};

export default mysql_init;