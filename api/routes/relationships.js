import express from "express"
import { getRelationships, getFriends, addRelationships, deleteRelationships } from "../controllers/relationship.js"

const router = express.Router()

router.get("/", getRelationships)
router.get("/friends", getFriends)
router.post("/", addRelationships)
router.delete("/", deleteRelationships)

export default router