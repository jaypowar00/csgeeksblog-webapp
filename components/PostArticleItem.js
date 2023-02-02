import Image from "next/image";
import { useEffect, useState } from "react";
import Ripples from 'react-ripples'
import PostArticleTagList from "./PostArticleTagList";
import TimeAgo from 'javascript-time-ago'
import Link from "next/link";
import axios from "axios";
const timeAgo = new TimeAgo('en-US')

function PostArticleItem({
    id = "", author = "", created = "", tags = [],
    title = "", description = "", thumbnail = "" }) {
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("/avatar_dummy.svg")
    const date = new Date(created)
    const formattedDate = `${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}/${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${date.getFullYear()} ${(date.getHours() % 12)}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}:${date.getSeconds() < 10 ? "0" : ""}${date.getSeconds()} ${date.getHours() > 12 ? "PM" : "AM"}`

    useEffect(() => {
        const getProfilePhoto = async () => {
            axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/author?name=${author}`)
                .then(response => {
                    if (response.data.author && response.data.author.profile_photo)
                    setProfilePhotoUrl(response.data.author.profile_photo)
                })
                .catch(err => {
                    setProfilePhotoUrl("/avatar_dummy.svg")
                })
        }
        getProfilePhoto()
    }, [])

    return (
        <article key={id} className="p-3 md:p-5 xl:p-5 2xl:p-6 rounded-lg border shadow-md bg-gray-800 border-gray-700">
            <Ripples during={700}>
                <Link className="article-image" href={`/posts/${id}`}>
                    <Image className="select-none w-screen h-32 2xl:h-64 xl:h-60 md:h-52 sm:h-44 rounded-t-lg" style={{ objectFit: 'cover' }} src={thumbnail} width={1080} height={0} quality={75} alt="" />
                </Link>
            </Ripples>
            <div className="flex justify-between items-center mb-2 text-[#6b7280]">
                <span className="select-none text-green-600 overflow-hidden text-xs font-medium inline-flex items-center px-0.5 py-[1px] rounded 2xl:w-[86%] xl:w-[83%] md:w-[81%] sm:w-[78%] min-[428px]:w-[70%] w-[65%]">
                    <PostArticleTagList tags={tags} />
                </span>
                <span className="text-xs select-none" title={formattedDate}>{timeAgo.format(new Date(created))}</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                <Link className="article-title" href={`/posts/${id}`}>{title}</Link>
            </h2>
            <p className="mb-5 font-light text-gray-400">
                {`${description.substring(0, 150)}${(description.length > 150) ? '...' : ''}`}
            </p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image className="select-none w-7 h-7 rounded-full" width={128} height={128} quality={100} src={profilePhotoUrl} alt={`${author}'s Profile Picture`} />
                    <span className="font-medium text-white">
                        {author}
                    </span>
                </div>
                <Link href={`/posts/${id}`} className="select-none inline-flex items-center font-medium text-blue-600 text-primary-500 hover:underline article-readmore">
                    Read more
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
            </div>
        </article>
    );
}

export default PostArticleItem;