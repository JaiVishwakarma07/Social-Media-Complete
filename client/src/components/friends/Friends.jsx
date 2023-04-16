import React from "react";
import "./friends.scss"
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Friend from "../friend/Friend";

const Friends = () => {
    const userId = parseInt(useLocation().pathname.split("/")[2])
    const { isLoading, data } = useQuery(['friends'], () =>
        makeRequest.get("/relationships/friends?followerUserid=" + userId).then((res) => {
            const result = res.data;
            return result;
        })
    )
    return (
        <div className="friends">
            <div className="heading"><span>Following</span></div>
            {isLoading ? "looding" :
                data.map((f, i) =>
                    <Friend id={f} key={i} />
                )
            }
        </div>
    )
}

export default Friends