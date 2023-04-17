import React from 'react';
import Post from '../post/Post';
import "./posts.scss"
import { useQuery } from 'react-query';
import { makeRequest } from "../../axios"

const Posts = ({ userId }) => {

    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get("/posts?userId=" + userId).then((res) => {
            return res.data;
        })
    )
    // console.log(userId);
    return (
        <div className='posts'>
            {error ? "somthing went wrong" : isLoading ? "loading" : data.map((post, i) =>
                <Post post={post} key={i} />
            )}
        </div>
    )
}

export default Posts;