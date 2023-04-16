import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const addConversations = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = "INSERT INTO conversations (`user1`,`user2`) VALUES (?)"
        const values = [
            userInfo.id,
            req.body.user2
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("conversation created");
        })
    })
}

export const getSingleConversations = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = `SELECT * FROM conversations WHERE (user1= ? AND user2= ?) OR (user2= ? AND user1= ?)`
        db.query(q, [userInfo.id, req.params.userId, userInfo.id, req.params.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) return res.status(404).json("Not found")
            return res.status(200).json(data);
        })
    })
}

export const getConversations = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = `SELECT * FROM conversations WHERE user1= ? OR user2= ? `
        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) return res.status(404).json("Not found")
            return res.status(200).json(data);
        })
    })
}