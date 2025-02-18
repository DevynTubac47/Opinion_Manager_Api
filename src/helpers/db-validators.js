import User from "../user/user.model.js"
import Publication from "../publication/publication.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const titlePublication = async (title = "") => {
    const existe = await Publication.findOne({title})
    if(existe){
        throw new Error(` There is already a publication with that ${title}`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const publicationExists = async (uid = " ") => {
    const existe = await Publication.findById(uid)
    if(!existe){
        throw new Error("No existe la publicación con el ID proporcionado")
    }
}

export const userUpdate = async (uid = "", { req }) => {
    try{   
        if (!req.usuario) {
            throw new Error("Usuario no autenticado");
        }

        const publication = await Publication.findById(uid);
        if(!publication) {
            throw new Error("Publication not found")
        }

        if (publication.creator.toString() !== req.usuario._id.toString()){
            throw new Error("You can't update this post")
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export const userDelete = async (uid = "", { req }) => {
    try{   
        if (!req.usuario) {
            throw new Error("Usuario no autenticado");
        }

        const publication = await Publication.findById(uid);
        if(!publication) {
            throw new Error("Publication not found")
        }

        if (publication.creator.toString() !== req.usuario._id.toString()){
            throw new Error("You can't delete this post")
        }
    }catch(error){
        throw new Error(error.message)
    }
}