// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import config from "./Utils/config";
import mysql_init from "./sql/init";
import teamController from "./Routes/newController";


const server = express();
mysql_init();
const currentPort = config.port;
server.use(cors());
server.use(express.json());
server.use("/team", teamController);
server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )