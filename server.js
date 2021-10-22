import express from "express";
import mongoose from 'mongoose';
import userInfoRouter from "./src/userRoute.js";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


mongoose.connect('mongodb://localhost:27017/boardDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

   
app.use('/api',userInfoRouter);

const port = process.env.PORT || 8098;
app.listen(port,()=>console.log("Server started....")); 