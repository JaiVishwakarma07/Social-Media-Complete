import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss"
import HomeIcon from '@mui/icons-material/Home';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import Logo from "../../assets/logo.png";

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { currentUser } = useContext(AuthContext);
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await makeRequest.get("/users/search")
            setData(res.data)
        }
        fetchUsers()
    }, [])

    // console.log(data)
    const handleClick = () => {
        setOpen(!open)
        // window.location.reload();
    }

    const handleLogout = async () => {
        try {
            await makeRequest.post("/auth/logout")
            localStorage.setItem("user", null)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="navbar">
            <div className="left">
                <img src={Logo} alt="" />
                {/* <span>TanStack</span> */}
                <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex" }}>
                    <HomeIcon color="primary" sx={{ fontSize: 30 }} />
                </Link>
                <NightlightIcon />
                <div className="search" onClick={() => setOpen(!open)}>
                    <SearchIcon color="disabled" />
                    <input type="text" placeholder="Search.." onChange={(e) => setQuery(e.target.value)} />
                </div>
                {open && <div className="searchResult">
                    {
                        data.filter((item) => item.name.toLowerCase().includes(query)).map((item) => (
                            <Link to={`/profile/${item.id}`} style={{ textDecoration: "none", color: "inherit" }} onClick={handleClick} key={item.id}>
                                <div className="profile">
                                    <img src={"/upload/" + item.profilePic} alt="" />
                                    <span className="profileSpan">{item.name}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>}
            </div>
            <div className="right">
                {/* <PersonIcon /> */}
                <Link style={{ textDecoration: "none", color: "inherit", display: "flex" }} to="/login" onClick={handleLogout}><ExitToAppIcon /> Logout</Link>
                {/* <Link style={{ textDecoration: "none", color: "inherit" }} to="/messages"><ChatBubbleIcon /></Link> */}
                <NotificationsActiveIcon color="primary" sx={{ fontSize: 30 }} />
                <div className="user">
                    <img src={"/upload/" + currentUser.profilePic} alt="" />
                    <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <span>{currentUser.name}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar;