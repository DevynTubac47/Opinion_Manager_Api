import fs from "fs/promises";
import { join } from "path";

/**
 * Middleware to delete a file if an error occurs during the request.
 * 
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         stack:
 *           type: string
 *           description: Error stack trace
 * 
 * @swagger
 * tags:
 *   name: File Management
 *   description: API for managing files
 * 
 * @swagger
 * /files/error:
 *   post:
 *     summary: Delete a file on error
 *     tags: [File Management]
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
 *     responses:
 *       200:
 *         description: The file was successfully deleted
 *       500:
 *         description: Internal server error
 */
export const deleteFileOnError = async (err, req, res, next) => {
    if (req.file && req.filePath) {
        const filePath = join(req.filePath, req.file.filename);
        try {
            await fs.unlink(filePath);
        } catch (unlinkErr) {
            console.log(`Error deleting file: ${unlinkErr}`);
        }
    }
    next(err);
}