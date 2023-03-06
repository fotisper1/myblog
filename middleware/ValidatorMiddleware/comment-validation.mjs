import { check,validationResult } from "express-validator"
export const CommentValidator=[
    check('comment','The comment must be until 50 characters').trim().notEmpty().isString().isLength({max:50}),
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
export default CommentValidator
