import { check, validationResult } from "express-validator";



export const validateUser=[
    check("username")
    .trim()
    .not()
    .isEmpty()
    
    .isLength({ min:5 , max: 25})
    ,
    check("email").normalizeEmail().isEmail()
    
    ,check("password")
    .trim()
    .not()
    .isEmpty()
    
    .isLength({ min:8 })
    
];


export const validate =(req,res,next)=>{
    const error =validationResult(req).array()

    if(!error.length) return next()

    res.status(400).json({success:false, error: error[0].msg})
}