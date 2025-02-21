import { hash, verify } from "argon2";
import User from "./user.model.js"
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users/{uid}/password:
 *   put:
 *     summary: Update a user's password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password of the user
 *               newPassword:
 *                 type: string
 *                 description: The new password of the user
 *     responses:
 *       200:
 *         description: The password was successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating password
 */
export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const concurrentPassword = await verify(user.password, oldPassword);
        if(!concurrentPassword) {
            return res.status(400).json({
                success: false,
                message: 'The current password is incorrect'
            });
        }

        const oldAndNewPassword = await verify(user.password, newPassword);
        if (oldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'The new password cannot be the same as the previous one'
            });
        }

        const encryptedPassword = await hash(newPassword);
        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

/**
 * @swagger
 * /users/{uid}:
 *   put:
 *     summary: Update a user's information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */
export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { username, ...data} = req.body;

        if (username) {
            const existingUser = await User.findOne({ username });
            if (existingUser && existingUser._id.toString() !== uid) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                });
            }
            data.username = username; 
        }
        
        const updatedData = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            mesage: 'Usuario Actualizado',
            user: updatedData,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            messagge: 'Error al actualizar usuario',
            error: err.message
        });
    }
};

/**
 * @swagger
 * /users/{uid}/profile-picture:
 *   put:
 *     summary: Update a user's profile picture
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The new profile picture of the user
 *     responses:
 *       200:
 *         description: The profile picture was successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating profile picture
 */
export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                messagge: 'No se proporcionó una nueva foto de perfil',
            });
        }

        const user = await User.findById(uid);

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            messagge: 'Foto de perfil actualizada',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            messagge: 'Error al actualizar la foto de perfil',
            error: err.message
        });
    }
};

/**
 * @swagger
 * /users/admin-default:
 *   post:
 *     summary: Add a default admin user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Admin created by default
 *       500:
 *         description: Error creating user
 */
export const addAdminDefault = async() => {
    try{
        const admin = await User.findOne({ role: "ADMIN_ROLE"})
        if(!admin) {
            const profilePicture = "pictureAdmin.jpg";
            await User.create({
                name: "Devyn",
                surname: "Gomez",
                username: "Dev_vyn",
                email: "devGomez@gmail.com",
                password: await hash("123456789"),
                role: "ADMIN_ROLE",
                phone: "12345678",
                profilePicture: profilePicture
            })
            console.log("Admin created by default")
        }

    }catch(err){
        console.log("Error creating user")
    }
}
