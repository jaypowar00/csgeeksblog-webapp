import PostArticleItem from "@/components/PostArticleItem";
import { useGeekContext } from "@/context/ShareModalContext";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function ArticlesByTagsPage({ p_articles = [], tagName }) {
    const [hostUrl, sethostUrl] = useState("https://csgeeksblog.netlify.app")
    const [hostName, sethostName] = useState("csgeeksblog.netlify.app")
    const { sidebarMinimize } = useGeekContext()
    const [oldPropArticles, setOldPropArticles] = useState(p_articles ? p_articles : [])
    const [articles, setArticles] = useState(p_articles ? p_articles : [])
    const [toggleFilterMenu, setToggleFilterMenu] = useState(false)
    const [toggledFilterMenuClasses, setToggledFilterMenuClasses] = useState(`h-0 !w-0 overflow-hidden opacity-0`)
    const [orderProperty, setOrderProperty] = useState('created')
    const [orderMethod, setOrderMethod] = useState('desc')
    const [filtering, setFiltering] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (window.location.origin !== hostUrl)
            sethostUrl(window.location.origin)
        if (window.location.host !== hostName)
            sethostName(window.location.host)
        if (p_articles != oldPropArticles){
            setOldPropArticles(p_articles)
            setArticles(p_articles)
            toast.success('tag data loaded', {id: `${router.asPath.split('/').reverse()[1]}_toast`, duration: 3000})
        }
    }, [p_articles])

    if (router.fallback) {
        return (<h1>Loading...</h1>)
    }

    const afterHideFilterMenu = async () => {
        setTimeout(() => {
            setToggledFilterMenuClasses(`hidden`)
        }, 200)
    }

    const filterData = async () => {
        let tagName = router.asPath.split('/').reverse()[1]
        setFiltering(true)
        setTimeout(() => { setToggleFilterMenu(false); afterHideFilterMenu() }, 550)
        let req = axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/posts?orderby=${orderProperty}&order=${orderMethod}&tag=${tagName}`, { timeout: 60000 })
            .then(res => {
                if (res.data.articles) setArticles(res.data.articles)
                setFiltering(false)
            }).catch(err => { alert('something went wrong while filtering!') })
        toast.promise(req, { loading: 'getting articles', success: 'success', error: 'something went wrong' }, { duration: 1500 })
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
                        <span className="flex justify-start max-sm:justify-end -mt-5 min-[1024px]:-mt-8 mb-3">
                            <span onClick={() => { (!toggleFilterMenu) ? setToggledFilterMenuClasses(`h-0 !w-0 overflow-hidden opacity-0`) : null; setTimeout(() => setToggleFilterMenu(!toggleFilterMenu), 100); }} className={`group active:ring-1 active:ring-violet-300 active:bg-violet-700 w-fit ${toggleFilterMenu ? 'ring-1 ring-violet-300 bg-violet-700' : 'bg-gray-700'} py-[4px] text-[16px] hover:font-medium px-3 rounded-md cursor-pointer hover:text-[#e3ffdf]`}>
                                Filter
                            </span>
                            <div className={`${toggleFilterMenu ? `h-fit` : `${toggledFilterMenuClasses} ${afterHideFilterMenu()}`} px-3 pt-6 pb-20 shadow-2xl ease-linear rounded-md absolute max-[1023px]:-mt-5  bg-gray-700 w-[300px] left-[85px] z-[1] max-sm:translate-x-[-50%] max-sm:left-[50%] ${sidebarMinimize ? `max-sm:w-[93%]` : `max-sm:w-[85%] max-sm:-ml-3`} max-sm:top-16 transition-all duration-100`}>
                                <label htmlFor="property" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Order</label>
                                <select value={orderProperty} onChange={e => setOrderProperty(e.target.value)} id="property" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer">
                                    <option value="Author">Author</option>
                                    <option value="created">Time</option>
                                    <option value="title">Title</option>
                                </select>
                                <label htmlFor="method" className="block mb-2 mt-4 text-base font-medium text-gray-900 dark:text-white">By</label>
                                <select value={orderMethod} onChange={e => setOrderMethod(e.target.value)} id="method" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer">
                                    <option value="desc">{orderProperty === 'created' ? `New - Old` : `Z - A`}</option>
                                    <option value="asc">{orderProperty === 'created' ? `Old - New` : `A - Z`}</option>
                                </select>
                                <button onClick={filterData} type="button" className="absolute bottom-4 left-[50%] translate-x-[-50%] text-white focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-400 inline-flex items-center">
                                    {
                                        (!filtering) ? <>Apply filter</> :
                                            <>
                                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                Loading...
                                            </>
                                    }
                                </button>
                            </div>
                        </span>
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
    let p_articles = []
    await axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/posts?orderby=created&order=desc&tag=${tagName}`)
        .then(res => {
            if (res.data.articles) p_articles = res.data.articles
        }).catch(err => console.log(err))

    return {
        props: {
            p_articles,
            tagName,
        }, revalidate: 60
    }
}
