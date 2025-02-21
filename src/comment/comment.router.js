import { Router } from "express";
import { createdCommentValidator, deleteCommentValidator, updateCommentValidator } from "../middlewares/comment-validators.js";
import { addComment, deleteComment, getCommentbyPublication, updateComment } from "./comment.controller.js";

const router = Router();

/**
 * @swagger
 * /comments/publication/{uid}/addComment:
 *   post:
 *     summary: Añadir un nuevo comentario a una publicación
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
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
router.post("/publication/:uid/addComment", createdCommentValidator, addComment);

/**
 * @swagger
 * /comments/publication/{uid}/comments:
 *   get:
 *     summary: Obtener comentarios por publicación
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
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
router.get("/publication/:uid/comments", getCommentbyPublication);

/**
 * @swagger
 * /comments/updateComment/{uid}:
 *   patch:
 *     summary: Actualizar un comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
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
router.patch("/updateComment/:uid", updateCommentValidator, updateComment);

/**
 * @swagger
 * /comments/deleteComment/{uid}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
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
router.delete("/deleteComment/:uid", deleteCommentValidator, deleteComment);

export default router;