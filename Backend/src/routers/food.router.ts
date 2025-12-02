import e, {Router } from "express";
import { sample_foods, sample_tags } from "../data";
import expressAsyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";
const router = Router();

router.get("/seed", expressAsyncHandler(async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
        res.send("Seed is already done!");
        return;
    }
    await FoodModel.create(sample_foods);
    res.send("Seed is done!");
}));

router.get("/", expressAsyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
}));

router.get('/', (req, res) => {
    res.send('✅ Backend is running. Try /api/foods');
});

router.get("/search/:searchTerm", expressAsyncHandler(async (req, res) => {
    const searchRegExp = new RegExp(req.params.searchTerm, 'i');
    const foods = await FoodModel.find({ name: { $regex: searchRegExp } });
    res.send(foods);
}));

router.get("/tags", expressAsyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
        {
            $unwind: '$tags'                            
        },
        {
            $group: {   
                _id: '$tags',
                count: { $sum: 1 }                        
            }
        },
        {
            $project: { 
                _id: 0,
                name: '$_id',
                count: 1
            }
        }
    ]).sort({ count: -1 });
    const all = {
        name: 'All',
        count: await FoodModel.countDocuments()
    };
    tags.unshift(all);
    res.send(tags);
                
}));

router.get("/tag/:tagName", expressAsyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
  
}));
    
router.get("/:foodId", expressAsyncHandler(async (req, res) => {
    
    const foodId = req.params.foodId;
    const food = await FoodModel.findById(foodId);
    res.send(food);
}));    
export default router;