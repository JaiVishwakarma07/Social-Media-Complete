import { db } from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";

export const getRelationships = (req, res) => {
    const q = "SELECT followerUserid FROM relationships WHERE followedUserid = ?";

    db.query(q, [req.query.followedUserid], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserid));
    })
}

export const addRelationships = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = "INSERT INTO relationships (`followerUserid`,`followedUserid`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.userId
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("following");
        })
    })
}

export const deleteRelationships = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = "DELETE FROM relationships WHERE `followerUserid` = ? AND `followedUserid` = ?";

        db.query(q, [userInfo.id, req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("unfollow");
        })
    })
}