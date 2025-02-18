import { Router } from "express";
import { addCategory, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { createdCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/addCategory", createdCategoryValidator, addCategory);

router.get("/", getCategory);

router.put("/updateCategory/:id", updateCategoryValidator, updateCategory)

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory)

export default router;

