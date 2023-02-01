import PostArticleTagList from "@/components/PostArticleTagList";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Ripples from 'react-ripples'
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import DisqusComments from "@/components/DisqusComments";


function ArticlePostDetailPage({ article, profilePhotoUrl, formattedDate }) {
    const router = useRouter()
    const postId = router.query.postId
    const [hostUrl, sethostUrl] = useState("https://csgeeksblog.netlify.app")
    const [hostName, sethostName] = useState("csgeeksblog.netlify.app")
    
    useEffect(() => {
        if (window.location.origin !== hostUrl)
        sethostUrl(window.location.origin)
        if (window.location.host !== hostName)
        sethostName(window.location.host)
    }, [])
    
    if (router.isFallback) {
        return (<h1>Loading...</h1>)
    }

    return (
        <>
            <Head>
                <title>{article.title}</title>
                <meta name="description" content={`${article.description}`} />
                <meta name="author" content={article.author} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={article.thumbnail} />
                <meta property="og:image:secure" content={article.thumbnail} />
                <meta property="og:image:width" content="526" />
                <meta property="og:image:height" content="275" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:title" content={`${article.title}`} />
                <meta property="og:description" content={`${article.description}`} />
                <meta property="og:url" content={`${hostUrl}/posts/${postId}`} />
                <meta property="og:url" content={`${hostUrl}/posts/${postId}/`} />
                <meta property="og:site_name" content={`${hostName}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={`${hostName}`} />
                <meta property="twitter:url" content={`${hostUrl}/posts/${postId}`} />
                <meta property="twitter:url" content={`${hostUrl}/posts/${postId}/`} />
                <meta name="twitter:title" content={`${article.title}`} />
                <meta name="twitter:description" content={`${article.description}`} />
                <meta name="twitter:image" content={`${article.thumbnail}`} />

            </Head>
            <div className="posts-sections">
                <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gray-900">
                    <div className="flex justify-between px-2 mx-auto">
                        <article className="mx-auto w-full max-w-2xl">
                            <header className="mb-4 lg:mb-6">
                                <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl text-white">
                                    {article.title}
                                </h1>
                            </header>
                            <Ripples>
                                <Image className="select-none" width={1080} height={0} quality={75} src={article.thumbnail} alt={`${article.title}'s thumbnail`} />
                            </Ripples>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4 mt-2">
                                    <Ripples>
                                        <Image className="select-none w-7 h-7 rounded-full" width={128} height={128} quality={100} src={profilePhotoUrl} alt={`${article.author}'s Profile Picture`} />
                                    </Ripples>
                                    <span className="font-medium text-white">
                                        {article.author}
                                    </span>
                                </div>
                                <span className="text-gray-600 text-sm float-right mr-1">{formattedDate}</span>
                            </div>
                            <div className="mt-10">
                                <ReactMarkdown components={{ p: 'div' }} >
                                    {article.content}
                                </ReactMarkdown>
                                <div className="flex justify-between items-center mt-16 mb-2 text-[#6b7280]">
                                    <span className="select-none flex-wrap text-green-600 text-xs font-medium inline-flex items-center px-0.5 py-[1px] rounded">
                                        <span key={0} className="py-[3px] pr-2 text-gray-200 font-bold">
                                            Tags:
                                        </span>
                                        {article.tags.map(tag => (
                                            <span key={tag} className="py-[3px] px-2 mr-2 my-2 bg-gray-700 rounded-2xl hover:cursor-pointer hover:bg-gray-900">
                                                {tag}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                                <DisqusComments article={article} hostUrl={hostUrl} />
                            </div>
                        </article>
                    </div>
                </main >
                <footer className="bg-gray-800">
                    <div className="p-4 pr-5 py-6 mx-auto max-w-screen-xl md:p-8 lg:p-10">
                        <div className="grid grid-cols-3 gap-8 md:grid-cols-3 lg:grid-cols-4">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Social</h2>
                                <ul className="text-gray-500 dark:text-gray-400">
                                    <li className="mb-4">
                                        <Link href="#" className="hover:underline">YouTube</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="#" className="hover:underline">Facebook</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="#" className="hover:underline">Instagram</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Info</h2>
                                <ul className="text-gray-500 dark:text-gray-400">
                                    <li className="mb-4">
                                        <Link href="/about" className="hover:underline">About</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/posts" className="hover:underline">Blog</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
                                <span className="mb-4 text-gray-500 dark:text-gray-400">
                                    <Link target={'_blank'} href="https://github.com/mrwhoknows55/csgeeks-blog-app/releases" className="hover:underline">Android</Link>
                                </span>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                <span className="mb-4 text-gray-500 dark:text-gray-400">
                                    <Link href="/privacypolicy" className="hover:underline">Privacy Policy</Link>
                                </span>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                        <div className="text-center">
                            <Link href="#" className="flex justify-center items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white footer-title">
                                CSGeeks
                            </Link>
                            <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2017-2022 <a href="#" className="hover:underline footer-mini-title">CSGeeks™</a>. All Rights Reserved.
                            </span>
                            <ul className="flex justify-center mt-5 space-x-5">
                                <li>
                                    <Link href="https://www.instagram.com/csgeeks_3/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400" target={'_blank'}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://twitter.com/Red_Ranger00" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400" target={'_blank'}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://github.com/jaypowar00/csgeeksblog-webapp" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400" target={'_blank'}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" /></svg>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div >
        </>
    );
}

export default ArticlePostDetailPage;

export async function getStaticPaths(ctx) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/posts`)
    const data = await response.json()
    let count = 0;
    let paths = []
    if (data.articles) {
        data.articles.forEach((article) => {
            if (count < 1) {
                paths.push({ params: { postId: `${article._id}` } })
                count += 1
            }
        })
    }
    // console.log('paths')
    // console.log(paths)
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (ctx) => {
    const { params } = ctx;
    const { postId } = params;
    // console.log(postId)
    const response = await fetch(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/post?id=${postId}`)
    const data = await response.json()
    let article = {}
    let profilePhotoUrl = "/avatar_dummy.svg"
    if (data.article) article = data.article
    const date = new Date(article.created)
    const formattedDate = `${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}/${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${date.getFullYear()} ${(date.getHours() % 12)}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}:${date.getSeconds() < 10 ? "0" : ""}${date.getSeconds()} ${date.getHours() > 12 ? "PM" : "AM"}`;
    if (data.article.author) {
        await axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/author?name=${article.author}`)
            .then(response => {
                if (response.data.author && response.data.author.profile_photo)
                    profilePhotoUrl = response.data.author.profile_photo
            })
            .catch(err => {
                setProfilePhotoUrl("/avatar_dummy.svg")
            })
            .finally(() => {
            })
    }
    return {
        props: {
            article,
            profilePhotoUrl,
            formattedDate
        }, revalidate: 60
    }
}