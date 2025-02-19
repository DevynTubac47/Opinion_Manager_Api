import { Router } from "express";
import { createdCommentValidator, deleteCommentValidator, updateCommentValidator } from "../middlewares/comment-validators.js";
import { addComment, deleteComment, getCommentbyPublication, updateComment } from "./comment.controller.js";
import { deleteCategory } from "../category/category.controller.js";

const router = Router()

router.post("/publication/:uid/addComment", createdCommentValidator, addComment)
router.get("/publication/:uid/comments", getCommentbyPublication)
router.patch("/updateComment/:uid", updateCommentValidator, updateComment)
router.delete("/deleteComment/:uid", deleteCommentValidator, deleteComment)

export default router;