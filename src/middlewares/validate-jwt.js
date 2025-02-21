import jwt from "jsonwebtoken"
import User from "../user/user.model.js"

/**
 * Middleware to validate JWT.
 * 
 * @swagger
 * components:
 *   schemas:
 *     JWTError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         message:
 *           type: string
 *           description: Error message
 *         error:
 *           type: string
 *           description: Detailed error message
 * 
 * @swagger
 * tags:
 *   name: JWT Validation
 *   description: API for validating JWT tokens
 */

/**
 * Middleware to validate JWT in the request.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
export const validateJWT = async (req, res, next) => {
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(400).json({
                success: false,
                message: "No existe token en la petición"
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(uid)

        if(!user){
           return res.status(400).json({
                success: false,
                message: "Usuario no existe en la DB"
           }) 
        }

        if(user.status === false){
            return res.status(400).json({
                success: false,
                message: "Usuario desactivado previamente"
            })
        }

        req.usuario = user
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message : "Error al validar el token",
            error: err.message
        })
    }
}