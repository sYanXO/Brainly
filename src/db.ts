import mongoose, { model, Mongoose, Schema } from "mongoose";
mongoose.connect("mongodb+srv://sYan:qTAYM3EaEM9qwdi8@cluster0.j59zvyi.mongodb.net/Brainly");
const userSchema = new Schema({
    username: {type:String,unique:true},
    password: String
})

export const userModel = model("User",userSchema);

const contentSchema = new Schema({
    title : String,
    link : String,
    tags : [{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId : [{type:mongoose.Types.ObjectId, ref:'User', required :true}]
})
export const contentModel = model("Content",contentSchema);



