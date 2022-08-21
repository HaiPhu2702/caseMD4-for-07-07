import { model, Schema } from "mongoose";
import { IOrder } from "./order";
import { IProduct } from "./product";

export interface IOrderDetail {
    product?: IProduct;
    order?: IOrder;
    price?: number;
    amount?: IProduct;
}
const orderDetailSchema = new Schema<IOrderDetail>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    price: Number,
    amount: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})
const OrderDetail = model<IOrderDetail>('OrderDetail', orderDetailSchema);
export {OrderDetail}