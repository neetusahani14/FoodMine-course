import mongoose, { model, Schema } from "mongoose";

export interface Food {
    id: string;
    name: string;
    price: number;
    cookTime: string;
    favorite: boolean;
    origins: string[];
    stars: number;
    imageUrl: string;
    tags?: string[];
}

export const FoodSchema = new Schema<Food> (
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        cookTime: {type: String, required: true},   
        favorite: {type: Boolean, required: true},
        origins: {type: [String], required: true},
        stars: {type: Number, required: true},
        imageUrl: {type: String, required: true},
        tags: {type: [String]},

    },{
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true,
    },
   
);
export const FoodModel = model<Food>('food', FoodSchema);