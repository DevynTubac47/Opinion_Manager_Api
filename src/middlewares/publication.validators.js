import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { publicationExists, titlePublication, userDelete, userUpdate } from "../helpers/db-validators.js"

/**
 * @swagger
 * components:
 *   schemas:
 *     Publication:
 *       type: object
 *       required:
 *         - title
 *         - textPublication
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the publication
 *         textPublication:
 *           type: string
 *           description: The text of the publication
 * 
 * @swagger
 * tags:
 *   name: Publications
 *   description: API for publications
 */

/**
 * @swagger
 * /publications:
 *   post:
 *     summary: Create a new publication
 *     tags: [Publications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publication'
 *     responses:
 *       200:
 *         description: The publication was successfully created
 *       400:
 *         description: Bad request
 */
export const createdPublicationValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    body("title").notEmpty().withMessage("The title is required"),
    body("title").custom(titlePublication),
    body("textPublication").notEmpty().withMessage("The description is required"),
    validarCampos,
    handleErrors
]

/**
 * @swagger
 * /publications/{uid}:
 *   put:
 *     summary: Update a publication
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The publication id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publication'
 *     responses:
 *       200:
 *         description: The publication was successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: The publication was not found
 */
export const updatePublicationValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(publicationExists),
    param("uid").custom(userUpdate),
    validarCampos,
    handleErrors
]

/**
 * @swagger
 * /publications/{uid}:
 *   delete:
 *     summary: Delete a publication
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The publication id
 *     responses:
 *       200:
 *         description: The publication was successfully deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: The publication was not found
 */
export const deletePublicationValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(publicationExists),
    param("uid").custom(userDelete),
    validarCampos,
    handleErrors
]