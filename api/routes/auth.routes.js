import express from 'express'
import { signin, signup,google,signout,createRequest,getRequetsByCustomerId,allitems,google1 } from '../controllers/auth.controller.js';


const router=express.Router();

router.post("/signup",signup)//register
router.post("/signin",signin)//login
router.post("/google",google)
router.post("/google1",google1)
router.get('/signout',signout)


router.post("/createRequest",createRequest)
router.get("/user/:id",getRequetsByCustomerId)//for data fetch from user id
router.get("/users/items",allitems)

export default router