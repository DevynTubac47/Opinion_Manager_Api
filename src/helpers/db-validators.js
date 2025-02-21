import User from "../user/user.model.js";
import Publication from "../publication/publication.model.js";
import Comment from "../comment/comment.model.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailExists:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *       example:
 *         email: "example@example.com"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsernameExists:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *       example:
 *         username: "exampleUser"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TitlePublication:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la publicación
 *       example:
 *         title: "Example Title"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserExists:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: ID del usuario
 *       example:
 *         uid: "60d0fe4f5311236168a109ca"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PublicationExists:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: ID de la publicación
 *       example:
 *         uid: "60d0fe4f5311236168a109cb"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: ID de la publicación
 *       example:
 *         uid: "60d0fe4f5311236168a109cb"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCommentUpdate:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: ID del comentario
 *       example:
 *         uid: "60d0fe4f5311236168a109cc"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDelete:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: ID de la publicación
 *       example:
 *         uid: "60d0fe4f5311236168a109cb"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCommentDelete:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: ID del comentario
 *       example:
 *         uid: "60d0fe4f5311236168a109cc"
 */

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email});
    if(existe){
        throw new Error(`The email ${email} is already registered`);
    }
};

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username});
    if(existe){
        throw new Error(`The username ${username} is already registered`);
    }
};

export const titlePublication = async (title = "") => {
    const existe = await Publication.findOne({title});
    if(existe){
        throw new Error(`There is already a publication with that ${title}`);
    }
};

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid);
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado");
    }
};

export const publicationExists = async (uid = " ") => {
    const existe = await Publication.findById(uid);
    if(!existe){
        throw new Error("No existe la publicación con el ID proporcionado");
    }
};

export const userUpdate = async (uid = "", { req }) => {
    try{   
        if (!req.usuario) {
            throw new Error("Usuario no autenticado");
        }

        const publication = await Publication.findById(uid);
        if(!publication) {
            throw new Error("Publication not found");
        }

        if (publication.creator.toString() !== req.usuario._id.toString()){
            throw new Error("You can't update this post");
        }
    }catch(error){
        throw new Error(error.message);
    }
};

export const userUpdateProfile = async (uid = "", { req }) => {
    try{   
        if (!req.usuario) {
            throw new Error("Usuario no autenticado");
        }

        const user = await User.findById(uid);
        if(!user) {
            throw new Error("User not found");
        }

        if (user._id.toString() !== req.usuario._id.toString()){
            throw new Error("You can't update this profile");
        }
    }catch(error){
        throw new Error(error.message);
    }
};

export const userCommentUpdate = async (uid = "", { req }) => {
    try{   
        if (!req.usuario) {
            throw new Error("Usuario no autenticado");
        }

        const comment = await Comment.findById(uid);
        if(!comment) {
            throw new Error("Comment not found");
        }

        if (comment.creator.toString() !== req.usuario._id.toString()){
            throw new Error("You can't update this comment");
        }
    }catch(error){
        throw new Error(error.message);
    }
};

export const userDelete = async (uid = "", { req }) => {
    try{   
        if (!req.usuario) {
            throw new Error("Usuario no autenticado");
        }

        const publication = await Publication.findById(uid);
        if(!publication) {
            throw new Error("Publication not found");
        }

        if (publication.creator.toString() !== req.usuario._id.toString()){
            throw new Error("You can't delete this post");
        }
    }catch(error){
        throw new Error(error.message);
    }
};

export const userCommentDelete = async (uid = "", { req }) => {
    try{   
        if (!req.usuario) {
            throw new Error("Usuario no autenticado");
        }

        const comment = await Comment.findById(uid);
        if(!comment) {
            throw new Error("Comment not found");
        }

        if (comment.creator.toString() !== req.usuario._id.toString()){
            throw new Error("You can't delete this comment");
        }
    }catch(error){
        throw new Error(error.message);
    }
};