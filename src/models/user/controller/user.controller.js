import jwt from "jsonwebtoken"
import User from "../../../../DB/Models/User.model.js"



    //--------confirm email

export const confirmDisplay=(req,res,next)=>{
    return res.render('confirmEmail',{
        title: 'confirm',
        css:"../shared/css/style.css",
        js:"../shared/js/main.js"
    })
}

export const confirmAction=async(req,res,next)=>{
    const{token}=req.params
    const payload=jwt.verify(token,process.env.TOKEN_KEY)
        await User.findOneAndUpdate({email:payload.email},{confirmEmail:true})
        return res.redirect('/auth/logIn')
}
//-------------------------------------------------------------

export const displayProfile=async(req,res,next)=>{
    const user=await User.findById(req.session?.user._id)
    return res.render('profile',{
        title: 'profile',
        css:"../shared/css/style.css",
        js:"../shared/js/main.js",
        user,
        link:`http://localhost:5000/user/profile/${user._id}`,
    })
}

export const displayShareProfile=async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    return res.render('shareProfile',{
        title: 'shareProfile',
        css:"../../shared/css/style.css",
        js:"../../shared/js/main.js",
        user,
        status:req.flash("status")[0],
        vaildationErorr:req.flash("vaildationErorr")[0]
    })
}

export const aploadeImage=async(req,res,next)=>{
    const{_id}=req.session.user
    req.body.image=req.file?.filename
    const user=await User.findById(_id)
    user.image=req.body.image
    // console.log(user.image)
    await user.save()
    return res.redirect('/user/profile')

}

//----------------------------------------------------------

export const logOut=async(req,res,next)=>{   
    const{_id}=req.session.user
    await User.findByIdAndUpdate(_id,{status:"Offline"})
    req.session.destroy()
    return res.redirect('/auth/logIn')
}
//-------------------------------------------------------


