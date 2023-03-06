import {User,Post,Comments} from '../model/db.mjs'
import mongoose, { model } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sendEmail } from '../model/emailsender.mjs'
//Test.Kanei eggrafi o user me dedomena to to username,to password, to email kai epistrefei to id tou user.Akomi eisagei ton xristi ston pinaka user
export const addUser= async (req,res)=>{
    let username=req.body.onoma
    let password=req.body.password
    let useremail=req.body.email
    try{
        if (!username || !password)
            res.status(400).json({message:'Λείπει το όνομα ή το συνθηματικό του χρήστη',success:false})
        let flaguser= await User.findOne({$or: [{'name':username},{'email':useremail}]})
        console.log('ti periexei to flaguser:'+flaguser)
        if(flaguser!=null){
            res.status(404).json({message:'Yparxei idi xristis me auto to onoma h email',success:false})
        }
        else{
            const hash = await bcrypt.hash(password, 10)
            let user= await User.create({name:username, password:hash, email:useremail})
            console.log(user._id)
            res.status(201).json({user:user,success:true})
            return user._id
        }
    }
    catch(err){
        res.status(500).json({message:err.message,success:false})
    }
}
//Test. Kanei login to xristi me dedomena to onoma kai ton kodiko, eno epistrefei to id tou iser
export const loginUser=async (req,res)=>{
    let username=req.body.onoma
    let userpassword=req.body.password
    try{
        if(!username || !userpassword){
            //throw new Error("Λείπει το όνομα ή το συνθηματικό του χρήστη")
            res.status(400).json({message:'Λείπει το όνομα ή το συνθηματικό του χρήστη',success:false})
        }
        let user= await User.findOne({name:username})
        if(user==null)
            //throw new Error("Δεν υπάρχει χρήστης με αυτό το όνομα")
            res.status(404).json({message:'Δεν υπάρχει χρήστης με αυτό το όνομα',success:false})
        else{
            let match= bcrypt.compare(userpassword,user.password)
            if(match){
                let data={name:username,userid:user._id}
                const accessToken = generateAccessToken(data)
                const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'10m'})
                //refreshTokens.push(refreshToken)
                res.status(200).json({user:user, accessToken: accessToken, refreshToken: refreshToken,success:true })
                return user._id

            }
            else{
                //throw new Error("Λάθος κωδικός πρόσβασης")
                res.status(401).json({message:'Λάθος κωδικός πρόσβασης',success:false})
                }
        }
    }   

    catch(err){
        res.status(500).json({message:err.message,success:false})
    }
}

//dexetai os dedomena to username,to email kai to id tou xristi, vriski ton user kai allazei ta stoixeia eno epistrefei ton sygkekrimeno xristi
export const changeProfil= async (req,res)=>{
    let username=req.body.onoma
    let emailadress=req.body.email
    let iduser=req.params.userid
    try{
        let user= await User.findByIdAndUpdate(iduser,{name:username,email:emailadress})
        if(user){
            res.status(200).json({user:user,success:true})
        }
        else{
            res.status(400).json({message:'den egine allagi ton stoixeion tou xristi',success:false})
        }
    }
    catch(err){
        res.status(500).json({error:err.message,success:false})
    }
    
}
//δεχεται ως ορισμα το id του post και καλει την συναρτηση E με παραμετρους το email του user που εκανε το post και τον τιτλο
export async function notice(postid){
    let post=await Post.findOne({_id:postid})
    let posttitle= post.title
    console.log(post)
    let idofuserpost=post.usercreated
    let user= await User.findOne({_id:idofuserpost})
    console.log(user)
    let useremail= user.email
    console.log(useremail,posttitle)
    await sendEmail(useremail,posttitle)
    
}
export function generateAccessToken(data){
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
    return accessToken
  }
export const logout= async (req,res)=>{
    try{
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.status(204).json({message:'aposydenthikes epityxos',success:true})

    }
    catch(err){
        res.status(500).json({error:err.message,success:false})
    }
}

