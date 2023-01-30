import { useEffect, useState } from "react";

function PostArticleTagList({ tags }) {
    let length = 0
    let keyid = 0
    const [maxLength, setMaxLength] = useState(-1)
    let widthWindow = null

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
        if(maxLength == -1) handleResize()
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
                                {tag}
                            </span>
                        )
                    }
                })
            }
        </>
    );
}

export default PostArticleTagList;