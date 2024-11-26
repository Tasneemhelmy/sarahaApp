import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../../../../DB/Models/User.model.js'
import sendEmail, { createHtml } from '../../../Utlis/sendEmail.js'




export const displaySignUp=(req,res,next)=>{
    //console.log(req.flash("error")[0])
        res.render('signUp',{
        title: 'SignUp',
        css:"../shared/css/style.css",
        js:"../shared/js/main.js",
        error:req.flash("error")[0],
        vaildationErorr:req.flash("vaildationErorr")[0],
        data:req.flash("data")[0]
    })
    req.session.destroy()
    return
}

export const signupAction=async(req,res,next)=>{
    const{email,password}=req.body
    const token=jwt.sign({email},process.env.TOKEN_KEY)
    const html=createHtml(token)
    const send=sendEmail({to:email,html})
    if(!send){
        req.flash("error","failed to send email")
        req.flash("data",req.body)
        return res.redirect("/auth/signUp")
    }
    const hashPass=bcryptjs.hashSync(password,9)
    req.body.password=hashPass
    const user=await User.create(req.body)
    res.redirect('/user/confirm')


}
//------------------------------------------------------------------


export const loginDisblay=(req,res,next)=>{
        res.render('login',{
        title: 'Login',
        css:"../shared/css/style.css",
        js:"../shared/js/main.js",
        error:req.flash("error")[0],
        vaildationErorr:req.flash("vaildationErorr")[0],
        data:req.flash("data")[0],
        changePass:req.flash("changePass")[0],

    })
    req.session.destroy()
    return
}

export const loginAction=async(req,res,next)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        req.flash("error","Please signUp First😤")
        req.flash("data",req.body)
        return res.redirect("/auth/logIn")
    }
if(!user.confirmEmail){
    req.flash("error","Please Confirm Email First😤")
    req.flash("data",req.body)
    return res.redirect("/auth/logIn")
}
const isMatch=bcryptjs.compareSync(password,user.password)
if(!isMatch){
    req.flash("error","Invaild Email Or Password😤")
    req.flash("data",req.body)
    return res.redirect("/auth/logIn")
}
user.status="Online"
await user.save()
req.session.user={
    _id:user._id.toString(),
    name:user.name,
    email:user.email,
    role:user.role
}
return res.redirect('/user/profile')

}