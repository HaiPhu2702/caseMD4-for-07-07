import {NextFunction, Request, response, Response} from "express";
import {Product} from "../model/product";

class ProductController {
    getAll = async (req: Request, res: Response) => {
        let products = await Product.find().populate('tag').populate('category')
            .populate('restaurant')
            .populate('discount');
        res.status(200).json(products);
    }
    getProduct = async (req: Request, res: Response) => {
        try {
        const product = await Product.findOne({_id: req.params.id}).populate('tag').populate('category')
            .populate('restaurant')
            .populate('discount');
        res.status(200).json(product);}catch (e) {
            res.json(e.message)
        }
    }

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        console.log(id)
        try {
            let product = await Product.findOne({_id: id})
            if(!product){
               return  res.status(404).json('product not found')
            }else {
                await Product.findByIdAndDelete({_id: id})
               return  res.status(200).json('delete product successfully')
            }
        } catch (err) {
            next(err);
        }
    }


    addProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let product = req.body;
            product = await Product.create(product);
            let id = product._id;
            let regex: RegExp = /^[0-9a-fA-F]{24}$/;
            if (regex.test(id)) {
                let newProduct = await Product.findById(product._id)
                    .populate('tag')
                    .populate('category')
                    .populate('restaurant')
                    .populate('discount');
                res.status(200).json(newProduct);
            }
        } catch (err) {
            next(err);
        }
    }

    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
               let id = req.params.id;
                let data = req.body;

                await Product.findOneAndUpdate({
                    _id: id
                }, data);
                res.status(200).json({message:"update success"});

            }

         catch (err) {
            next(err)
        }
    }
}

export default new ProductController();