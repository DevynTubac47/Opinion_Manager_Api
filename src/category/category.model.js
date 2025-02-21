import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - nameCategory
 *         - descriptionCategory
 *       properties:
 *         nameCategory:
 *           type: string
 *           description: El nombre de la categoría
 *         descriptionCategory:
 *           type: string
 *           description: La descripción de la categoría
 *       example:
 *         nameCategory: "Tecnología"
 *         descriptionCategory: "Categoría para publicaciones relacionadas con tecnología"
 */
const categorySchema = Schema({
    nameCategory:{
        type: String,
        required: [true, "Name category is required"],
        unique: true
    },
    descriptionCategory:{
        type:String,
        required: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Category', categorySchema);