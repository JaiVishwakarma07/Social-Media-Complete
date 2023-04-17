import React, { useContext, useState } from 'react';
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { Link, useLocation } from "react-router-dom";
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
import Story from '../story/Story';
// import Story from '../story/Story';
const Stories = () => {
    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery(['story'], () =>
        makeRequest.get("/story").then((res) => {
            const result = res.data;
            return result;
        })
    )
    // console.log(data)
    // if (!isLoading) console.log(data[0].id)

    // const stories = [
    //     {
    //         id: 1,
    //         name: "Dish Patani",
    //         img: "https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg",
    //     },
    //     {
    //         id: 2,
    //         name: "Dish Patani",
    //         img: "https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg",
    //     },
    //     {
    //         id: 3,
    //         name: "Dish Patani",
    //         img: "https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg",
    //     },
    //     {
    //         id: 4,
    //         name: "Dish Patani",
    //         img: "https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg",
    //     },
    // ];
    return (
        <>
            {isLoading ? "loding" : <div className='Stories'>
                <div className="story">
                    <img src={"/upload/" + currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                    <button>+</button>
                </div>
                {data.map(() => (<div className="story">
                    <Link to={`/story/1`}><img src="https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg " alt="" /></Link>
                    <span>name</span>
                </div>))}
            </div>
            }
        </>
    )
}

export default Stories;