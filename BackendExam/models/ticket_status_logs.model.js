import mongoose from "mongoose";

const ticketStatusLogsSchema = new mongoose.Schema({
    ticket_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ticket"
    },
    old_status:{
        enum:('OPEN','IN_PROGRESS','RESOLVED','CLOSED'),
        required:[true,"Old Status field is required!"]
    },
    new_status:{
        enum:('OPEN','IN_PROGRESS','RESOLVED','CLOSED'),
        required:[true,"Old Status field is required!"]
    },
    changed_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    changed_at:{
        type:Date,
        default:Date.now()
    }
})

export const TicketStatusLogs = mongoose.model("TicketStatusLogs",ticketStatusLogsSchema)