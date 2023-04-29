import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
// import model from...
import Purchase from "../Models/purchaseModel";


//get all orders
const getAllOrders = async (): Promise<Purchase[]> => {
    // command line for the DB
    const sql = "SELECT * FROM purchase";
    // a promise function that connects us to the database with the command line
    const products = await dal.execute(sql);
    return products;
}
// get order by id
const getOrderById = async(id:number):Promise<Purchase> =>{
    const sql = `SELECT * FROM purchase WHERE id =${id}`;
    const order = await dal.execute(sql);
    return order;
} 

// get order by user id
const getOrderByUserId = async(id:string):Promise<Purchase> =>{
    const sql = `SELECT * FROM purchase WHERE costumerId ='${id}'`;
    const order = await dal.execute(sql);
    return order;
} 

//add new order
const addOrder = async(newOrder:Purchase):Promise<Purchase> =>{
    const sql = `
    INSERT INTO purchase (costumerId, cartId, totalPrice, city, street, deliveryDate, orderedAt, paymentNum) 
    VALUES ('${newOrder.costumerId}', ${newOrder.cartId}, ${newOrder.totalPrice}, '${newOrder.city}', '${newOrder.street}', '${newOrder.deliveryDate}', '${newOrder.orderedAt}', '${newOrder.paymentNum}');
    `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(sql);
    newOrder.id = result.insertId;
    return newOrder;
}

//delete order
const deleteOrder = async(id:number):Promise<void> =>{
    const sql = `DELETE FROM purchase WHERE id =${id}`;
    return await dal.execute(sql);
}

export default{
    getAllOrders,
    addOrder,
    deleteOrder,
    getOrderById,
    getOrderByUserId
}