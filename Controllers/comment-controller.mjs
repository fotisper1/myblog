import {User,Post,Comments} from '../model/db.mjs'
import mongoose, { model } from "mongoose";
import { notice } from './user-controller.mjs';
//Test. Dimiourgei ena sxolio kai to isagei ston pinaka comments, me dedomena to sxolio.to id tou user kai to id tou post
export const makeComment= async (req,res)=>{
    let comment=req.body.comment 
    let userid= req.params.userid
    let postid=req.params.postid
    try{
        let com= await Comments.create({commenttext:comment,likecounter:1,commentuser:userid,compost:postid})
        if(com){
            await notice(postid)
            res.status(200).json({comment:comment,success:true})
        }
        else{
            res.status(400).json({message:'den mporese na prostethei to sxolio',success:false})
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}
//δεχεται ως ορισμα το id του comment και αυξανει τα λαικ
export const likeComment= async (req,res)=>{
    try{
        let commentid=req.params.commentid
        let com=await Comments.findOneAndUpdate({_id:commentid},{$inc:{likecounter:1}})
        if(com){
            res.status(200).json({likecounter:com.likecounter,success:true})
        }
        else{
            res.status(400).json({message:'den mporese na ginei to laik',success:false})
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}
//pairnei os dedomeno to id tou sxoliou kai to diagrafei, epistrefei true an ola pigan sosta
export const deleteComment= async (req,res)=>{
    let commentid=req.params.commentid
    if(commentid!=null){
        try{
            let aelole=await Comments.deleteOne({_id:commentid})
            if(aelole){
                console.log(aelole)
                res.status(200).json({message:'to comment diagrafthike',success:true})
            }
            else{
                res.status(401).json({message:'den itan dynati i diagrafti tou comment',success:false})
            }
        }
        catch(error){
            res.status(500).json({message:error.message})
        }
    }
    else{
        res.status(404).json({message:'den vrethike sxolio me auto to id',success:false})
    }
}
//ταξινομει τα comments με βαση την χρονολογια της δημοσιευσης των comments, πρωτα εμφανιζονται
export const allCommentsByDate= async(req,res)=>{
    let postid=req.params.postid
    try{
        let coms= await Comments.find({compost:postid}).sort({createdat:'asc'})
        if(coms){
            res.json({comments:coms,success:false})
        }
        else{
            res.json({message:'Does not exist comments in this post',success:false})
        }
    }
    catch(err){
        res.json({message:err.msg,success:false})
    }
}
export const myComments= async (req,res)=>{
    let user=req.params.userid
    try{
        let comments= await Comments.find({usercreated:user}).sort({createdat:'desc'}).limit(5)
        if(comments){
            res.status(200).json({comments:comments,success:true})
        }
        else{
            res.status(404).json({message:'den exeis kanei kanena sxolio',success:false})
        }
    }catch(err){
        res.status(500).json({message:err.message,success:false})
    }
}
export const allCommentsByLike= async (req,res)=>{
    let postid=req.params.postid
try{
    let coms= await Comments.find({compost:postid}).sort({likecounter:'desc'}).limit(5)
    if(coms){
        res.status(200).json({comments:coms,success:true})
    }
    else{
        res.status(400).json({message:'den yparxoun sxolia se auto to post'})
    }
}
catch(err){
    res.status(500).json({error:err.message})
}
}