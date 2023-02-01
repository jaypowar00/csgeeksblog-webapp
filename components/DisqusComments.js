import { DiscussionEmbed } from "disqus-react"
import { useEffect, useState } from "react"

const DisqusComments = ({ article }) => {
    const disqusShortname = "csgeeks"
    const [hostUrl, setHostUrl] = useState("https://csgeeksblog.netlify.app")
    const disqusConfig = {
        url: `${hostUrl}/posts/${article._id}`,
        identifier: article._id, // Single article id
        title: article.title // Single article title
    }
    useEffect(() => {
        if (window.location.origin !== hostUrl)
            setHostUrl(window.location.origin)
    }, [])

    return (
        <div>
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    )
}
export default DisqusComments;