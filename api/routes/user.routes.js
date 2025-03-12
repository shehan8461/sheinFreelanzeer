import express from 'express'
import { test, updateUser,deleteUser,updateItem,deleteRequest,getItem } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();

router.get('/',test)
router.post("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)




//Requests
router.delete("/deleteRequest/:id",verifyToken,deleteRequest)
router.get('/getitem/:id', getItem);//for update fetch data
router.put("/updateitem",verifyToken,updateItem)






export default router