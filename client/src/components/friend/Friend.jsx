import React from "react";
import "./friend.scss"
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const Friend = (userId) => {
    const id = userId.id
    const { isLoading, error, data } = useQuery(['friend', id], () =>
        makeRequest.get("/users/find/" + id).then((res) => {
            const result = res.data;
            return result;
        })
    )
    // console.log(userId)
    return (
        <div className="friend">
            {isLoading ? "loding" :
                <div className="container">
                    <div className="item" >
                        <div className="user">
                            <div className="userInfo">
                                <img src={"/upload/" + data.coverPic} alt="" />
                                <span>{data.name}</span>
                            </div>
                            <div className="buttons">
                                <Link to={`/profile/${data.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <button>Profile</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Friend