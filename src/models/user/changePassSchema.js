import joi from "joi";

const changePassSchema=joi.object({  
    password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char'),
    repeatPass:joi.string().valid(joi.ref('password')).required(),
    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()


}).required()

export default changePassSchema
