import  { Router } from "express";
import * as authController from './controller/auth.controller.js'
import isExisit from "../../middelware/userExist.js";
import vaildateSchema from "../../middelware/vaildate.js";
import { logInSchema, signUpSchema } from "./authSchema.js";

const router=Router()

router.get('/signUp',authController.displaySignUp)
    .post('/signUp',vaildateSchema(signUpSchema,'/auth/signUp'),isExisit,authController.signupAction)
    .get('/logIn',authController.loginDisblay)    
    .post('/logIn',vaildateSchema(logInSchema,'/auth/logIn'),authController.loginAction)   


export default router   