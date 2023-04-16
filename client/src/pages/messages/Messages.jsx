import { useQuery } from "react-query";
import "./messages.scss"
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AllMessages from "../../components/conversations/AllMessages";

const Messages = () => {


    const { isLoading, error, data } = useQuery(['allconversations'], () =>
        makeRequest.get("/conversations").then((res) => {
            const result = res.data;
            return result;
        })
    )

    // const userId = currentUser.id === data?.user1 ? data?.user2 : data?.user1

    // const { isLoading: uloading, error: uerror, data: udata } = useQuery(['user'], () =>
    //     makeRequest.get("/users/find/" + userId).then((res) => {
    //         const result = res.data;
    //         return result;
    //     })
    // )

    return (
        <div className="messages">
            {isLoading ? "loading" : error ? "something went wrong" : <div className="container">
                <div className="title">
                    <h1>Messages</h1>
                </div>
                {data.map((item, i) => (
                    <AllMessages user={item} key={i} />
                ))}
            </div>}
        </div>
    )
}

export default Messages