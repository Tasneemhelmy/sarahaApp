import User from "../../DB/Models/User.model.js"



export const auth=(roles)=>{
    return async(req,res,next)=>{
        if(!req.session?.user?._id){
            req.flash("error","Invaild Session")
            return res.redirect("/auth/logIn")
        }
        const user=await User.findById({_id:req.session.user._id})
        if(!user){
            req.flash("error","Invaild Account")
            return res.redirect("/auth/sigUp")
        }
        if(roles && !roles.includes(req.session.user.role)){
            req.flash("error","You dont have permission to access this page")
            return res.redirect("/auth/logIn")

        }
        next()
    }
}
