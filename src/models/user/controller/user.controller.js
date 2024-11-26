import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { customAlphabet } from "nanoid"
import User from "../../../../DB/Models/User.model.js"
import sendEmail from "../../../Utlis/sendEmail.js"



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

export const DisplayforgetPassword=async(req,res,next)=>{
    return res.render('forgetPass',{
        title: 'forgetPass',
        css:"../../shared/css/style.css",
        js:"../../shared/js/main.js",
        status:req.flash("status")[0],
    })
}

export const forgetPass=async(req,res,next)=>{
    const{email}=req.body
    const user=await User.findOne({email})
    if(!user){
        req.flash("status","Sorry, we couldn't find an account associated with this email address'.Please make sure you`ve entered the correct email or consider signing up for a new account")
        return res.redirect('/user/forgetPass')
    }
const rundomNum=customAlphabet('0123456789',6)
const otp=rundomNum()
user.OTP=otp
await user.save()
sendEmail({to:email,html:`<h1>${otp}</h1>`})
req.flash("user",user)
return res.redirect('/user/resetCode')

}
//------------------------------------------------

export const displayResetCode=(req,res,next)=>{
        return res.render('OTP',{
        title: 'OTP',
        css:"../../shared/css/style.css",
        js:"../../shared/js/main.js",
        user:req.flash("user")[0],
        error:req.flash("error")[0]
    })
}

export const confirmCode=async(req,res,next)=>{
    const{id}=req.params
    const {one,two,three,four,five,six}=req.body
    const code=one+two+three+four+five+six
    const user=await User.findById(id)
    if(user.OTP!==code){
        req.flash("user",user)
        req.flash('error',"Invaild Code")
        return res.redirect('/user/resetCode')
    }
    user.OTP=null
    await user.save()
    req.flash("user",user)
    return res.redirect('/user/newPass')
}
//----------------------------------------

export const displayNewPass=(req,res,next)=>{
    return res.render('newPass',{
        title: 'New Password',
        css:"../../shared/css/style.css",
        js:"../../shared/js/main.js",
        user:req.flash("user")[0],
        error:req.flash("error")[0],
        vaildationErorr:req.flash("vaildationErorr")[0]
    })
}

export const changePass=async(req,res,next)=>{
    const{id}=req.params
    const{password,repeatPass}=req.body
    const user=await User.findById(id)
    const hashPass=bcryptjs.hashSync(password,9)
    user.password=hashPass
    await user.save()
    req.flash("user",user)
    req.flash("changePass","change password successfully")

    return res.redirect('/auth/login')

}

