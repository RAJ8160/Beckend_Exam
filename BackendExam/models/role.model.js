import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"RoleName is required field"],
        unique:true,
        enum:['MANAGER','SUPPORT','USER'] 
    }
})

export const Role = mongoose.model("Role",roleSchema)