import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Publication:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - textPublication
 *         - creator
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the publication
 *           maxLength: 100
 *         category:
 *           type: string
 *           description: The category of the publication
 *         textPublication:
 *           type: string
 *           description: The text of the publication
 *         creator:
 *           type: string
 *           description: The creator of the publication
 *       example:
 *         title: "Sample Publication"
 *         category: "60d0fe4f5311236168a109ca"
 *         textPublication: "This is a sample publication."
 *         creator: "60d0fe4f5311236168a109cb"
 */

const publicationSchema = new Schema({
    title:{
        type: String,
        required: [true, "Post title is required."],
        maxLength: [100, "The title of the publication cannot exceed 100 characters."],
        unique: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    textPublication:{
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Publication', publicationSchema)