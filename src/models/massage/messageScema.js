import joi from "joi";


const  messageSchema=joi.object({
    content:joi.string().required(),   
}).required()

export default messageSchema