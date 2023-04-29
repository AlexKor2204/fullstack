// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import userLogic from '../Logic/userLogic';
import { checkJWT, getJWT, getUserNameFromJWT } from '../Utils/JWT';
//import vacationLogic from '../Logic/productLogic';


// generic router 
const userController = express.Router();

userController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
});

// login
userController.post("/login",async (request: Request, response: Response, next: NextFunction) => {
  //user admin , password admin...
  const user = request.body;
  //console.log(user.email,user.password);
  response.status(202).json(await userLogic.loginUser(user.email, user.password));
  // if (user.email==="admin" && user.password==="password"){
  //     // response.status(202).json(await vacationLogic.getAllVacations())
  //     response.status(202).send("admin")
  //     console.log("Hello Admin")
  //   } else {
  //     response.status(202).json(await userLogic.loginUser(user.email, user.password));
  //   }
    });


// get all users
userController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  //check if we have a token in the header.....
  if (request.headers.authorization){
    //create new JWT
    const userName = getUserNameFromJWT(request.headers.authorization)
    response.set("Authorization",`Bearer ${await getJWT(userName)}`);
    //return the response
    response.status(200).json( await userLogic.allUsers())
} else {
    response.status(401).json("You are no authorized!!!");
}
})

// registration of the new user
userController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const newUser = request.body;
  response.status(201).json(await userLogic.addUser(newUser));
});

//delete user by id
userController.delete("/id/:id", async (request: Request, response: Response, next: NextFunction) => {
  const userId = request.params.id;
  await userLogic.deleteUser(userId);
  response.status(204).send( "was deleted successfully");
});
//delete user by email
userController.delete("/email/:email", async (request: Request, response: Response, next: NextFunction) => {
  const userEmail = request.params.email;
  await userLogic.deleteUserByEmail(userEmail);
  response.status(204).send( "was deleted successfully");
});
// // login with JWT
// userController.post("/login",async (request: Request, response: Response, next: NextFunction) => {
//   //user admin , password admin...
//   const body = request.body;
//   //console.log(body.email ,body.password);
//   const token = await userLogic.loginUser(body.email, body.password);
//   //console.log(token);
//   if (token){
//     //add token to the system...
//     response.set('Authorization',`Bearer ${token}`);
//     //console.log("user name:",getUserNameFromJWT(token));
//     response.status(202).json("Authorization is complete");
//   }else{
//     response.status(401).send("You are not authorized!!!!")
//   }


    //get user by id
  userController.get("/id/:id", async (request: Request, response: Response, next: NextFunction) => {
      const userId = request.params.id;
      console.log(userId);
      response.status(200).json(await userLogic.getUserById(userId));
    });

    //get user  by username
  userController.get("/email/:email", async (request: Request, response: Response, next: NextFunction) => {
    const userEmail = request.params.email;
    response.status(200).json(await userLogic.getUserByEmail(userEmail));
  });

export default userController;