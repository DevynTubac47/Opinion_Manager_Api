import Comment from "./comment.model.js";
import Publication from "../publication/publication.model.js";

/**
 * @swagger
 * /comments/{uid}:
 *   post:
 *     summary: Añadir un nuevo comentario a una publicación
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               textComment:
 *                 type: string
 *                 description: Texto del comentario
 *     responses:
 *       200:
 *         description: Comentario añadido exitosamente
 *       500:
 *         description: Error guardando el comentario
 */
export const addComment = async(req, res) => {
    try{
        const { uid } = req.params;
        const { textComment } = req.body;

        const comment = new Comment({
            textComment,
            publication: uid,
            creator: req.usuario._id,
        })

        await comment.save();

        const commentCreate = await Comment.findById(comment._id).populate('publication','title').populate('creator','username');

        res.status(200).json({
            success: true,
            commentCreate
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error saving comment',
            error: error.message
        })
    }
}

/**
 * @swagger
 * /comments/publication/{uid}:
 *   get:
 *     summary: Obtener comentarios por publicación
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error obteniendo la lista de comentarios
 */
export const getCommentbyPublication = async(req, res) =>{
    try{
        const { uid } = req.params;

        const publication = await Publication.findById(uid);
        if(!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        const comments = await Comment.find({publication: uid})
            .populate('creator', 'username');

        res.status(200).json({
            success: true,
            total: comments.length,
            comments
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error getting list of comments",
            error: error.message
        })
    }
}

/**
 * @swagger
 * /comments/{uid}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newComment:
 *                 type: string
 *                 description: Nuevo texto del comentario
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *       500:
 *         description: Error actualizando el comentario
 */
export const updateComment = async(req, res) =>{
    try{
        const { uid } = req.params;
        const { newComment } = req.body

        const comment = await Comment.findById(uid);

        comment.textComment = newComment;
        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Update Comment',
            comment,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error updating comment',
            error: error.message
        })
    }
}

/**
 * @swagger
 * /comments/{uid}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error eliminando el comentario
 */
export const deleteComment = async(req, res) =>{
    try{
        const { uid } = req.params;

        const comment = await Comment.findByIdAndDelete(uid);

        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Delete Comment",
            comment,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error deleting comment',
            error: error.message
        })
    }
}