import { Router } from "express";
import { addUser, getAllUsers, logInUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { role } from "../middlewares/roleMiddleware.js";

const router = Router()

// router.route("/register").post(upload.fields([{
//     name: "avatar"
//     , maxCount: 1
// },
// {
//     name: "coverImage",
//     maxCount: 1
// }]),
//     registerUser)

router.post("/register",registerUser)
router.post("/login",logInUser)

//Secure Route
router.post("/",verifyJWT,role('MANAGER'),addUser)
router.get("/",verifyJWT,role('MANAGER'),getAllUsers)
export default router