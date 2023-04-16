import React, { useContext, useState } from 'react'
import "./Profile.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { makeRequest } from "../../axios"
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/Update';



const Profile = () => {

    const [openUpdate, setOpenUpdate] = useState(false)
    const userId = parseInt(useLocation().pathname.split("/")[2])
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const { isLoading, error, data } = useQuery(['user'], () =>
        makeRequest.get("/users/find/" + userId).then((res) => {
            const result = res.data;
            return result;
        })
    )
    const { isLoading: rsIsLoading, data: relationshipData } = useQuery(['relationship'], () =>
        makeRequest.get("/relationships?followedUserid=" + userId).then((res) => {
            const result = res.data;
            return result;
        })
    )

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following) => {
            if (following) return makeRequest.delete("/relationships?userId=" + userId);
            return makeRequest.post("/relationships", { userId })
        },
        {
            onSuccess: () => {
                //Invalidate and refetch
                queryClient.invalidateQueries(["relationship"]);
            },
        }
    );

    const handleClick = async (data) => {
        const id = data.id
        try {
            const res = await makeRequest.get(`conversations/single/${id}`)
            console.log(res.data)
            navigate(`/message/${res.data[0].id}`)
        } catch (error) {
            if (error.response.status === 404) {
                const res = await makeRequest.post(`/conversations/`, { user2: id })
                // console.log(res.data)
                navigate(`/message/${res.data[0].id}`)
            }
            // console.log(error.response.status)
        }
    }

    const handleFollow = () => {
        mutation.mutate(relationshipData.includes(currentUser.id))
    }
    return (

        <div className="profile">
            {isLoading ? ("loading") : (<>
                <div className="images">
                    <img src={isLoading ? "" : "/upload/" + data.coverPic} alt="" className="cover" />
                    <img src={isLoading ? "" : "/upload/" + data.profilePic} alt="" className="profilePic" />
                </div>
                <div className="profileContainer">
                    <div className="uInfo">
                        <div className="left">
                            <a href="http://facebook.com">
                                <FacebookTwoToneIcon fontSize="small" />
                            </a>
                            <a href="http://facebook.com">
                                <InstagramIcon fontSize="small" />
                            </a>
                            <a href="http://facebook.com">
                                <TwitterIcon fontSize="small" />
                            </a>
                            <a href="http://facebook.com">
                                <LinkedInIcon fontSize="small" />
                            </a>
                            <a href="http://facebook.com">
                                <PinterestIcon fontSize="small" />
                            </a>
                        </div>
                        <div className="center">
                            <span>{isLoading ? "" : data.name}</span>
                            <div className="info">
                                <div className="item">
                                    <PlaceIcon />
                                    <span>{isLoading ? "" : data.city}</span>
                                </div>
                                <div className="item">
                                    <LanguageIcon />
                                    <span>{isLoading ? "" : data.website}</span>
                                </div>
                            </div>
                            {rsIsLoading ? "" : userId === currentUser.id ? (<button onClick={() => setOpenUpdate(true)}>Update</button>) : (<button onClick={handleFollow}>
                                {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
                            </button>)}
                        </div>
                        <div className="right">
                            <span onClick={() => handleClick(data)}><EmailOutlinedIcon /></span>
                            {/* {cloading ? "." : <Link to={`/message/${cdata.id}`}><EmailOutlinedIcon /></Link>} */}
                            <MoreVertIcon />
                        </div>
                    </div>
                    <Posts userId={userId} />
                </div>
            </>)
            }
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}

        </div >
    )
}

export default Profile;