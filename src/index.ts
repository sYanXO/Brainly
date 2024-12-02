import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { contentModel, userModel } from './db';
import { userMiddleware } from './middleware';
const JWT = "123123";
const app = express();
app.use(express.json());
// auth routes
app.post("/api/v1/signup",async (req,res)=> {
    // add zod validaton
    const username = req.body.username;
    const password = req.body.password;

    try{
        await userModel.create({
            username: username,
            password: password // hash this before storing
        })
    
        res.json({ // add the logic and the error code if the user already exists
            msg: "user added"
        })
    }
    catch(e){
        res.status(411).json({
            msg : "User already exists"
        })
    }
    
})

app.post("/api/v1/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        const existingUser = await userModel.findOne({
            username,
            password
        })
        if (existingUser){
            const token = jwt.sign({
                id: existingUser._id
            },JWT)
            res.json({
                token
            })
        }
        else{
            res.status(403).json({
                msg: "User DNE"
            })
        }
    }
    catch(e){
        res.json({
            msg: "server chud gya guru"
        })
    }
    const existingUser = await userModel.findOne({
        username,
        password
    })
})

// content routes

app.post("/api/v1/content",userMiddleware,async (req,res)=>{
    const link = req.body.link;
    const type = req.body.type;

    await contentModel.create({
        link,
        type,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    res.json({
        msg : "added your content!"
    })
})

app.get("/api/v1/content",userMiddleware,async(req,res)=>{
    // @ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId","username");
    res.json({
        content
    })
})

app.delete("/api/v1/content",userMiddleware,async (req,res)=>{
    const contentId = req.body.contentId;
    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        msg : "brain deleted"
    })
})
// sharing route

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{

})

app.listen(3000);