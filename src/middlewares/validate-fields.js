import { validationResult } from "express-validator";

/**
 * Middleware to validate fields.
 * 
 * @swagger
 * components:
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Error message
 *         param:
 *           type: string
 *           description: Parameter that caused the error
 *         location:
 *           type: string
 *           description: Location of the parameter (e.g., body, query, params)
 * 
 * @swagger
 * tags:
 *   name: Validation
 *   description: API for validating fields
 */

/**
 * Middleware to validate fields in the request.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
export const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(errors)
    }
    next()
}