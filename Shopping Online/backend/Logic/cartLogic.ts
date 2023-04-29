import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
// import model from..
import Cart from "../Models/cartModel";

//get all carts 
const getAllCarts = async (): Promise<Cart[]> => {
    // command line for the DB
    const sql = "SELECT * FROM cart";
    // a promise function that connects us to the database with the command line
    const carts = await dal.execute(sql);
    return carts;
}
// get cart by users id
const getCartByUserId = async(id:string):Promise<Cart> =>{
    const sql = `SELECT * FROM cart WHERE costumerId =${id}`;
    const cart = await dal.execute(sql);
    return cart;
} 
// get cart by id
const getCartById = async(id:number):Promise<Cart> =>{
    const sql = `SELECT * FROM cart WHERE id =${id}`;
    const cart = await dal.execute(sql);
    return cart;
} 
//create new cart
const addCart = async(newCart:Cart):Promise<Cart> =>{
    const sql = `
    INSERT INTO cart (costumerId, createdAt) 
    VALUES ('${newCart.costumerId}', '${newCart.createdAt}');
    `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(sql);
    newCart.id = result.insertId;
    return newCart;
}

//delete cart
const deleteCart = async(id:number):Promise<void> =>{
    const sql = `DELETE FROM cart WHERE id =${id}`;
    return await dal.execute(sql);
}

export default{
addCart,
deleteCart,
getAllCarts,
getCartById,
getCartByUserId
}