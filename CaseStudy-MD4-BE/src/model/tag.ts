import { model, Schema } from "mongoose";
import { IProduct } from "./product";

export interface ITag {
    name?: string;
    product?: IProduct;
}
const tagSchema = new Schema<ITag>({
    name: String,
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});
const Tag = model<ITag>('Tag', tagSchema);
export {Tag}