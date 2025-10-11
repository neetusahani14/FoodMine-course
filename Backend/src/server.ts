import express from 'express';
import cors from 'cors';
import { sample_foods, sample_tags } from './data';

const app = express();
//localhost:4200
app.use(cors({
    credentials: true,
  origin: ["http://localhost:4200"] 
}));

app.get('/api/foods', (req, res) => {
    res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const  searchTerm  = req.params.searchTerm;
    const filteredFoods = sample_foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.send(filteredFoods);
});

app.get('/api/foods/tags', (req, res) => {
    res.send(sample_tags);
});

app.get('/api/foods/tag/:tagName', (req, res) => {
    const tagName = req.params.tagName;
    const filteredFoods = sample_foods.filter(food => food.tags?.includes(tagName));
    res.send(filteredFoods);
});

app.get('/api/food/:foodId', (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId);
    res.send(food);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});