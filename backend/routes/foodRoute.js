import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Use Multer Memory Storage (No Local Saving)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
