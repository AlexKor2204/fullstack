import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
import Category from "../Models/categoryModel";
// import model from...

//get all categories
const getAllCategories = async (): Promise<Category[]> => {
    // command line for the DB
    const sql = "SELECT * FROM category";
    // a promise function that connects us to the database with the command line
    const categories = await dal.execute(sql);
    //console.log(categories);
    return categories;
}

export default{
    getAllCategories
}