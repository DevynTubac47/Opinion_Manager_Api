import { Router } from "express";

import { updateUser, updatePassword, updateProfilePicture } from "./user.controller.js";
import { updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users/{uid}/password:
 *   patch:
 *     summary: Update a user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /users/{uid}:
 *   put:
 *     summary: Update a user's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.put("/updateUser/:uid", updateUserValidator, updateUser);

/**
 * @swagger
 * /users/{uid}/profile-picture:
 *   patch:
 *     summary: Update a user's profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

export default router;