import Image from "next/image";
import { useEffect, useState } from "react";
import Ripples from 'react-ripples'
import PostArticleTagList from "./PostArticleTagList";
import TimeAgo from 'javascript-time-ago'
import Link from "next/link";
import { useRouter } from "next/router";
const timeAgo = new TimeAgo('en-US')

function PostArticleItem({
    id = "", author = "", created = "", tags = [],
    title = "", description = "", thumbnail = "" }) {
    const router = useRouter()
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("/avatar_dummy.svg")

    useEffect(() => {
        const getProfilePhoto = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/author?name=${author}`)
            const data = await response.json()
            console.log(data)
            if (data.author && data.author.profile_photo) setProfilePhotoUrl(data.author.profile_photo)
        }
        getProfilePhoto()
    }, [])


    const openArticle = (e) => {
        e.preventDefault();
        router.push(`/posts/${id}`, undefined, { shallow: true })
    }

    return (
        <article key={id} className="p-3 md:p-5 xl:p-5 2xl:p-6 rounded-lg border shadow-md bg-gray-800 border-gray-700">
            <Ripples during={700}>
                <Link onClick={openArticle} href={`/posts/${id}`}>
                    <Image className="select-none w-screen h-32 2xl:h-64 xl:h-60 md:h-52 sm:h-44 rounded-t-lg" style={{ objectFit: 'cover' }} src={thumbnail} width={1080} height={0} quality={75} alt="" />
                </Link>
            </Ripples>
            <div className="flex justify-between items-center mb-2 text-[#6b7280]">
                <span className="select-none text-green-600 overflow-hidden text-xs font-medium inline-flex items-center px-0.5 py-[1px] rounded 2xl:w-[86%] xl:w-[83%] md:w-[81%] sm:w-[78%] min-[428px]:w-[70%] w-[65%]">
                    <PostArticleTagList tags={tags} />
                </span>
                <span className="text-xs select-none" title={new Date(created).toLocaleString()}>{timeAgo.format(new Date(created))}</span>
            </div>
            <h2 className="select-all mb-2 text-2xl font-bold tracking-tight text-white">
                <Link href={`/posts/${id}`} onClick={openArticle}>{title}</Link>
            </h2>
            <p className="mb-5 font-light text-gray-400">
                {`${description.substring(0, 150)}${(description.length > 150) ? '...' : ''}`}
            </p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image className="select-none w-7 h-7 rounded-full" width={128} height={128} quality={100} src={profilePhotoUrl} alt={`${author}'s Profile Picture`} />
                    <span className="select-all font-medium text-white">
                        {author}
                    </span>
                </div>
                <Link href={`/posts/${id}`} onClick={openArticle} className="select-none inline-flex items-center font-medium text-blue-600 text-primary-500 hover:underline">
                    Read more
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
            </div>
        </article>
    );
}

export default PostArticleItem;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (ctx) => {
    console.log(ctx)

    return {
        props: {

        }
    }
}