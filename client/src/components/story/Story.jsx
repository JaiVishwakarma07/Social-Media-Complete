import { Link, useNavigate } from "react-router-dom";
import "./story.scss"
import Stories from 'react-insta-stories';


const Story = () => {
    const navigate = useNavigate()
    return (
        <div className="SingleStory">
            <div className="wrapper">
                <Stories
                    stories={[
                        {
                            url: 'https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg',
                            header: {
                                heading: 'Jai',
                                subheading: 'Posted 30m ago',
                                profileImage: "https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg",
                            },
                        },
                        {
                            url: "https://jswtv.tv/wp-content/uploads/2022/02/rashmika-mandanna-latest-photos-1.jpg",
                            header: {
                                heading: 'Jai',
                                subheading: 'Posted 30m ago',
                                profileImage: "https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg",
                            },
                        },
                    ]}
                    defaultInterval={5000}
                    width={432}
                    height={680}
                    onAllStoriesEnd={() => navigate("/")}
                />

            </div>
            <Link className="but" to="/">X</Link>
        </div>
    )
}

export default Story