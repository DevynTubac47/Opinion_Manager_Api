import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { userCommentDelete, userCommentUpdate } from "../helpers/db-validators.js"

export const createdCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const updateCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    param("uid").custom(userCommentUpdate),
    validarCampos,
    handleErrors
]

export const deleteCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    param("uid").custom(userCommentDelete),
    validarCampos,
    handleErrors
]

