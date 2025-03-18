import express from 'express'
import { create_messsage ,send_email} from '../controllers/message.controller.js';

const router=express.Router();
router.post("/create_messsage",create_messsage)

router.post("/send_email",send_email)


export default router