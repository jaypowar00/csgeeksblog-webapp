import PostArticleItem from "@/components/PostArticleItem";
import { useGeekContext } from "@/context/ShareModalContext";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";



function Posts({ articles }) {
    const [hostUrl, sethostUrl] = useState("https://csgeeksblog.netlify.app")
    const [hostName, sethostName] = useState("csgeeksblog.netlify.app")
    const { sidebarMinimize } = useGeekContext()

    useEffect(() => {
        if (window.location.origin !== hostUrl)
            sethostUrl(window.location.origin)
        if (window.location.host !== hostName)
            sethostName(window.location.host)
    }, [])


    return (
        <>
            <Head>
                <title>Articles | CSGeeks</title>
                <meta name="description" content="Latest article updates on CSGeeks Blog by their official founders! Check them if you haven't already. Stay tuned!" />
                <meta name="author" content="Jay Powar" />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:secure" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:width" content="526" />
                <meta property="og:image:height" content="275" />
                <meta property="og:title" content="Articles | CSGeeks Blog" />
                <meta property="og:description" content="See whats happening inside CSGeekBlog. Maybe some one posted your article? WhoKnows..." />
                <meta property="og:url" content={`${hostUrl}/posts`} />
                <meta property="og:url" content={`${hostUrl}/posts/`} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:site_name" content={`${hostName}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={`${hostName}`} />
                <meta property="twitter:url" content={`${hostUrl}/posts`} />
                <meta property="twitter:url" content={`${hostUrl}/posts/`} />
                <meta name="twitter:title" content="Articles | CSGeeks Blog" />
                <meta name="twitter:description" content="See whats happening inside CSGeekBlog. Maybe some one posted your article? WhoKnows..." />
                <meta name="twitter:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
            </Head>
            <div className={`main-container ${sidebarMinimize ? 'main-container-minimized' : ''}`}>
                <section className={`posts-sections ${sidebarMinimize ? 'sidebar-minimized-posts-sections' : ''}`}>
                    <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
                        <div className="grid gap-8 pb-32 lg:grid-cols-2">
                            {articles.map((article) => (
                                <PostArticleItem key={article._id}
                                    id={article._id} author={article.author} title={article.title}
                                    description={article.description} created={article.created}
                                    tags={article.tags} thumbnail={article.thumbnail} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Posts;

export const getStaticProps = async (ctx) => {
    let articles = []
    await axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/posts`, { timeout: 60000 })
        .then((response) => {
            if (response.data.articles && response.data.articles.length > 0)
                articles = response.data.articles
        }).catch(err => console.log(err))
    // console.log(articles)
    return {
        props: { articles },
        revalidate: 60
    }
}