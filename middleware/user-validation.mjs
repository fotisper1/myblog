import { check,validationResult } from "express-validator";
export const RegisterValidator=[
    check('onoma','This name is not valid').trim().isString().notEmpty().isLength({min:4,max:15}),
    check('password','This password is not strong').trim().isString().notEmpty().isStrongPassword().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,),
    check('email','This email does not exist').trim().isString().notEmpty().isEmail(),
    async (req,res,next)=>{
        const errors=validationResult(req)
        if(errors.isEmpty()){
            next()
        }
        else{
            let myerrors=errors.array()
            res.status(400).json({message:myerrors[0].msg,success:false})
        }
    }
]