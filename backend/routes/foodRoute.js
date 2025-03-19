import express from 'express';
import { addFood, listFood, removeFood, editFood } from '../controllers/foodController.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const foodRouter = express.Router();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'YOUR_CLOUD_NAME',
    api_key: 'YOUR_API_KEY',
    api_secret: 'YOUR_API_SECRET'
});

// Cloudinary Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',  // Folder name in your Cloudinary dashboard
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({ storage: storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/edit", editFood);  // New Edit Route

export default foodRouter;
