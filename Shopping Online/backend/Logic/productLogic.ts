import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
// import model from...
import Product from "../Models/productModel";
import Category from "../Models/categoryModel";


//get all products
const getAllProducts = async (): Promise<Product[]> => {
    // command line for the DB
    const sql = `
    SELECT products.* , category.name AS category 
    FROM products JOIN category 
    ON products.category = category.id
    `;
    // a promise function that connects us to the database with the command line
    const products = await dal.execute(sql);
    return products;
}

//get product by id
const getProductById = async(id:number):Promise<Product> =>{
    const sql = `
    SELECT products.* , category.name AS category 
    FROM products JOIN category 
    ON products.category = category.id
    WHERE products.id =${id}
    `;
    const product = await dal.execute(sql);
    console.log(product);
    return product;
}

//get products by name
const getProductsByName = async(name:string):Promise<Product[]> =>{
    const sql = `SELECT * FROM products WHERE name ='${name}'`;
    const products = await dal.execute(sql);
    console.log(products);
    return products;
}

//get products by category
const getProductsByCategory = async(id:string):Promise<Product[]> =>{
    const sql = `SELECT * FROM products WHERE category =${id}`;
    const products = await dal.execute(sql);
    console.log(products);
    return products;
}
//add new product
const addProduct = async(newProduct:Product):Promise<Product> =>{
    const sql = `
    INSERT INTO products (name, category, price, image) 
    VALUES ('${newProduct.name}', '${newProduct.category}', '${newProduct.price}', '${newProduct.image}');
    `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(sql);
    newProduct.id = result.insertId;
    return newProduct;
}

//update product
const updateProduct = async (product: Product): Promise<Product> => {
    const sql = `
    UPDATE products 
    SET name = '${product.name}',
    category = '${product.category}',
    price = '${product.price}',
    image = '${product.image}' 
    WHERE id = ${product.id}
    `;
    await dal.execute(sql);
    return product;
}

//delete product
const deleteProduct = async(id:number):Promise<void> =>{
    const sql = `DELETE FROM products WHERE id =${id}`;
    return await dal.execute(sql);
}

// //add follower
// const addFollower = async(newFavorite:Favorites):Promise<Favorites> =>{
//     const sql =`SELECT * FROM favorites WHERE userId = '${newFavorite.userId}' AND vacationId ='${newFavorite.vacationId}'`;
//     const favorite = await dal.execute(sql);
//     if (favorite.length>0){
//         console.log("This vacation is already in favorites") 
        
//     } else{  
//     const newSql =`UPDATE vacations SET followers = followers + 1 WHERE id=${newFavorite.vacationId}`;
//     await dal.execute(newSql);
//     return newFavorite;
// }
// }
// //remove follower
// const removeFollower = async(id:any):Promise<Vacation> =>{
//     const sql =`UPDATE vacations SET followers = followers - 1 WHERE id=${id}`;
//     await dal.execute(sql);
//     console.log(id);
//     return id;
// }
export default{
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductsByCategory,
    getProductsByName
    // addFollower,
    // removeFollower
}