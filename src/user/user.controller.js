import { hash, verify } from "argon2";
import User from "./user.model.js"
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { username, data} = req.body;

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

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            mesagge: 'Usuario Actualizado',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            messagge: 'Error al actualizar usuario',
            error: err.message
        });
    }
};

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
