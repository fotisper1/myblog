import express from "express";
import { authenticateToken } from "../middleware/authmidlleware/auth-middleware.mjs";
import { addUser,changeProfil,loginUser } from "../Controllers/user-controller.mjs";
import { RegisterValidator } from "../middleware/ValidatorMiddleware/user-validation.mjs";

const userrouter= express.Router();

userrouter.post('/login',loginUser)

userrouter.post('/register',RegisterValidator,addUser)

userrouter.get('/logout')

userrouter.get('/myprofil')

userrouter.put('/myprofil/:userid',authenticateToken,changeProfil)

export default userrouter