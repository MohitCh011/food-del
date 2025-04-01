import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },  // Cloudinary image URL
    imagePublicId: { type: String, required: true },  // Cloudinary public ID for deletion
    category: { type: String, required: true }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
