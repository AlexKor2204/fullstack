import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
// import model from..
import Item from "../Models/cartItemModel";


//get all items
const getAllItems = async (): Promise<Item[]> => {
    // command line for the DB
    // const sql = "SELECT * FROM cartitem";
    const sql = `
    SELECT cartitem.* , products.name AS itemId 
    FROM cartitem JOIN products 
    ON cartitem.itemId = products.id
    `;
    // a promise function that connects us to the database with the command line
    const items = await dal.execute(sql);
    return items;
}
// get items by cart id
const getItemByCartId = async(id:number):Promise<Item> =>{
    const sql = `
    SELECT cartitem.* , products.name AS itemId 
    FROM cartitem JOIN products 
    ON cartitem.itemId = products.id
    WHERE cartId =${id}`;
    const items = await dal.execute(sql);
    return items;
} 

//add new item to the cart
const addItem = async(newItem:Item):Promise<Item> =>{
    const sql = `
    INSERT INTO cartitem (itemId, quantity, totalPrice, cartId) 
    VALUES ('${newItem.itemId}', ${newItem.quantity}, ${newItem.totalPrice}, ${newItem.cartId});
    `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(sql);
    newItem.id = result.insertId;
    return newItem;
}
//delete item from cart
const deleteItem = async(itemId:string, cartId:number):Promise<void> =>{
    const sql = `DELETE FROM cartitem WHERE itemId ='${itemId}' AND cartId = ${cartId} `;
    return await dal.execute(sql);
}
//delete items by cart id
const deleteItemByCartId = async(cartId:number):Promise<void> =>{
    const sql = `DELETE FROM cartitem WHERE cartId = ${cartId} `;
    return await dal.execute(sql);
}

export default{
    getAllItems,
    getItemByCartId,
    addItem,
    deleteItem,
    deleteItemByCartId
}