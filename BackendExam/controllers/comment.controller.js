import { TicketComment } from "../models/ticketComments.model.js";
import { Ticket } from "../models/tickets.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req,res)=>{
    const {id} = req.params

    if(!id){
        throw new ApiError(400,"Please Enter filed id!");
    }

    const ticket  = await Ticket.findById({_id:id})

    if(!ticket){
        throw new ApiError(404,`Ticket not found id ${id}`)
    }
    const{comment} = req.body

    const newComment = await TicketComment.create({
        ticket_id:ticket._id,
        user_id:req.user._id,
        comment
    })

    await newComment.populate("ticket_id user_id")

    return res.status(200)
              .json(new ApiResponse(201,newComment,"Comment Added Successfully!"))

})

const getByTicketId = asyncHandler(async (req,res)=>{
    const {id} = req.params
    if(!id){
        throw new ApiError(400,"Parameter id is Required!")
    }
    
    const comments = await TicketComment.findById({
        ticket_id:id
    }).populate("ticket_id user_id")
    
    if(!comments){
         throw new ApiError(404,"Comments not found!")
    }
    return res.status(200)
            .json(new ApiResponse(200,comments,`All Comments acording to ticket id ${id}`))
    
})

const updateComment = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const {comment} = req.body
    if(!id){
        throw new ApiError(400,"Parameter id is Required!")
    }

    if(!comment){
        throw new ApiError(400,"comment require for update old comment!")
    }

    const comments = await TicketComment.findByIdAndUpdate({
        _id:id
    },{comment}).populate("ticket_id user_id")

    return res.status(200)
            .json(new ApiResponse(200,comments,"Comment Updated Successfully!"))
    
})

const deleteComment = asyncHandler(async (req,res)=>{
    const {id} = req.params
    if(!id){
        throw new ApiError(400,"Parameter id is Required fro delete!")
    }

    const comment = await TicketComment.findById({_id:id})

    if(!comment){
        throw new ApiError(404,"Comment Not found!")
    }

    const comments = await TicketComment.findByIdAndDelete({
        _id:id
    }).populate("ticket_id user_id")

    return res.status(204)
            .json(new ApiResponse(204,{},"Comment Deleted Successfully!"))
    
})
export {addComment,getByTicketId,updateComment,deleteComment}