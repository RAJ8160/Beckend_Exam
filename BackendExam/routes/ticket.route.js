import mongoose from "mongoose";
import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { role } from "../middlewares/roleMiddleware.js";
import { createTicket, deleteTickets, getAllTickets, updateticketassignInfo, updateticketStatus } from "../controllers/tickets.controller.js";
import { addComment, getByTicketId } from "../controllers/comment.controller.js";

const ticketRouter = express.Router();

ticketRouter.post("/",verifyJWT,role('MANAGER','User'),createTicket)
ticketRouter.get("/",verifyJWT,role('MANAGER','SUPPORT','USER'),getAllTickets)
ticketRouter.patch("/:id/assign",verifyJWT,role('MANAGER','SUPPORT'),updateticketassignInfo)
ticketRouter.patch("/:id/status",verifyJWT,role('MANAGER','SUPPORT'),updateticketStatus)
ticketRouter.delete("/:id",verifyJWT,role('MANAGER','SUPPORT'),deleteTickets)
ticketRouter.post("/:id/comments",verifyJWT,role('MANAGER','SUPPORT','USER'),addComment)
ticketRouter.get("/:id/comments",verifyJWT,role('MANAGER','SUPPORT','USER'),getByTicketId)
export default ticketRouter