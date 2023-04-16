import express from "express"
import { getMessage, addMessage } from "../controllers/message.js"

const router = express.Router()

router.get("/:cid", getMessage)
router.post("/", addMessage)

export default router