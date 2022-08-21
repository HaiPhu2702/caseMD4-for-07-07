import { model, Schema } from "mongoose";
import { ICategory } from "./category";
import { IDiscount } from "./discount";
import { IRestaurant } from "./restaurant";
import { ITag } from "./tag";

export interface IProduct {
    name?: string;
    price?: number;
    tag?: ITag;
    category?: ICategory;
    amount?:number ;
    restaurant?: IRestaurant;
    discount?: IDiscount;
}
const productSchema = new Schema<IProduct>({
    name: String,
    price: Number,
    tag: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    amount :{
        type: Number
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref: 'Discount'
    }
})
const Product = model<IProduct>('Product', productSchema);
export {Product}