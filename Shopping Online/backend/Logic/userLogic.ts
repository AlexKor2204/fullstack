import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
// import model from...
import User from "../Models/userModel";
import { checkJWT, getJWT, getUserNameFromJWT } from "../Utils/JWT";

// user login
const loginUser = async (email:string, password:string): Promise<User> => {
    // command line for the DB
    const sql = `SELECT * FROM users WHERE email ='${email}' AND password='${password}'`;
    // a promise function that connects us to the database with the command line
    const user = await dal.execute(sql);
    if (user.length>0){
        console.log("Welcome") 
    return user;
    } else{
        console.log("Who are you?");
        return user;
    }
}


//get all users 
const allUsers = async (): Promise<User[]> => {
    // command line for the DB
    const sql = "SELECT * FROM users";
    // a promise function that connects us to the database with the command line
    const users = await dal.execute(sql);
    return users;
}
 // get user by id
const getUserById = async(id:string):Promise<User> =>{
    const sql = `SELECT * FROM users WHERE id =${id}`;
    const user = await dal.execute(sql);
    return user;
} 
// get user by email (username)
const getUserByEmail = async(email:string):Promise<User> =>{
    const sql = `SELECT * FROM users WHERE email ='${email}'`;
    const user = await dal.execute(sql);
    //console.log(user);
    return user;
} 

//add new user(registration)
const addUser = async(newUser:User):Promise<User> =>{
    const sql =`SELECT * FROM users WHERE email = '${newUser.email}'`;
    const user = await dal.execute(sql);
    if (user.length>0){
        console.log("User already exists") 
        
    } else{
        const newSql = `
    INSERT INTO users (name, lastName, email, id, password, city, street, role) 
    VALUES ('${newUser.name}', '${newUser.lastName}', '${newUser.email}', '${newUser.id}', '${newUser.password}', '${newUser.city}', '${newUser.street}', '${newUser.role}');
     `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(newSql);
    //newUser.id = result.insertId;
    return newUser;
    }
}

//delete user
const deleteUser = async(id:string):Promise<void> =>{
    const sql = `DELETE FROM users WHERE id ='${id}'`;
    return await dal.execute(sql);
}
//delete user by email
const deleteUserByEmail = async(email:string):Promise<void> =>{
    const sql = `DELETE FROM users WHERE email ='${email}'`;
    return await dal.execute(sql);
}
// // user login with JWT
// const loginUser = async (email:string, password:string): Promise<string> => {
//     // command line for the DB
//     const sql = `SELECT * FROM users WHERE email ='${email}' AND password='${password}'`;
//     // a promise function that connects us to the database with the command line
//     const user = await dal.execute(sql);
//     if (user.length>0){
//         console.log(`Welcome dear user ${user[0].name}`) 
//         const token = getJWT(user[0].email);
//         //console.log(token);
//     return token;
//     } else{
//         console.log("Who are you?");
//         return;
//     }
// }

export default{
    allUsers,
    addUser,
    deleteUser,
    loginUser,
    getUserById,
    getUserByEmail,
    deleteUserByEmail
}