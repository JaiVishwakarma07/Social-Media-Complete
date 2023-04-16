import express from "express"
import { getUser, updateUser, getSearch } from "../controllers/user.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get("/search", getSearch)

export default router