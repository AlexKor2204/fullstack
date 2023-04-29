// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import categoryLogic from '../Logic/categoryLogic';

// generic router 
const categoryController = express.Router();

categoryController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
})
// get all products
categoryController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await categoryLogic.getAllCategories());
})

export default categoryController;