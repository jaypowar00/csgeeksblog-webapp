import PostArticleItem from "@/components/PostArticleItem";
import { useGeekContext } from "@/context/ShareModalContext";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ArticlesByTagsPage({ articles = [], tagName }) {
    const [hostUrl, sethostUrl] = useState("https://csgeeksblog.netlify.app")
    const [hostName, sethostName] = useState("csgeeksblog.netlify.app")
    const { sidebarMinimize } = useGeekContext()
    const router = useRouter()

    useEffect(() => {
        if (window.location.origin !== hostUrl)
            sethostUrl(window.location.origin)
        if (window.location.host !== hostName)
            sethostName(window.location.host)
    }, [])
    
    if (router.fallback) {
        return (<h1>Loading...</h1>)
    }

    return (
        <>
            <Head>
                <title>{`Articles for ${tagName} | CSGeeks Blog`}</title>
                <meta name="description" content={`Article ${tagName ? `related to '${tagName}'` : `having some tags`}! Check them if you haven't already. Stay tuned!`} />
                <meta name="author" content="Jay Powar" />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:secure" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:width" content="526" />
                <meta property="og:image:height" content="275" />
                <meta property="og:title" content={`Articles for ${tagName} | CSGeeks Blog`} />
                <meta property="og:description" content={tagName ? `Check articles on topic(s) '${tagName}' and many more...` : `Check latest updates on articles`} />
                <meta property="og:url" content={`${hostUrl}/tags/posts${tagName ? `?t=${tagName}` : ''}`} />
                <meta property="og:url" content={`${hostUrl}/tags/posts${tagName ? `?t=${tagName}` : ''}/`} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:site_name" content={`${hostName}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={`${hostName}`} />
                <meta property="twitter:url" content={`${hostUrl}/tags/posts${tagName ? `?t=${tagName}` : ''}`} />
                <meta property="twitter:url" content={`${hostUrl}/tags/posts${tagName ? `?t=${tagName}` : ''}/`} />
                <meta name="twitter:title" content="Articles | CSGeeks Blog" />
                <meta name="twitter:description" content={tagName ? `Check articles on topic(s) '${tagName}' and many more...` : `Check latest updates on articles`} />
                <meta name="twitter:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
            </Head>
            <div className={`main-container ${sidebarMinimize ? 'main-container-minimized' : ''}`}>
                <section className={`posts-sections ${sidebarMinimize ? 'sidebar-minimized-posts-sections' : ''}`}>
                    <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
                        <div className="grid gap-8 pb-32 lg:grid-cols-2">
                            {articles.map((article, index) => (
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

export default ArticlesByTagsPage;

export async function getStaticPaths(ctx) {
    let paths = []
    await axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog?get=tags`, { timeout: 60000 })
        .then(response => {
            if (response.data.tags)
                paths = response.data.tags.map(tagName => ({ params: { tagName: `${tagName}` } }))
        }).catch(err => console.log(err))
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (ctx) => {
    const { params } = ctx
    const { tagName } = params
    let articles = []
    await axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/posts?orderby=created&order=desc&tag=${tagName}`)
        .then(res => {
            if (res.data.articles) articles = res.data.articles
        }).catch(err => console.log(err))

    return {
        props: {
            articles,
            tagName,
        }, revalidate: 60
    }
}
