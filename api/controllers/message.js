import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const addMessage = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = "INSERT INTO message (`senderid`,`conversationd`,`message`) VALUES (?)"
        const values = [
            userInfo.id,
            req.body.conversationd,
            req.body.message
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("message added");
        })
    })
}

export const getMessage = (req, res) => {

    const q = `SELECT * FROM message WHERE conversationd = ?`
    db.query(q, [req.params.cid], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data);
    })
}