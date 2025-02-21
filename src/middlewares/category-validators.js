import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

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
 *           description: The name of the category
 *         descriptionCategory:
 *           type: string
 *           description: The description of the category
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for categories
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was successfully created
 *       400:
 *         description: Bad request
 */
export const createdCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameCategory").notEmpty().withMessage("The name category is required"),
    body("descriptionCategory").notEmpty().withMessage("The description is required"),
    validarCampos,
    handleErrors
];

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: The category was not found
 */
export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("It is not a valid ID"),
    body("descriptionCategory").optional().notEmpty().withMessage("Description is required"),
    validarCampos,
    handleErrors
];

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category was successfully deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: The category was not found
 */
export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("It is not a valid ID"),
    validarCampos,
    handleErrors
];