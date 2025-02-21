import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { userCommentDelete, userCommentUpdate } from "../helpers/db-validators.js"

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         text:
 *           type: string
 *           description: The text of the comment
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for comments
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was successfully created
 *       400:
 *         description: Bad request
 */
export const createdCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

/**
 * @swagger
 * /comments/{uid}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: The comment was not found
 */
export const updateCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    param("uid").custom(userCommentUpdate),
    validarCampos,
    handleErrors
]

/**
 * @swagger
 * /comments/{uid}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment was successfully deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: The comment was not found
 */
export const deleteCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    param("uid").custom(userCommentDelete),
    validarCampos,
    handleErrors
]

