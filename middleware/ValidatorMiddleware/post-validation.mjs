import {body,check,validationResult} from 'express-validator' 
export const PostValidator=[
    check('title','The title must be until 25 characters').notEmpty().isString().isLength({max:25}),
    check('keimeno','The text can have up to 300 characters').notEmpty().isString().isLength({max:300}),
    async(req,res,next)=>{
        const errors=validationResult(req)
        if(errors.isEmpty()){
            next()
        }
        else{
            let myerrors=errors.array()
            res.json({message:myerrors[0].msg,success:false})
        }
    }
]
