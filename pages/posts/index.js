import PostArticleItem from "@/components/PostArticleItem";
import Head from "next/head";
import { useEffect, useState } from "react";



function Posts({ articles }) {
    const [hostUrl, sethostUrl] = useState("")
    
    useEffect(() => {
      if(window.location.origin !== hostUrl) {
        sethostUrl(window.location.origin)
      }
    }, [])
    

    return (
        <>
            <Head>
                <title>Articles | CSGeeks</title>
                <meta name="description" content="Latest article updates on CSGeeks Blog by their official founders! Check them if you haven't already. Stay tuned!" />
                <meta name="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta name="og:image:secure" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:width" content="1140" />
                <meta property="og:image:height" content="540" />
                <meta name="og:title" content="Articles | CSGeeks Blog" />
                <meta name="og:description" content="See whats happening inside CSGeekBlog. Maybe some one posted your article? WhoKnows..." />
                <meta name="og:url" content={`${hostUrl}/posts`} />
                <meta property="og:type" content="article" />
            </Head>
            <section className="posts-sections">
                <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
                    <div className="grid gap-8 pb-32 lg:grid-cols-2">
                        {
                            articles.map((article) => {
                                return (
                                    <PostArticleItem key={article._id}
                                        id={article._id} author={article.author}
                                        title={article.title}
                                        description={article.description}
                                        created={article.created} tags={article.tags}
                                        thumbnail={article.thumbnail}
                                    />)
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Posts;

export const getStaticProps = async (ctx) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/posts`)
    const data = await response.json()
    let articles = []
    if (data.articles && data.articles.length > 0) articles = data.articles
    console.log(articles)
    return {
        props: { articles },
        revalidate: 10
    }
}