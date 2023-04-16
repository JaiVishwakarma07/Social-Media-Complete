import "./allmessages.scss"
import { Link } from "react-router-dom"
import { useQuery } from 'react-query';
import { makeRequest } from "../../axios"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AllMessages = ({ user }) => {
    const { currentUser } = useContext(AuthContext)
    const id = currentUser.id === user.user1 ? user.user2 : user.user1

    const { isLoading, error, data } = useQuery(['users'], () =>
        makeRequest.get("/users/find/" + id).then((res) => {
            const result = res.data;
            return result;
        })
    )
    // console.log(data);
    const lastMessage = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum"
    return (
        <div className="allmessages">
            {isLoading ? "loading" : error ? "error" : <table>
                <tr className="active">
                    <td><img src={"/upload/" + data.profilePic} alt="" /></td>
                    <td>
                        <Link to="/profile/3" style={{ textDecoration: "none", color: "inherit" }}>{data.name}</Link>
                    </td>
                    <td><Link style={{ textDecoration: "none", color: "inherit" }} to="/message/123"><p>{lastMessage.substring(0, 90)}...</p></Link></td>
                </tr>
                <hr />
            </table>}
        </div>
    )
}

export default AllMessages