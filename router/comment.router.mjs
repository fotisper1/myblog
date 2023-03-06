import express from 'express'
import CommentValidator from '../middleware/ValidatorMiddleware/comment-validation.mjs';
import { authenticateToken } from '../middleware/authmidlleware/auth-middleware.mjs';
import { makeComment,deleteComment,likeComment,myComments,allCommentsByDate,allCommentsByLike } from '../model/comment-controller.mjs';

const commentrouter=express.Router();

commentrouter.post('/makecomment/:userid/:postid',authenticateToken,CommentValidator,makeComment)

commentrouter.delete('/deletecomment/:commentid/:userid',authenticateToken,deleteComment)

commentrouter.patch('/likecomment/:commentid/:userid',authenticateToken,likeComment)

commentrouter.get('/allmycomments/:userid',authenticateToken,myComments)

commentrouter.get('/commentsbylike/:postid',allCommentsByLike)

commentrouter.get('/commentsbydate/:postid',allCommentsByDate)

export default commentrouter