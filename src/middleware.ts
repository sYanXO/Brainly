import { NextFunction, Request,Response } from "express"
import jwt from "jsonwebtoken";
const JWT = "123123";

export const userMiddleware  = (req:Request,res:Response,next:NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string,JWT);

    if (decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json("You are not logged in")
    }
}