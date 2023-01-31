import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function PageNotFound() {
    const [hostUrl, sethostUrl] = useState("")
    const router = useRouter()
    useEffect(() => {
        if(window.location.origin !== hostUrl) {
            sethostUrl(window.location.origin)
          }
    }, [])
    
    return (
        <>
            <Head>
                <title>Page Not Found | CSGeeks</title>
                <meta name="description" content="Looks like the page you were trying to reach doesn't exists (yet)" />
                <meta name="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail-404.jpg`} />
                <meta property="og:image:width" content="1140" />
                <meta property="og:image:height" content="540" />
                <meta name="og:title" content="Page not found!" />
                <meta name="og:url" content={`${hostUrl}/${router.asPath}`} />
                <meta name="og:description" content="Looks like the page you were trying to reach doesn't exists (yet)" />
                <meta property="og:type" content="website" />
            </Head>
            <section className="posts-sections flex items-center">
                <div className="flex flex-col items-center justify-center px-5 mx-auto mb-8 -mt-32">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl text-gray-600 select-none">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl select-none">Sorry, we couldn&apos;t find this page.</p>
                        <p className="mt-4 mb-8 dark:text-gray-400 select-none">But dont worry, you can find plenty of other stuff on our sidebar.</p>
                        <Link rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900 select-none">Back to homepage</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PageNotFound;