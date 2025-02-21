/**
 * Middleware to handle errors.
 * 
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *           description: List of validation errors
 *         message:
 *           type: string
 *           description: Error message
 * 
 * @swagger
 * tags:
 *   name: Error Handling
 *   description: API for handling errors
 */

export const handleErrors = (err, req, res, next) => {
    if (err.status === 400 || err.errors) {
        return res.status(400).json({
            success: false,
            errors: err.errors
        });
    }
    return res.status(500).json({
        success: false,
        message: err.message
    });
}
