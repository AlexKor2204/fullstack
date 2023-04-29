// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import productLogic from '../Logic/productLogic';


// generic router 
const productController = express.Router();

productController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
})

// get all products
productController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await productLogic.getAllProducts());
})

  //get product  by id
  productController.get("/id/:id", async (request: Request, response: Response, next: NextFunction) => {
    const productId = +request.params.id;
    response.status(200).json(await productLogic.getProductById(productId));
  }); 

  //get product  by name
  productController.get("/name/:name", async (request: Request, response: Response, next: NextFunction) => {
    const productName = request.params.name;
    response.status(200).json(await productLogic.getProductsByName(productName));
  }); 

  //get products  by category
  productController.get("/category/:id", async (request: Request, response: Response, next: NextFunction) => {
    const categoryId = request.params.id;
    //console.log(categoryId);
    response.status(200).json(await productLogic.getProductsByCategory(categoryId));
  }); 

// add new product
productController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const newProduct = request.body;
  response.status(201).json(await productLogic.addProduct(newProduct));
});

//delete product by id
productController.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const productId = +request.params.id;
  await productLogic.deleteProduct(productId);
  response.status(204).send( "was deleted successfully");
});

//update product
productController.put("/", async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    response.status(201).json( await productLogic.updateProduct(body));
});



export default productController;