// import { Schema, model } from "mongoose";

// export interface User{
//     _id:string;
//     name:string;
//     email:string;
//     password:string;
//     isAdmin:boolean;
//     address:string;
//     token?:string;
// }

// export const UserSchema = new Schema<User>(
//     {
//         name: {type: String, required: true},       
//         email: {type: String, required: true, unique: true},
//         password: {type: String, required: true},
//         isAdmin: {type: Boolean, required: true, default: false},
//     },{
//         toJSON: {virtuals: true},
//         toObject: {virtuals: true},
//         timestamps: true,
//     },
// );
// export const UserModel = model<User>('user', UserSchema);   

import { Schema, model } from "mongoose";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  address: string;
  token?: string;
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },   // ✅ added
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const UserModel = model<User>("user", UserSchema);