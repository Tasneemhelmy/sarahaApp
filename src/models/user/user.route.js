import { Router } from "express";
import * as userController from './controller/user.controller.js'
import { auth } from "../../middelware/auth.js";
import roles from "../../Utlis/Roles.js";
import { customVaildation, uploads } from "../../Utlis/multer.js";
import vaildateSchema from "../../middelware/vaildate.js";
import changePassSchema from "./changePassSchema.js";
import messageSchema from "../massage/messageScema.js";

const router=Router()

router.get('/confirm',userController.confirmDisplay)
    .get('/confirm/:token',userController.confirmAction)
    .get('/profile',auth([roles.User]),userController.displayProfile)
    .get('/profile/:id',userController.displayShareProfile)
    .post('/Uploade',auth([roles.User]),uploads(customVaildation.image).single('image')
            ,userController.aploadeImage)
    .get('/logOut',userController.logOut)
    .get('/forgetPass',userController.DisplayforgetPassword)
    .post('/forgetPass',userController.forgetPass)
    .get('/resetCode',userController.displayResetCode)
    .post('/confirmCode/:id',userController.confirmCode)
    .get('/newPass',userController.displayNewPass)   
    .post('/:id',vaildateSchema(changePassSchema,"/user/newPass"),userController.changePass)

export default router   