import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {  asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
//It is Optinal
const registerUser = asyncHandler(async (req,res)=>{
       //get user details from frontend
       //validation -not empty
       //check if user already exsists:username,email
       //create user object - create entry in db 
       //check for user creation
       //return response

       const {name,email,roleName,password} = req.body

       if(
        [name,email,roleName,password].some((field)=>field?.trim() === "")
       ){
        throw new ApiError(400,"All Fields are required");
       }

       const existedUser  = await User.findOne({
        $or:[{name},{email}]
       })

       if(existedUser){
        throw new ApiError(409,"User with Email or userName already exists!")
       }

       const role = await Role.findOne({roleName})

       if(!role){
        throw  new ApiError(400,{},"Role is not valid!");
       }

       const role_id = role._id;
       console.log("RoleId is :",role._id)
       const User1 = await User.create({
        name,
        email,
        role_id,
        password
       })

    return res.status(201).json(
        new ApiResponse(200,User1,"User registterd Successfully")
    )
} )

const logInUser = asyncHandler(async (req,res)=>{
    //Get Data from user
    //Validate user
    //user exist or not
    //set in refreshToken field


    //req body -> data
    //userName or email
    //find the user
    //password check
    //access and refresh token
    //send cookie

    const {email,name,password} = req.body

    if(!name && !email){
        throw new ApiError(400,"userName or email is required")
    }

    const user = await User.findOne({
        $or:[{name},{email}]
    })

    if(!user){
        throw new ApiError(400,"User does not exsits")
    }

    //User is mongodb model it has mongodb methods

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials(Password)")
    }

    const accessToken = await user.generateAccessToken();
    if(!accessToken){
        throw new ApiError(500,"Something went wrong generating refresh and access token");
    }

    // const logedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly:true,
        secure:true//modified only through server
    }

    return res
     .status(200)
    .cookie("accessToken",accessToken,options)
    .json(
            {
               token:accessToken
            }
    )
})

const addUser = asyncHandler(async(req,res)=>{
    //getData From the user
    //validate data
    //check if user already exsists:username,email
    //create user object - create entry in db
    //return response

    const {name,email,password,roleName} = req.body

    // if(
    //     [name,email,roleName,password].some((field)=>field?.trim() === "")
    //    ){
    //     throw new ApiError(400,"All Fields are required");
    //    } or

    if(!name || !email || !password || !roleName){
        throw new ApiError(400,"All Fields are required");
    }

    const user = await User.findOne({$or:[{name},{email}]})
    if(user){
        throw new ApiError(400,"User already exsits for same name or email")
    }

    const role = await Role.findOne({name:roleName})
    console.log(role)
    if(!role){
        throw new ApiError(404,"Entered Role is not Found!")
    }

    const newUser = await User.create({
        name,
        email,
        role_id:role._id,
        password
    }).populate("role_id")
    
    return res.
    status(201)
    .json(new ApiResponse(201,newUser,"User Created Successfully!"));
})

const getAllUsers = asyncHandler(async (req,res)=>{
    const allUser = await User.find({}).populate("role_id").select("-__v")

    if(!allUser){
        throw new ApiError(500,{},"User Data not Found for some reason.")
    }

    res.status(200)
        .json(new ApiResponse(200,allUser,"User data Find Successfully!"))
})
export {registerUser,logInUser,addUser,getAllUsers}