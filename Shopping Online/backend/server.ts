// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import userController from "./Routes/userController";
import productController from "./Routes/productController";
import mysql_init from "./sql/init";
import config from "./Utils/config";
import categoryController from "./Routes/categoryController";
import cartController from "./Routes/cartController";
import itemController from "./Routes/itemController";
import purchaseController from "./Routes/purchaseController";

const server = express();
mysql_init();
const currentPort = config.port;
//cors option
var corsOptions = {
    "origin": "*", //expose to all server around the world
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //expose which methods are allowed
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "exposedHeaders" : "Authorization" //expose the Authorization header
}
server.use(cors(corsOptions));
server.use(express.json());
server.use("/product", productController)
server.use("/user", userController)
server.use("/category", categoryController)
server.use("/cart", cartController)
server.use("/item", itemController)
server.use("/purchase", purchaseController)
server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )