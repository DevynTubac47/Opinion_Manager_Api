import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { publicationExists, titlePublication, userDelete, userUpdate,  } from "../helpers/db-validators.js"

export const createdPublicationValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    body("title").notEmpty().withMessage("The title is required"),
    body("title").custom(titlePublication),
    body("textPublication").notEmpty().withMessage("The description is required"),
    validarCampos,
    handleErrors
]

export const updatePublicationValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(publicationExists),
    param("uid").custom(userUpdate),
    validarCampos,
    handleErrors
]

export const deletePublicationValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(publicationExists),
    param("uid").custom(userDelete),
    validarCampos,
    handleErrors
]