import express from "express"
import { getConversations, addConversations, getSingleConversations } from "../controllers/conversation.js"

const router = express.Router()

router.get("/single/:userId", getSingleConversations)
router.get("/", getConversations)
router.post("/", addConversations)

export default router