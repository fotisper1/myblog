import { text } from "express";
import mongoose, { model } from "mongoose";
const UserSchema= new mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true}
}) 
const CommentsSchema= mongoose.Schema({
    commenttext:String,
    createdat:{
        type:Date,
        default:()=>Date.now()
    },
    likecounter:{
        type:Number,
        default:0
    },
    commentuser:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
    },
    compost:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Post"
    },
})
const PostSchema= mongoose.Schema({
    title:String,
    createdat:{
        type:Date,
        default:()=> Date.now()
    },
    usercreated: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    periexomeno:String,
    commentspost: CommentsSchema,
    category:{
        type:String,
        required:true
    },
    likecounter:{
        type:Number,
        default:0
    }
})


var User= mongoose.model('User',UserSchema)
var Post= mongoose.model('Post',PostSchema)
var Comments= mongoose.model('Comments',CommentsSchema)
export {User,Post,Comments}