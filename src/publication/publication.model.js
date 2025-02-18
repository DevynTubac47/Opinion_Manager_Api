import { Schema, model } from "mongoose";

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