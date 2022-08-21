import { model, Schema } from "mongoose";

export interface IDiscount {
    name?: string;
    value?: number;
}
const discountSchema = new Schema<IDiscount>({
    name: String,
    value: Number
});
const Discount = model<IDiscount>('Discount', discountSchema);
export {Discount}