import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - textComment
 *         - creator
 *         - publication
 *       properties:
 *         textComment:
 *           type: string
 *           description: Texto del comentario
 *         creator:
 *           type: string
 *           description: ID del usuario que creó el comentario
 *         publication:
 *           type: string
 *           description: ID de la publicación a la que pertenece el comentario
 *       example:
 *         textComment: "Este es un comentario de ejemplo"
 *         creator: "60d0fe4f5311236168a109ca"
 *         publication: "60d0fe4f5311236168a109cb"
 */

const commentSchema = Schema({
    textComment:{
        type: String,
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publication:{
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Comment', commentSchema)