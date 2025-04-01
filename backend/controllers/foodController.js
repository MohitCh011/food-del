import foodModel from "../models/foodModel.js";
import cloudinary from "cloudinary";
import fs from "fs";

// Cloudinary Configuration
cloudinary.v2.config({
    cloud_name: 'dxkbfeh6q',
    api_key: '442473347515331',
    api_secret: 'nJ5GqlhSY_apNmRagVnodDq7lZ8'
});

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Add new food item (Cloudinary Upload)
const addFood = async (req, res) => {
    try {
        // Ensure all required fields are present
        const { name, description, price, category, imageUrl, imagePublicId } = req.body;

        if (!imageUrl || !imagePublicId) {
            return res.json({ success: false, message: "Image upload failed" });
        }

        // Save food details with Cloudinary image URL and public ID
        const food = new foodModel({
            name,
            description,
            price,
            category,
            imageUrl,       // Cloudinary URL
            imagePublicId,  // Cloudinary public ID
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food" });
    }
};

// Delete food item (Remove image from Cloudinary)
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Extract Cloudinary public ID from stored data
        const publicId = food.imagePublicId;

        // Remove image from Cloudinary
        await cloudinary.v2.uploader.destroy(`food_images/${publicId}`);

        // Remove food from database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food" });
    }
};

export { listFood, addFood, removeFood };
