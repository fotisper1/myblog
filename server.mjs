import express from "express";
//import {router} from './router/router.mjs'
import mongoose from "mongoose";
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import userrouter from './router/user.router.mjs'
import postrouter from './router/post.router.mjs'
import commentrouter from './router/comment.router.mjs'
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser:true })
import cors from 'cors'

const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
//app.engine('hbs', engine({ extname: ".hbs" }))
//app.set('view engine', 'hbs')
app.get((req,res)=>{
    res.render("home")
})
app.use('/user',userrouter)
app.use('/post',postrouter)
app.use('/comment',commentrouter)

app.listen(3000,()=>{
    console.log("i efarmogi xekinise")
})
