import express from "express"
import { createRole, getAllRoles } from "../controllers/role.controller.js";

const roleRouter = express.Router();

roleRouter.get("/",getAllRoles)
roleRouter.post("/addRole",createRole)
export default roleRouter