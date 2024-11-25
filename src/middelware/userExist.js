import User from "../../DB/Models/User.model.js"


const  isExisit=async(req,res,next)=>{
        const {email}=req.body
        const exist=await User.findOne({email})
        if(exist){
            req.flash("error","User Already Has an Account🤐")
            req.flash("data",req.body)
            return res.redirect("/auth/signUp")
        }
    
        next()
    }



export default isExisit