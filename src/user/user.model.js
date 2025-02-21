import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - username
 *         - email
 *         - password
 *         - phone
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *           maxLength: 25
 *         surname:
 *           type: string
 *           description: The surname of the user
 *           maxLength: 25
 *         username:
 *           type: string
 *           description: The username of the user
 *           unique: true
 *         email:
 *           type: string
 *           description: The email of the user
 *           unique: true
 *         password:
 *           type: string
 *           description: The password of the user
 *         profilePicture:
 *           type: string
 *           description: The profile picture of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *           minLength: 8
 *           maxLength: 8
 *         role:
 *           type: string
 *           description: The role of the user
 *           default: 'USER_ROLE'
 *         status:
 *           type: boolean
 *           description: The status of the user
 *           default: true
 *       example:
 *         name: "John"
 *         surname: "Doe"
 *         username: "johndoe"
 *         email: "johndoe@example.com"
 *         password: "password123"
 *         profilePicture: "profile.jpg"
 *         phone: "12345678"
 *         role: "USER_ROLE"
 *         status: true
 */

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture:{
        type: String
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role:{
        type: String,
        required: true,
        default:'USER_ROLE'
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)