import foodModel from "../models/foodModel.js";
import fs from 'fs';

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// add food
const addFood = async (req, res) => {
    try {
        const imageUrl = req.file.path;  // Cloudinary returns the URL here

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            // image: imageUrl,  // Store the URL instead of filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// edit food
const editFood = async (req, res) => {
    try {
        const { id, name, description, price, category } = req.body;
        let updatedData = { name, description, price, category };

        if (req.file) { // Check if a new image is uploaded
            updatedData.image = req.file.path;  // Cloudinary URL
        }

        console.log(id);
        const food = await foodModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.json({ success: true, message: "Food Updated", data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// delete food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        if (food) {
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Food Removed" });
        } else {
            res.json({ success: false, message: "Food Not Found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { listFood, addFood, editFood, removeFood };
