import { useGeekContext } from "@/context/ShareModalContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function PostArticleTagList({ tags }) {
    const { userTagsShortcut, setUserTagsShortcut, setSidebarMinimize } = useGeekContext()
    const router = useRouter()
    let length = 0
    let keyid = 0
    const [maxLength, setMaxLength] = useState(-1)
    let widthWindow = null
    let timeout = null

    const handleClick = (e, tag) => {
        e.preventDefault()
        clearTimeout(timeout)
        if (e.detail === 1)
            timeout = setTimeout(() => { router.push(`/tag/${tag}/posts`) }, 200)
        else if (e.detail === 2) {
            if (userTagsShortcut.indexOf(tag) === -1) {
                let userTagsShortcutList = userTagsShortcut
                userTagsShortcutList.push(tag)
                setUserTagsShortcut(userTagsShortcutList)
                setSidebarMinimize(true)
                setTimeout(() => {
                    setSidebarMinimize(false)
                }, 1);
                localStorage.setItem('user.tags', userTagsShortcutList)
                toast.success("Sidebar shortcut created!", { duration: 2000 })
            }else {
                toast.error("Sidebar shortcut exists!", { duration: 2000 })
            }
        }
    }

    useEffect(() => {
        if (widthWindow == null) widthWindow = window.innerWidth
        function handleResize() {
            const innerWidth = window.innerWidth
            if (widthWindow != innerWidth || maxLength == -1) {
                widthWindow = innerWidth
                if (innerWidth > 1535)
                    setMaxLength((100 * innerWidth) / 1675)
                else if (innerWidth > 1279)
                    setMaxLength((93 * innerWidth) / 1675)
                else if (innerWidth > 1023)
                    setMaxLength((87 * innerWidth) / 1675)
                else if (innerWidth > 767)
                    setMaxLength((184 * innerWidth) / 1675)
                else if (innerWidth > 639)
                    setMaxLength((169 * innerWidth) / 1600)
                else if (innerWidth > 471)
                    setMaxLength((129 * innerWidth) / 1470)
                else if (innerWidth > 427)
                    setMaxLength((125 * innerWidth) / 1470)
                else
                    setMaxLength((105 * innerWidth) / 1470)
            }
        }
        window.addEventListener('resize', handleResize)
        if (maxLength == -1) handleResize()
    }, [])

    return (
        <>
            {
                tags.map(tag => {
                    if (tag.length + length + 4 < maxLength) {
                        length += tag.length + 4
                        keyid += 1
                        return (
                            <span key={keyid} className="py-[3px] px-2 mr-2 bg-gray-700 rounded-2xl hover:cursor-pointer hover:bg-gray-900">
                                <Link
                                    className="!text-green-600 hover:!no-underline"
                                    href={`/tag/${tag}/posts`}
                                    onClick={e => handleClick(e, tag)}
                                >
                                    {tag}
                                </Link>
                            </span>
                        )
                    }
                })
            }
        </>
    );
}

export default PostArticleTagList;