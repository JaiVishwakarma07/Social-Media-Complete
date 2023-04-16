import { useParams } from "react-router"
import "./message.scss"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Message = () => {

    const { id } = useParams();
    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery(['message'], () =>
        makeRequest.get("/messages/" + id).then((res) => {
            const result = res.data;
            return result;
        })
    )

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (message) => {
            return makeRequest.post("/messages", message);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["message"]);
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate({
            conversationd: id,
            message: e.target[0].value,
        });
        e.target[0].value = ""
    }

    return (
        <div className="message">
            {isLoading ? "loading..." : <div className="container">
                <div className="heading">
                    <img src="https://static.freeimages.com/images/home/filetypes/photo.png" alt="" />
                    <h2>Chats</h2>
                </div>
                <div className="conversations">
                    {data.map((item) => (
                        <div className={currentUser.id === item.senderid ? "item sender" : "item"} key={item.id}>
                            <img src={currentUser.id === item.senderid ? "/upload/" + currentUser.profilePic : "https://static.freeimages.com/images/home/filetypes/photo.png"} alt="" />
                            <p>{item.message}</p>
                        </div>
                    ))}

                </div>
                <hr />
                <form onSubmit={handleSubmit} className="write">
                    <textarea name="" id="" cols="30" rows="10" placeholder="write a message..." ></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>}
        </div >
    )
}

export default Message