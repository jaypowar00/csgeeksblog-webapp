import { DiscussionEmbed } from "disqus-react"

const DisqusComments = ({ article, hostUrl }) => {
    const disqusShortname = "csgeeks"
    const disqusConfig = {
        url: `${hostUrl}/posts/${article._id}`,
        identifier: `${article._id}`, // Single article id
        title: `${article.title}` // Single article title
    }

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