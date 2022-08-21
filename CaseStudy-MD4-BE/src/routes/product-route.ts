import { Router } from "express";
import productController from "../controller/product-controller";

export const productRoute = Router();
productRoute.get('', productController.getAll);
productRoute.get('/product/:id',productController.getProduct);
productRoute.put('/editProduct/:id',productController.updateProduct);
productRoute.delete('/delete/:id', productController.deleteProduct);
productRoute.post('/create', productController.addProduct);