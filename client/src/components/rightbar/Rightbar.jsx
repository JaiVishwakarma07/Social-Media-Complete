import React from "react";
import "./Rightbar.scss"

const RightBar = () => {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggestions for you</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://static.toiimg.com/photo/95715563/95715563.jpg?v=3" alt="" />
                            <span>Jai Vishwakarma</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://static.toiimg.com/photo/95715563/95715563.jpg?v=3" alt="" />
                            <span>Jai Vishwakarma</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://static.toiimg.com/photo/95715563/95715563.jpg?v=3" alt="" />
                            <p>
                                <span>Pooja Hegde</span>  changed their Boyfriend
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://static.toiimg.com/photo/95715563/95715563.jpg?v=3" alt="" />
                            <p>
                                <span>Pooja Hegde</span>  changed their Boyfriend
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://static.toiimg.com/photo/95715563/95715563.jpg?v=3" alt="" />
                            <p>
                                <span>Pooja Hegde</span>  changed their Picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://static.toiimg.com/photo/95715563/95715563.jpg?v=3" alt="" />
                            <p>
                                <span>Pooja Hegde</span>  changed their cover photo
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="item">
                    <span>Online Friends</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://static.toiimg.com/photo/95715563/95715563.jpg?v=3" alt="" />
                            <div className="online" />
                            <span>Pooja Hegde</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RightBar;