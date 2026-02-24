import { Role } from "../models/role.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllRoles = async(req,res)=>{
        const allRoles = await Role.find({});
        if(!allRoles){
            throw new ApiError(500,"Somthing wents wrong new Role not created")
        }
        res.status(200)
            .json(new ApiResponse(200,allRoles,"All Roles Fetched Successfully!"))

}
const createRole = async(req,res)=>{
        const {name} = req.body

        if(!name){
            throw new ApiError(400,"Please Enter Role")
        }

        const newRole = await Role.create({name})
        if(newRole){
           throw new ApiError(400,"Role name already exsists.")  
        }

        return res
            .status(201)
            .json(new ApiResponse(201,newRole,"Role Created Successfully!"))

}

export {getAllRoles,createRole}