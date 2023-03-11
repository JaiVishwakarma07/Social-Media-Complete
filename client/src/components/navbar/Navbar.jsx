import React, { useContext } from "react";
import "./Navbar.scss"
import HomeIcon from '@mui/icons-material/Home';
import NightlightIcon from '@mui/icons-material/Nightlight';
import GridViewIcon from '@mui/icons-material/GridView';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>JaiSocial</span>
                </Link>
                <HomeIcon />
                <NightlightIcon />
                <GridViewIcon />
                <div className="search">
                    <SearchIcon />
                    <input type="text" placeholder="Search.." />
                </div>
            </div>
            <div className="right">
                <PersonIcon />
                <ChatBubbleIcon />
                <NotificationsActiveIcon />
                <div className="user">
                    <img src={currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}
export default Navbar;