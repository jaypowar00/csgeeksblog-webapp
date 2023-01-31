import Link from "next/link";

function PageNotFound() {
    return (
        <>
            <Head>
                <title>Page Not Found | CSGeeks</title>
                <meta name="description" content="Looks like the page you were trying to reach doesn't exists (yet)" />
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