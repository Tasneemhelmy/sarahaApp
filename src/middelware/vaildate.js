import  User from '../../DB/Models/User.model.js'

const vaildateSchema=(Schema,url)=>{
    return  async(req,res,next)=>{
        const objects={
            ...req.body,
            ...req.params,
            ...req.query
        }
        if(req.file){
            objects.file={...req.file}
        }
        if(req.files){
            objects.files={...req.files}
        }
        const {error}=Schema.validate(objects,{abortEarly:false})
            if((error)){
            const vaildationErorr=[]
            for (const element of error.details) {
                vaildationErorr.push(element.path[0])
            }
            const user=await User.findById(req.params.id)
            // console.log(user)

            // console.log(vaildationErorr)
            req.flash('vaildationErorr',vaildationErorr)
            req.flash('data',req.body)
            req.flash('user',user)
            return res.redirect(url)
            
        }
        return next()
    }
}
export default vaildateSchema