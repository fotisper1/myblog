import express from "express";
import { authenticateToken } from "../middleware/authmidlleware/auth-middleware.mjs";
import { addUser,changeProfil,loginUser } from "../model/user-controller.mjs";
import { RegisterValidator } from "../middleware/user-validation.mjs";

const userrouter= express.Router();

userrouter.post('/login',loginUser)

userrouter.post('/register',RegisterValidator,addUser)

userrouter.get('/logout')

userrouter.get('/myprofil')

userrouter.put('/myprofil/:userid',authenticateToken,changeProfil)

export default userrouter