// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import purchaseLogic from '../Logic/purchaseLogic';

//generic router 
const purchaseController = express.Router();

purchaseController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
})

// get all orders
purchaseController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await purchaseLogic.getAllOrders());
})
//get order  by id
purchaseController.get("/id/:id", async (request: Request, response: Response, next: NextFunction) => {
    const orderId = +request.params.id;
    response.status(200).json(await purchaseLogic.getOrderById(orderId));
}); 

//get order by user id
purchaseController.get("/user/:costumerId", async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.costumerId;
    console.log(userId);
    response.status(200).json(await purchaseLogic.getOrderByUserId(userId));
}); 

// add new order
purchaseController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
    const newOrder = request.body;
    response.status(201).json(await purchaseLogic.addOrder(newOrder));
});

//delete order by id
purchaseController.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const purchaseId = +request.params.id;
    await purchaseLogic.deleteOrder(purchaseId);
    response.status(204).send( "was deleted successfully");
});

export default purchaseController;