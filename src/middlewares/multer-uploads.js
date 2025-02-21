import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_SIZE = 100000000;

/**
 * @swagger
 * components:
 *   schemas:
 *     FileUpload:
 *       type: object
 *       properties:
 *         file:
 *           type: string
 *           format: binary
 *           description: The file to be uploaded
 * 
 * @swagger
 * tags:
 *   name: File Uploads
 *   description: API for uploading files
 */

/**
 * Create a multer configuration for file uploads.
 * 
 * @param {string} destinationFolder - The folder where files will be uploaded.
 * @returns {multer} - The multer configuration.
 */
const createMulterConfig = (destinationFolder) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const fullPath = join(CURRENT_DIR, destinationFolder);
                req.filePath = fullPath;
                cb(null, fullPath);
            },
            filename: (req, file, cb) => {
                const fileExtension = extname(file.originalname);
                const fileName = file.originalname.split(fileExtension)[0];
                cb(null, `${fileName}-${Date.now()}${fileExtension}`);
            }   
        }),
        fileFilter: (req, file, cb) => {
            if (MIMETYPES.includes(file.mimetype)) cb(null, true);
            else cb(new Error(`Solamente se aceptan archivos de los siguientes tipos: ${MIMETYPES.join(" ")}`));
        },
        limits: {
            fileSize: MAX_SIZE
        }
    });
};

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload a profile picture
 *     tags: [File Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FileUpload'
 *     responses:
 *       200:
 *         description: The file was successfully uploaded
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
export const uploadProfilePicture = createMulterConfig("../../public/uploads/profile-pictures");