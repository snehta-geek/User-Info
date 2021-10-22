import express from 'express';
import multer from "multer"
import { updatedUserData,userData } from './userInfoApi.js';



const userInfoRouter=express.Router();

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage:fileStorageEngine}).single('file')

userInfoRouter.post('/add-user',upload,userData)
userInfoRouter.put('/update-user/:id',upload,updatedUserData)

export default userInfoRouter;