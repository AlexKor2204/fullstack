// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import cartLogic from '../Logic/cartLogic';

// generic router 
const cartController = express.Router();

cartController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
})

// get all carts
cartController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await cartLogic.getAllCarts());
})

  //get cart by users id
cartController.get("/user/:id", async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    //console.log(userId);
    response.status(200).json(await cartLogic.getCartByUserId(userId));
});

 //get cart by id
cartController.get("/cart/:id", async (request: Request, response: Response, next: NextFunction) => {
    const cartId = +request.params.id;
    console.log(cartId);
    response.status(200).json(await cartLogic.getCartById(cartId));
});

// create new cart
cartController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
    const newCart = request.body;
    response.status(201).json(await cartLogic.addCart(newCart));
});

//delete cart by id
cartController.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const cartId = +request.params.id;
    await cartLogic.deleteCart(cartId);
    response.status(204).json( "was deleted successfully");
});

export default cartController;