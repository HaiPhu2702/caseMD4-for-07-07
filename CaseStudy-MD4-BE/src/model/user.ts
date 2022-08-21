import { model, Schema } from "mongoose"
import { IRole } from "./role";

export interface IUser {
    username?: string;
    password?: string;
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    role?: IRole[];
    // role: string;
}

const userSchema = new Schema<IUser>({
    username: String,
    password: String,
    name: String,
    email: String,
    address: String,
    phone: String,
    // role: String
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }]
});

const User = model<IUser>('User', userSchema);
export {User}