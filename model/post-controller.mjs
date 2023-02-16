import {User,Post,Comments} from './db.mjs'
import mongoose, { model } from "mongoose";
//Test. Dimourgei ena post kai to isagei sto collection Post, eno dexetai os dedomena to title, to keimeno tou post kai ton xristi pou to kanei
export const makePost= async (req,res)=>{
    let posttitle=req.body.title
    let keimeno=req.body.keimeno
    let postmaker=req.params.userid
    let katigoria=req.body.katigoria
    try{
        let post= await Post.create({title:posttitle,periexomeno:keimeno,usercreated:postmaker,category:katigoria})
        //let postkeimeno=await Post.findOne({title:posttitle},{_id:0,periexomeno:1})
        if(post){
            res.status(200).json({post:post,success:true})
        }
        else{
            res.status(400).json({message:'den mporese na prostethei to post'})
        }
    }
    catch(err){
        res.status(500)
    }
}
//δεχεται ως ορισμα το id του post και διαγραφει το post
export const deletePost= async(req,res)=>{
        let postid=req.params.postid
        try{
          let aelole= await Post.deleteOne({_id:postid})
          if(aelole){
                res.status(200).json({message:'to post diagraftike',success:true})
          }
          else{
            res.status(404).json({message:'den vrethike to id kai den egine i diagrafi',success:false})
          }
        }
        catch(error){
            res.status(500).json({message:error.message,success:false})
        }
    }

//ταξινομει τα post με βαση την χρονολογια της δημοσιευσης, πρωτα εμφανιζονται 
export const lastPosts= async (req,res,next)=>{
        try{
            let allposts= await Post.find().sort({createdat:'asc'})
            if(allposts){
                console.log(allposts)
                res.status(200).json({posts:allposts,success:true})
                //res.render("posts",{posts :allposts})
            }
            else{
                console.log("den einai dynati i apeikonisi ton post")
                res.status(401)
            }
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
    }
//ταξινομει τα comments με βαση τον αριθμο των likes, πρωτα εμφανιζονται αυτα με τα πιο πολλα λαικ

export const postsByCategory=async(req,res)=>{
    const category=req.params.katigoria
    try{
        
        const posts= await Post.find({category:category}).sort({createdat:'desc'})
        if(posts){
            res.status(200).json({posts:posts,success:true})
        }
        else{
            res.status(400).json({message:`Does not exist posts in category ${category}`,success:false})
        }
    }
    catch(err){
        res.status(400).json({message:err.message,success:false})
    }
}
//δεχεται ως εισοδο το id του user και ταξινομει τα post με βαση την χρονολογια δημοσιευσης, πρωτα εμφανιζονται τα πιο προσφατα
export const printMyPosts=async(req,res)=>{
    try{
        const userid=req.params.userid
        if(userid){
            let myposts= await Post.find({usercreated:userid}).sort({createdat:'desc'})
            if(myposts){
                res.status(200).json({posts:myposts,success:true})
            }
            else{
                res.status(400).json({message:'You does not have any post',success:false})
            }
        }
        else{
            res.status(404).json({message:'den yparxei xristis me auto to onoma',success:false})
        }
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
export const likePost= async (req,res)=>{
    let postid=req.params.postid
    try{
        let update=await Post.updateOne({_id:postid},{$inc:{likecounter:+1}})
        let likes=update.likecounter
        if(update){
            res.status(200).json({likecounter:likes,success:true})
        }
        else{
            res.status(400).json({message:'den egine laik lathos id',success:false})
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}