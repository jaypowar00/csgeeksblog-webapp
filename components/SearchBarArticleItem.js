import { useGeekContext } from "@/context/ShareModalContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

function SearchBarArticleItem({ article }) {
    const { searchBarToggle, setSearchBarToggle } = useGeekContext()
    const router = useRouter()
    return (
        <Link className="!no-underline !text-white m-3 h-fit rounded-md ring-1 block ring-gray-600 p-2" href={`/posts/${article._id}`}
            onClick={e=>{e.preventDefault(); setSearchBarToggle(false); toast.loading('opening article', {duration: 2000}); router.push(`/posts/${article._id}`)}}
        >
            <h1 className="truncate">{article.title}</h1>
            <p className="text-sm truncate text-gray-400 opacity-60">{article.description}</p>
        </Link>
    );
}

export default SearchBarArticleItem;