import { Link, useNavigate, useParams } from "react-router-dom";
import "./story.scss"
import Stories from 'react-insta-stories';
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";


const Story = () => {
    // const { id } = useParams()

    const { isLoading, error, data: story } = useQuery(['story'], () =>
        makeRequest.get("/story").then((res) => {
            const result = res.data;
            return result;
        })
    )

    let stories = story.map((item) => (
        {
            url: item.img,
            header: {
                heading: item.name,
                subheading: item.createdAt,
                profileImage: "https://img.mensxp.com/media/content/2023/Jan/rashmika-strength-1_63bd356b1f6cb.jpeg",
            }
        }
    ))
    // console.log(stories);
    const navigate = useNavigate()
    return (
        <div className="SingleStory">
            <div className="wrapper">
                <Stories
                    stories={stories}
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