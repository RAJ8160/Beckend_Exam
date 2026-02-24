import { Ticket } from "../models/tickets.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTicket = asyncHandler(async (req,res)=>{
    const {title,description,priority} = req.body

    if(!title || !description || !priority){
        throw new ApiError(400,"All Fileds are required!")
    }

    const ticket = await Ticket.create({
        title,
        description,
        priority,
        created_by:req.user._id,
        assigned_to:req.user._id
    })
    
    await ticket.populate("created_by assigned_to")

    if(!ticket){
        throw new ApiError(500,"Internal Serverv Error to  Create Ticket!")
    }
    return res.status(200)
              .json(new ApiResponse(201,ticket,"Ticket Created Successfully!"))
})

const getAllTickets = asyncHandler(async(req,res)=>{
    let getAllTickets ;
    if(req.user.role_id.name == "MANAGER"){
    getAllTickets = await Ticket.find({}).populate("created_by assigned_to")
    }
    else if(req.user.role_id.name == "SUPPORT"){
    getAllTickets = await Ticket.find({assigned_to:req.user._id}).populate("created_by assigned_to")
    }
    else{
    getAllTickets = await Ticket.find({created_by:req.user._id}).populate("created_by assigned_to")
    }
    return res.status(200)
    .json(new ApiResponse(200,getAllTickets,"All Tickets Fetch Successfully!"))
})


const updateticketassignInfo = asyncHandler(async(req,res)=>{
      const{id} = req.params
      const {userId} = req.body
      if(!id){
        throw new ApiError(400,"Id require for Update");
      }

      if(!userId){
        throw new ApiError(400,"userId require for Update");
      }
      const updatedTickets = await Ticket.findByIdAndUpdate({
        _id:id
      },
        {assigned_to:userId}
      ,{
        new:true
      })
    
    return res.status(200).
    json(new ApiResponse(200,updatedTickets,"All tickets Updated Successfully!"));

})

const updateticketStatus = asyncHandler(async(req,res)=>{
      const{id} = req.params
      const{status} = req.body
      if(!id){
        throw new ApiError(400,"Id require for Update");
      }

      if(!status){
        throw new ApiError(400,"status require for Update");
      }
     const updatedTickets =  await Ticket.findByIdAndUpdate({
        _id:id
      },
         {status}
      ,{
        new:true
      })
    
    return res.status(200).
    json(new ApiResponse(200,updatedTickets," ticket's status Updated Successfully!"));

})

const deleteTickets = asyncHandler(async(req,res)=>{
      const{id} = req.params
     const deletedTickets =  await Ticket.findByIdAndDelete({
        _id:id
      })
    
    return res.status(200).
    json(new ApiResponse(200,deletedTickets," Ticket Deleted Successfully!"));

})
export {createTicket,getAllTickets,updateticketassignInfo,updateticketStatus,deleteTickets}