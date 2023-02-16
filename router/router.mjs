/*import express, { json } from "express";
import { sendemail } from "../model/emailsender.mjs";
import {User,Post,Comments} from './../model/db.mjs'
import {adduser,loginuser,makepost,makecomment,likecomment,likepost,deletecomment,deletepost,AllPosts,AllCommentsByLike,AllCommentsByDate,printmyposts,changeprofil,notice,mycomments,authenticateToken} from './../model/functions.mjs'
import handlebars from "express-handlebars"
import jwt from "jsonwebtoken"
import { logout } from "../model/user-controller.mjs";
const router=express.Router();

router.get('/',(req,res)=>{
    res.render("home")
})

router.get('/',(req,res)=>{
    res.render("home")
})
router.get('/forum', (req,res)=>{
    res.render("home")
})
router.get('/posts/:katigoria',authenticateToken,AllPosts)

router.get('/makecomment',(req,res)=>{
    res.render("makecomment")
})
router.get('/makepost',(req,res)=>{
    res.render("makepost")
})
router.post('/makecomment/:userid/:postid',authenticateToken,makecomment)

router.post('/makepost',authenticateToken,makepost)
router.get('/login',(req,res)=>{
    res.render("login")
})
router.get('/register',(req,res)=>{
    res.render("register")
})
router.post('/login',authenticateToken,loginuser)

router.post('/register',async (req,res)=>{
    res.render("posts")
})
router.delete('/deletecomment/:commentid/:userid',authenticateToken,deletecomment)

router.delete('/deletepost/:postid/:userid',authenticateToken,deletepost)
//den einai etoimo
router.patch('/likepost/:postid/:userid',authenticateToken,likepost)

router.patch('/likecomment/:commentid/:userid',authenticateToken,likecomment)

router.get('/myposts', async (req,res)=>{
    let myposts=await printmyposts(user)
    console.log(myposts)
    res.render("myposts",{posts:myposts})
})
router.get('/myprofil', async (req,res)=>{
    req.body.username=user.name,
    req.body.email=user.email
    res.render("myprofil")

})
router.put('/myprofil/:userid',authenticateToken,changeprofil)
router.get('/logout',logout)
router.get('/allmycomments',mycomments)

export{router}*/

