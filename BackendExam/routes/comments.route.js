import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware";
import { role } from "../middlewares/roleMiddleware";
import { deleteComment, updateComment } from "../controllers/comment.controller";

const CommentRouter = express.Router();

CommentRouter.patch("/:id",verifyJWT,role('MANAGER','SUPPORT'),updateComment)
CommentRouter.delete("/:id",verifyJWT,role('MANAGER','SUPPORT'),deleteComment)
export default CommentRouter