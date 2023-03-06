import express from 'express'
import { PostValidator } from '../middleware/post-validation.mjs';
import dotenv from "dotenv"
import { lastPosts,makePost,deletePost,likePost,printMyPosts,postsByCategory } from '../Controllers/post-controller.mjs';
import { authenticateToken } from '../middleware/auth-middleware.mjs';
dotenv.config()

const postrouter=express.Router();

postrouter.get('/last',lastPosts)

postrouter.get('/:katigoria',postsByCategory)

postrouter.post('/makepost/:userid',authenticateToken,PostValidator,makePost)

postrouter.delete('/deletepost/:postid/:userid',authenticateToken,deletePost)

postrouter.patch('/likepost/:postid/:userid',authenticateToken,likePost)

postrouter.get('/myposts/:userid',authenticateToken,printMyPosts)

export default postrouter