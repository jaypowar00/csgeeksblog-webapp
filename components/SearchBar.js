import { useGeekContext } from "@/context/ShareModalContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SearchBarArticleItem from "./SearchBarArticleItem";

function FullSearchBar() {
    const { searchBarToggle, setSearchBarToggle } = useGeekContext()
    const [searchString, setSearchString] = useState("")
    const inputRef = useRef(null)
    const [searchBarArticleList, setSearchBarArticleList] = useState([])
    const [searching, setSearching] = useState(false)
    let timeout = null

    useEffect(() => {
        if (searchBarToggle)
            inputRef.current.focus()
    }, [searchBarToggle])

    const checkKeyPress = (e) => {
        if (e.keyCode === 27) {
            setSearchBarToggle(false)
        }
    }

    const getSearchedItems = () => {
        setSearching(true)
        axios.get(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/posts?search=${inputRef.current.value}&orderby=created&order=desc`)
            .then(res => {
                setSearching(false)
                if (res.data.success)
                    setSearchBarArticleList(res.data.articles)
            }).catch(err => {
                setSearching(false);
                console.log("something went wrong!");
                console.log(err)
            })
    }

    const onSearchStringChange = (e) => {
        setSearchString(e.target.value)
        if (timeout) {
            setSearching(false)
            clearTimeout(timeout)
        }
        if (e.target.value.length > 0 && e.target.value != "") {
            setSearching(true)
            setSearchBarArticleList([])
            timeout = setTimeout(() => {
                getSearchedItems()
            }, 1500)
        }
        else {
            setSearching(false)
            setSearchBarArticleList([])
        }
    }

    return (
        <div className={`${searchBarToggle ? `` : `hidden`}`} onKeyUp={checkKeyPress}>
            <div className="absolute w-screen h-screen z-20 top-0 left-0 bg-black opacity-70" onClick={() => { setSearchBarToggle(false) }}>
            </div>
            <div className="absolute z-20 w-full top-[24px] max-w-[700px] left-[50%] translate-x-[-50%] px-8">
                <form className="flex items-center" onSubmit={e => { e.preventDefault(); }}>
                    {/* <form className="flex items-center" onSubmit={e => { e.preventDefault(); getSearchedItems() }}> */}
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="search" id="simple-search" className="bg-gray-50 border-0 outline-none text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-700 placeholder-gray-400 text-white ring-[1.5px] ring-green-600" placeholder="Search articles" required
                            ref={inputRef} value={searchString} onChange={onSearchStringChange} />
                    </div>
                    {/* <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white rounded-lg outline-none bg-green-600 hover:bg-green-700 focus:bg-green-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button> */}
                </form>
                <div className="bg-gray-700 h-fit max-h-[250px] mt-2 rounded-md overflow-y-scroll hide-scrollbar">
                    {
                        searching ?
                            <div className="mx-auto w-fit m-3" role='status'>
                                <svg className='w-8 h-8 animate-spin fill-green-600' viewBox='0 0 512 512'>
                                    <path d='M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z' />
                                </svg>
                            </div>
                            : searchBarArticleList.map((article) => (
                                <SearchBarArticleItem article={article} key={article._id} />
                            ))
                    }
                </div>
            </div>
        </div>
    );
}

export default FullSearchBar;