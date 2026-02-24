import mongoose from "mongoose";

const ticketCommentSchema = new mongoose.Schema({
    ticket_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ticket"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

export const TicketComment = mongoose.model("TicketComment",ticketCommentSchema)