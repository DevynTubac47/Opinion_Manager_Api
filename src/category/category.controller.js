'use strict';

import Publication from "../publication/publication.model.js";
import Category from "./category.model.js";

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Añadir una nueva categoría
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCategory:
 *                 type: string
 *               descriptionCategory:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría añadida exitosamente
 *       500:
 *         description: Error al añadir la categoría
 */
export const addCategory = async (req, res)=>{
    try{
        const data = req.body;

        const category = new Category({
            ...data,
        });

        await category.save();
        
        res.status(200).json({
            success: true,
            category
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error adding category',
            error
        })
    }
}

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Obtener una lista de categorías
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de categorías a devolver
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de categorías a omitir
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *       500:
 *         description: Error al obtener la lista de categorías
 */
export const getCategory = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query

        const query = {}

        const [total, categorys ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            categorys
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error getting list of categories",
            error: error.message
        })
    }
}

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [Category]
 *     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID de la categoría a actualizar
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nameCategory:
*                 type: string
*               descriptionCategory:
*                 type: string
*     responses:
*       200:
*         description: Categoría actualizada exitosamente
*       404:
*         description: Categoría no encontrada
*       500:
*         description: Error al actualizar la categoría
*/
export const updateCategory = async(req, res) => {
    try{
        const { id } = req.params;
        const { ...data } = req.body;

        const categoryExists = await Category.findById(id);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        const categoryUpdate = await Category.findByIdAndUpdate(id, data,{new:true})
        
        res.status(200).json({
            success: true,
            message: 'Updated Category',
            category: categoryUpdate,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: error.message
        })
    }
}

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Eliminar una categoría existente
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al eliminar la categoría
 */
export const deleteCategory = async (req, res) => {
    try{
        const { id } = req.params

        const categoryExists = await Category.findById(id);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        await Category.findByIdAndDelete(id)

        const categoryDefault = await Category.findOne({ nameCategory:"Novedades"})

        await Publication.updateMany({ category: id }, { category: categoryDefault._id });

        return res.status(200).json({
            sucess: true,
            message: "Delete Category",
            category: categoryExists
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: error.message
        })
    }
}

/**
 * @swagger
 * /category/default:
 *   post:
 *     summary: Añadir una categoría por defecto
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categoría por defecto añadida exitosamente
 *       500:
 *         description: Error al añadir la categoría por defecto
 */
export const addCategoryDefault = async () => {
    try{
        const category = await Category.findOne({ nameCategory: "General" });
        if (!category) {
            await Category.create({
                nameCategory: "Novedades",
                descriptionCategory: "Publicaciones sobre lo más reciente, eventos y cambios importantes.",
            });
            console.log("Category created by default")
        }
    }catch(error){
        console.log("Error creating category")
    }
}