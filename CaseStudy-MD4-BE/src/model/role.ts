import { model, Schema } from "mongoose";
import { IUser } from "./user";

export interface IRole {
    name?: string;
    user?: IUser;
}
const roleSchema = new Schema<IRole>({
    name: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});
const Role = model<IRole>('Role', roleSchema);
export {Role}