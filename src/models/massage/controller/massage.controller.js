import Massage from "../../../../DB/Models/message.model.js"
import User from "../../../../DB/Models/User.model.js"
import vaildateSchema from "../../../middelware/vaildate.js"
import messageSchema from "../messageScema.js"





export const displayMessage=async(req,res,next)=>{
    const user=await User.findById(req.session?.user._id)
    const messages=await Massage.find({receiverId:req.session?.user._id})
    return res.render('message',{
        title: 'massge',
        css:"../shared/css/style.css",
        js:"../shared/js/main.js",
        user,
        link:`http://localhost:5000/user/profile/${user._id}`,
        messages

    })
}


export const sendMessage=async(req,res,next)=>{
    const{id}=req.params
    const {content}=req.body
    const user=await User.findById(id)
    if(!user){
        req.flash('status',"Invaild ACC")      
        return res.redirect(`/user/profile/${user._id}`)
    }
    await Massage.create({
        content,
        receiverId:user._id
    })
    req.flash('status',"Adedd successfully")
    return res.redirect(`/user/profile/${user._id}`)

}


export const deleteMassage=async(req,res,next)=>{
    const{id}=req.params
    const massage=await Massage.deleteOne({_id:id ,receiverId:req.session?.user._id})
    return res.redirect('/message/messages')
}