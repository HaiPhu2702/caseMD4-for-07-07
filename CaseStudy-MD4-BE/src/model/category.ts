import {model, Schema} from "mongoose";

export interface ICategory {
    name?: string;
}

const categorySchema = new Schema<ICategory>({
    name: String
});

const Category = model<ICategory>('Category', categorySchema);
export {Category};
