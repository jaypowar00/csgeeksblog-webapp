import { useGeekContext } from "@/context/ShareModalContext";
import Head from "next/head";
import Link from "next/link";
import Ripples from 'react-ripples'
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import avatar_dummy from '@/public/avatar_dummy.svg'
import { Edit, Save } from "@mui/icons-material";
import axios from "axios";
import validator from "validator";
import { TextareaAutosize } from "@mui/base";
import { getCookie } from "@/util/TokenUtil";
import { useRouter } from "next/router";

function CreateAdminArticles() {
    const router = useRouter()
    const [hostUrl, sethostUrl] = useState("https://csgeeksblog.netlify.app")
    const [hostName, sethostName] = useState("csgeeksblog.netlify.app")
    const [editImage, setEditImage] = useState(false)
    const [editContent, setEditContent] = useState(false)
    const [editTitle, setEditTitle] = useState(false)
    const [thumbnailImageInput, setThumbnailImageInput] = useState("")
    const [tagInput, setTagInput] = useState("")
    const [adminPhoto, setAdminPhoto] = useState("")
    const [publishArticleError, setPublishArticleError] = useState(false)
    const {
        sidebarMinimize, createArticleTitle, setCreateArticleTitle, createArticleDescription,
        setCreateArticleDescription, createArticleContent, setCreateArticleContent,
        createArticleAuthor, setCreateArticleAuthor, createArticleTags, setCreateArticleTags,
        createArticleThumbnail, setCreateArticleThumbnail
    } = useGeekContext()
    useEffect(() => {
        if (window.location.origin !== hostUrl)
            sethostUrl(window.location.origin)
        if (window.location.host !== hostName)
            sethostName(window.location.host)
        axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/author?name=${createArticleAuthor}`, { timeout: 60000 })
            .then(response => {
                if (response.data.author && response.data.author.profile_photo)
                    setAdminPhoto(response.data.author.profile_photo)
            }).catch(err => console.log(err))
    }, [])
    const removeTagOnClick = (e, tag) => {
        e.preventDefault()
        let tag_list = structuredClone(createArticleTags)
        tag_list.splice(tag_list.indexOf(tag), 1)
        setCreateArticleTags(tag_list)
    }
    const onApplyThumbnailUrl = () => {
        if (validator.isURL(thumbnailImageInput)) {
            setEditImage(false);
            setCreateArticleThumbnail(thumbnailImageInput)
        }else {
            setEditImage(false);
            setCreateArticleThumbnail("")
        }
    }
    const onAddTag = () => {
        if (/\S/.test(tagInput)) {
            let tag_list = structuredClone(createArticleTags)
            if (tag_list.indexOf(tagInput) == -1)
                tag_list.push(tagInput)
            setTagInput("")
            setCreateArticleTags(tag_list)
        }
    }
    const publishArticle = () => {
        if(createArticleTags.length == 0){
            setPublishArticleError("Add atleast 1 tag for article!")
            return;
        }
        let formData = {
            title: createArticleTitle,
            content: createArticleContent,
            description: createArticleDescription,
            author: createArticleAuthor,
            thumbnail: createArticleThumbnail,
            tags: createArticleTags.join(",")
        }
        setCreateArticleTags([])
        setCreateArticleThumbnail("")
        setCreateArticleTitle("")
        setCreateArticleContent("")
        setCreateArticleDescription("")
        let token = getCookie('token')
        axios.post(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/create?token=${token}`, formData)
            .then(response => {
                if (response.data.success) {
                    router.push('/admin')
                } else {
                    if (response.data.result)
                        setPublishArticleError(response.data.result)
                    else if (response.data.response)
                        setPublishArticleError(response.data.response)
                }
            }).catch(err => {
                setPublishArticleError(err.message)
            })
    }
    return (
        <>
            <Head>
                <title>Create Article | CSGeeks Blog</title>
                <meta name="description" content="Create article of Official CS Geeks Blog; know the tech, feel the tech! A place for tech." />
                <meta property="og:type" content="article" />
                <meta name="author" content="CSGeeks" />
                <meta property="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:secure" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:width" content="526" />
                <meta property="og:image:height" content="275" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:title" content="Create Article | CSGeeks Blog" />
                <meta property="og:description" content="Create article of CSGeeks Blog" />
                <meta property="og:url" content={`${hostUrl}/admin/create/`} />
                <meta property="og:url" content={`${hostUrl}/admin/create`} />
                <meta property="og:site_name" content={`${hostName}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={`${hostName}`} />
                <meta property="twitter:url" content={`${hostUrl}/admin/create/`} />
                <meta property="twitter:url" content={`${hostUrl}/admin/create`} />
                <meta name="twitter:title" content="Create Article | CSGeeks Blog" />
                <meta name="twitter:description" content="Create article of CSGeeks Blog" />
                <meta name="twitter:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
            </Head>

            <div className={`main-container ${sidebarMinimize ? 'main-container-minimized' : ''}`}>
                <div className={`posts-sections ${sidebarMinimize ? 'sidebar-minimized-posts-sections' : ''}`}>
                    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gray-900">
                        <div className="flex justify-between px-2 mx-auto">
                            <article className="mx-auto w-full max-w-2xl">
                                <header className="mb-4 lg:mb-6">
                                    <div className="relative">
                                        {
                                            editTitle ?
                                                <>
                                                    <span className="block mb-7">&nbsp;</span>
                                                    <div className="w-full absolute top-0 left-0">
                                                        <button className="bg-green-400 hover:bg-green-600 text-white float-right hover:text-black rounded-md px-2 py-2 mt-0.5 select-none" onClick={() => { setEditTitle(!editTitle) }}>Apply</button>
                                                        <div className="overflow-hidden pr-2">
                                                            <input value={createArticleTitle} onChange={e => setCreateArticleTitle(e.target.value)} className="text-[1.6em] font-bold px-2 py-0.5 w-full rounded-sm bg-gray-600 select-none" type="url" placeholder="article title" autoFocus/>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl text-white">
                                                        {
                                                            (createArticleTitle && /\S/.test(createArticleTitle)) ? createArticleTitle : 'Title'
                                                        }
                                                    </h1>
                                                    <span className="absolute top-2 right-2 p-2 max-sm:px-1.5 max-sm:py-0.5 bg-green-600 hover:bg-green-400 hover:text-black cursor-pointer transition-all duration-300 drop-shadow-lg rounded-full text-white font-bold"
                                                        onClick={() => setEditTitle(!editTitle)}>
                                                        <Edit className="max-sm:text-[16px]" />
                                                    </span>
                                                </>
                                        }
                                    </div>
                                </header>
                                <div className="relative">
                                    <Ripples>
                                        <Image className={`select-none transition-opacity duration-1000 ${editImage ? 'opacity-50' : ''}`} width={1080} height={0} quality={75} src={createArticleThumbnail ? createArticleThumbnail : "https://demo.plugins360.com/wp-content/uploads/2017/12/demo.png"} alt={`${createArticleTitle}'s thumbnail`}
                                            onClick={() => setEditImage(false)} onInvalid={e => console.log(e)} onError={() => { setCreateArticleThumbnail(false) }} />
                                    </Ripples>
                                    {
                                        editImage ?
                                            <div className="w-full absolute top-0 left-0 p-2">
                                                <button className="bg-green-400 hover:bg-green-600 text-white float-right hover:text-black rounded-md px-2 py-0.5 select-none" onClick={() => { onApplyThumbnailUrl() }}>Apply</button>
                                                <div className="overflow-hidden pr-2">
                                                    <input value={thumbnailImageInput} onChange={e => setThumbnailImageInput(e.target.value)} className="px-2 py-0.5 w-full rounded-sm !text-black select-none" type="url" placeholder="thumbnail url" />
                                                </div>
                                            </div>
                                            :
                                            <span className="absolute top-2 right-2 p-2 max-sm:px-1.5 max-sm:py-0.5 bg-green-600 hover:bg-green-400 hover:text-black cursor-pointer transition-all duration-300 drop-shadow-lg rounded-full text-white font-bold"
                                                onClick={() => setEditImage(!editImage)}>
                                                <Edit className="max-sm:text-[16px]" />
                                            </span>

                                    }
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Ripples>
                                            <Image className="select-none w-7 h-7 rounded-full" width={128} height={128} quality={100} src={adminPhoto ? adminPhoto : avatar_dummy} alt={`${createArticleAuthor}'s Profile Picture`} />
                                        </Ripples>
                                        <span className="font-medium text-white">
                                            {createArticleAuthor}
                                        </span>
                                    </div>
                                    <span className="text-gray-600 text-sm float-right mr-0" style={{ fontSize: "12px" }}>{new Date().toLocaleString('en-US', { hour12: true })}</span>
                                </div>
                                <div className="mt-10">
                                    {
                                        editContent ?
                                            <div className="relative">
                                                <TextareaAutosize autoFocus className="w-full bg-gray-700 rounded-md p-3" minRows={20} placeholder="Enter article content here..." value={createArticleContent} onChange={e => setCreateArticleContent(e.target.value)} />
                                                <span className="absolute top-2 right-2 p-2 max-sm:px-1.5 max-sm:py-0.5 bg-green-600 hover:bg-green-400 hover:text-black cursor-pointer transition-all duration-300 drop-shadow-lg rounded-full text-white font-bold"
                                                    onClick={() => setEditContent(!editContent)}>
                                                    <Save className="max-sm:text-[16px]" />
                                                </span>
                                            </div>
                                            :
                                            <div className="relative">
                                                <ReactMarkdown components={{ p: 'div' }} className="markdown-area">
                                                    {createArticleContent && /\S/.test(String(createArticleContent)) ? createArticleContent : "&nbsp;"}
                                                </ReactMarkdown>
                                                <span className="absolute top-2 right-2 p-2 max-sm:px-1.5 max-sm:py-0.5 bg-green-600 hover:bg-green-400 hover:text-black cursor-pointer transition-all duration-300 drop-shadow-lg rounded-full text-white font-bold"
                                                    onClick={() => setEditContent(!editContent)}>
                                                    <Edit className="max-sm:text-[16px]" />
                                                </span>
                                            </div>
                                    }
                                    <div className="flex justify-between items-center mt-16 mb-2 text-[#6b7280]">
                                        <span className="select-none flex-wrap text-green-600 text-xs font-medium inline-flex items-center px-0.5 py-[1px] rounded">
                                            <span key={0} className="py-[3px] pr-2 text-gray-200 font-bold">
                                                Tags:
                                            </span>
                                            {createArticleTags.map(tag => (
                                                <span key={tag} className="py-[3px] px-2 mr-2 my-2 bg-gray-700 rounded-2xl hover:cursor-pointer hover:bg-gray-400">
                                                    <Link className="!text-green-600 hover:!no-underline" href={`/tag/${tag}/posts`} onClick={e => removeTagOnClick(e, tag)}>{tag}</Link>
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="w-full p-2">
                                        <button className="select-none bg-green-400 hover:bg-green-600 text-white float-right hover:text-black rounded-md px-2 py-0.5" onClick={() => { onAddTag() }}>Add</button>
                                        <div className="overflow-hidden pr-2">
                                            <input value={tagInput} onChange={e => setTagInput(e.target.value)} className="select-none px-2 py-0.5 w-full rounded-sm bg-gray-600" type="text" placeholder="Enter tag" />
                                        </div>
                                    </div>
                                    <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                                    <span>Article Description: <span className="text-sm text-gray-400">&#40; {createArticleDescription.length}/300 characters &#41;</span></span>
                                    <TextareaAutosize className="w-full !h-[100px] bg-gray-600 rounded" maxLength={300} style={{ resize: "none" }} value={createArticleDescription} onChange={e => setCreateArticleDescription(e.target.value)} />
                                    <button className="select-none w-full block mt-2 p-3 bg-green-600 hover:bg-green-400 text-white hover:text-black rounded"
                                        onClick={publishArticle}>
                                        Publish
                                    </button>
                                    {
                                        publishArticleError ?
                                            <span className="text-sm">Error: <span className="text-red-600">{publishArticleError}</span></span>
                                            : <></>
                                    }
                                </div>
                            </article>
                        </div>
                    </main >
                    <footer className="bg-gray-800">
                        <div className="p-4 pr-5 py-6 mx-auto max-w-screen-xl md:p-8 lg:p-10">
                            <div className="grid grid-cols-3 gap-8 md:grid-cols-3 lg:grid-cols-4">
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Auth</h2>
                                    <ul className="text-gray-500 dark:text-gray-400">
                                        <li className="mb-4">
                                            <Link href="/admin" className="hover:underline">Admin</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold uppercase text-white">Social</h2>
                                    <ul className="text-gray-500 text-gray-400">
                                        <li className="mb-4">
                                            <Link href="https://www.youtube.com/@CSGeeks" className="hover:underline">YouTube</Link>
                                        </li>
                                        <li className="mb-4">
                                            <Link href="https://www.instagram.com/csgeeks_3/" className="hover:underline">Instagram</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold uppercase text-white">Info</h2>
                                    <ul className="text-gray-500 text-gray-400">
                                        <li className="mb-4">
                                            <Link href="/about" className="hover:underline">About</Link>
                                        </li>
                                        <li className="mb-4">
                                            <Link href="/posts" className="hover:underline">Blog</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold uppercase text-white">Download</h2>
                                    <span className="mb-4 text-gray-500 text-gray-400">
                                        <Link target={'_blank'} href="https://github.com/mrwhoknows55/csgeeks-blog-app/releases" className="hover:underline">Android</Link>
                                    </span>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold uppercase text-white">Legal</h2>
                                    <span className="mb-4 text-gray-500 text-gray-400">
                                        <Link href="/privacypolicy" className="hover:underline">Privacy Policy</Link>
                                    </span>
                                </div>
                            </div>
                            <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />

                            <div className="text-center">
                                <Link href="#" className="flex justify-center items-center mb-5 text-2xl font-semibold text-white footer-title">
                                    CSGeeks
                                </Link>
                                <span className="block text-sm text-center text-gray-500 text-gray-400">© 2017-2022 <a href="#" className="hover:underline footer-mini-title">CSGeeks™</a>. All Rights Reserved.
                                </span>
                                <ul className="flex justify-center mt-5 space-x-5">
                                    <li>
                                        <Link href="https://www.instagram.com/csgeeks_3/" className="text-gray-500 hover:text-gray-900 hover:text-white text-gray-400" target={'_blank'}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://twitter.com/Red_Ranger00" className="text-gray-500 hover:text-gray-900 hover:text-white text-gray-400" target={'_blank'}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://github.com/jaypowar00/csgeeksblog-webapp" className="text-gray-500 hover:text-gray-900 hover:text-white text-gray-400" target={'_blank'}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default CreateAdminArticles;