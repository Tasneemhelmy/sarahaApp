import { Router } from "express";
import * as userController from './controller/user.controller.js'
import { auth } from "../../middelware/auth.js";
import roles from "../../Utlis/Roles.js";
import { customVaildation, uploads } from "../../Utlis/multer.js";

const router=Router()

router.get('/confirm',userController.confirmDisplay)
    .get('/confirm/:token',userController.confirmAction)
    .get('/profile',auth([roles.User]),userController.displayProfile)
    .get('/profile/:id',userController.displayShareProfile)
    .post('/Uploade',auth([roles.User]),uploads(customVaildation.image).single('image')
            ,userController.aploadeImage)
    .get('/logOut',userController.logOut)

export default router   