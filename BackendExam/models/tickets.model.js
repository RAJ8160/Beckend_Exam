import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is Required"],
        minlength:[5,"Title must be atleast 5 latters"]
    },
    description:{
        type:String,
        minlength:[10,"description must be atleast 10 latters"]
    },
    status:{
        type:String,
        enum:['OPEN','IN_PROGRESS','RESOLVED','CLOSED'],
        default:'OPEN',
    },
    priority:{
        type:String,
        enum:['LOW','MEDIUM','HIGH'],
        default:"MEDIUM"
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"UserId must be required!"]
    },
    assigned_to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    created_at:{
        type:Date,
        defualt:Date.now()
    }

})


export const Ticket = mongoose.model("Ticket",ticketsSchema);