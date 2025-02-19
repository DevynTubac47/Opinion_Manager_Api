import { Schema, model } from "mongoose";

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