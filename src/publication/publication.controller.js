'use strict'

import Publication from "./publication.model.js";
import Category from "../category/category.model.js";
import User from "../user/user.model.js";

export const addPublication = async (req, res) =>{
    try{
        const data = req.body;

        const category = await Category.findOne({ category: data.category});

        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        const publication = new Publication({
            ...data,
            category: category._id,
            creator: req.usuario._id,
        });

        await publication.save();

        const creatorPublication = await Publication.findById(publication._id).populate('creator', 'username');

        res.status(200).json({
            success: true,
            creatorPublication
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error publishing",
            error: error.message
        })
    }
}

export const getPublication = async (req, res) => {
    try{
        const {limite = 5, desde = 0} = req.query
        const query = {}

        const [total, publications ] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .populate('creator', 'username -_id') 
                .populate('category', 'nameCategory -_id')
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            publications
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error getting list of publications",
            error: error.message
        })
    }
}

export const updatePublication = async(req, res) => {
    try{
        const {uid} = req.params;
        const { ...data} = req.body;

        const publication = await Publication.findByIdAndUpdate(uid, data, {new: true});

        res.status(200).json({
            success: true,
            message: 'Update Pubication',
            publication,
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error updating publication',
            error: error.message
        })
    }
}

export const deletePublication = async(req, res) => {
    try{
        const { uid } = req.params;

        const publication = await Publication.findByIdAndDelete(uid);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found",
            });
        }

        res.status(200).json({
            success: true,
            message: 'Delete Publication',
            publication,
        })   
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error deleting publication',
            error: error.message
        })
    }
}

