import express from "express"
import { getStories, addStory, deleteStory, getSingleStories } from "../controllers/story.js"

const router = express.Router()

router.get("/", getStories)
router.get("/:id", getSingleStories)
router.post("/", addStory)
router.delete("/:id", deleteStory)

export default router