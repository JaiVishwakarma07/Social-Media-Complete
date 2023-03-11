import express from "express"
import { getCommnets, addComment } from "../controllers/comment.js"

const router = express.Router()

router.get("/", getCommnets)
router.post("/", addComment);

export default router