// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import itemLogic from '../Logic/itemLogic';

// generic router 
const itemController = express.Router();

itemController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
})

// get all items
itemController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await itemLogic.getAllItems());
})

//get items by cart id
itemController.get("/cart/:id", async (request: Request, response: Response, next: NextFunction) => {
    const cartId = +request.params.id;
    console.log(cartId);
    response.status(200).json(await itemLogic.getItemByCartId(cartId));
});

// add new item to the cart
itemController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
    const newItem = request.body;
    response.status(201).json(await itemLogic.addItem(newItem));
});

//delete item by id
itemController.delete("/:id/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    const itemId = request.params.id;
    const cartId = +request.params.cartId;
    await itemLogic.deleteItem(itemId, cartId);
    response.status(204).json( "was deleted successfully");
});

//delete items by cart id
itemController.delete("/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    const cartId = +request.params.cartId;
    await itemLogic.deleteItemByCartId( cartId);
    response.status(204).json( "was deleted successfully");
});

export default itemController;