/**
 * Middleware to check if the user has one of the required roles.
 * 
 * @swagger
 * components:
 *   schemas:
 *     RoleError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         message:
 *           type: string
 *           description: Error message
 * 
 * @swagger
 * tags:
 *   name: Role Validation
 *   description: API for validating user roles
 */

/**
 * Middleware to check if the user has one of the required roles.
 * 
 * @param {...string} roles - The roles to check against
 * @returns {Function} - The middleware function
 */
export const hasRoles = (...roles) => {
    return (req, res, next) =>{
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                message: "Se quiere verificar un role antes de validar el token"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                message:`El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}