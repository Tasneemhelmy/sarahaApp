import dotenv from "dotenv";
import session from "express-session";
import mongoDBStore from "connect-mongodb-session";
import connected from "../DB/connection.js";
import authRouter from './models/auth/auth.route.js'
import userRouter from './models/user/user.route.js'
import messageRouter from './models/massage/massage.route.js'
import flash from "express-flash";

const bootstrap=(app,express)=>{
    var MongoDBStore=mongoDBStore(session)
    var store = new MongoDBStore(
        {
            uri: "mongodb://127.0.0.1:27017/sarahaApp",
            collection: 'Sessions'
        })

    app.use(express.urlencoded({extended:true}))
    app.set('view engine','ejs')
    app.set('views','./src/views')
    app.use('/shared',express.static('./src/views/shared'))
    app.use('/uploads',express.static('uploads'))
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store
        }))
    app.use(flash())

    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/message',messageRouter)
    app.get('/',(req,res,next)=>{
        res.render('index',{
            title:'Saraha',
            css:"./shared/css/style.css",
            js:"/shared/js/main.js"
        })
        req.session.destroy()
        return
    })
    dotenv.config()  
    connected()  

}


export default bootstrap