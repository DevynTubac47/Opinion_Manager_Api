import { Router } from "express";
import { addCategory, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { createdCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /addCategory:
 *   post:
 *     summary: Añadir una nueva categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoría añadida exitosamente
 */
router.post("/addCategory", createdCategoryValidator, addCategory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get("/", getCategory);

/**
 * @swagger
 * /updateCategory/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 */
router.put("/updateCategory/:id", updateCategoryValidator, updateCategory)

/**
 * @swagger
 * /deleteCategory/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory)

export default router;

