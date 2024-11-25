import * as messageController from './controller/massage.controller.js'
import { Router } from "express";
import { auth } from "../../middelware/auth.js";
import roles from "../../Utlis/Roles.js";
import vaildateSchema from '../../middelware/vaildate.js';
import messageSchema from './messageScema.js';

const router=Router()
router.get('/messages',auth([roles.User]),messageController.displayMessage)
    .post('/send/:id',messageController.sendMessage)
    .get('/:id',auth([roles.User]),messageController.deleteMassage)

export default router  