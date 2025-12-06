import { Schema, model } from "mongoose";

export interface User{
    id:string;
    name:string;
    email:string;
    password:string;
    isAdmin:boolean;
    token?:string;
}

export const UserSchema = new Schema<User>(
    {
        name: {type: String, required: true},       
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, required: true, default: false},
    },{
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true,
    },
);
export const UserModel = model<User>('user', UserSchema);   

// import { Schema, model, Document } from "mongoose";
// import bcrypt from "bcryptjs";

// export interface User extends Document {
//   name: string;
//   email: string;
//   password: string;
//   isAdmin: boolean;
//   token?: string;
// }

// export const UserSchema = new Schema<User>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isAdmin: { type: Boolean, required: true, default: false },
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//     timestamps: true,
//   }
// );

// // 🔒 Hash password before saving (no `next`)
// UserSchema.pre("save", async function () {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// // Optional: virtual id mapping
// UserSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// export const UserModel = model<User>("User", UserSchema);