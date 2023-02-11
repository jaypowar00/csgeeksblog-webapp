import { useGeekContext } from "@/context/ShareModalContext";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

function PrivacyPolicy() {
    const [hostUrl, sethostUrl] = useState("https://csgeeksblog.netlify.app")
    const [hostName, sethostName] = useState("csgeeksblog.netlify.app")
    const { sidebarMinimize } = useGeekContext()
    useEffect(() => {
        if (window.location.origin !== hostUrl)
            sethostUrl(window.location.origin)
        if (window.location.host !== hostName)
            sethostName(window.location.host)
    }, [])
    return (
        <>
            <Head>
                <title>CSGeeks Blog</title>
                <meta name="description" content="Privacy policy of Official CS Geeks Blog, know the tech, feel the tech! A place for tech." />
                <meta property="og:type" content="website" />
                <meta name="author" content="Jay Powar" />
                <meta property="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:secure" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:width" content="526" />
                <meta property="og:image:height" content="275" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:title" content="CSGeeks Blog | Official" />
                <meta property="og:description" content="Privacy policy of CSGeeks Blog site, Want to know tech, then take your tech with CS Geeks' Official Blog!" />
                <meta property="og:url" content={`${hostUrl}/`} />
                <meta property="og:url" content={`${hostUrl}`} />
                <meta property="og:site_name" content={`${hostName}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={`${hostName}`} />
                <meta property="twitter:url" content={`${hostUrl}/`} />
                <meta property="twitter:url" content={`${hostUrl}`} />
                <meta name="twitter:title" content="CSGeeks Blog | Official" />
                <meta name="twitter:description" content="Privacy policy of CSGeeks Blog site, Want to know tech, then take your tech with CS Geeks' Official Blog!" />
                <meta name="twitter:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
            </Head>
            <div className={`main-container ${sidebarMinimize ? 'main-container-minimized' : ''}`}>
                <div className={`posts-sections ${sidebarMinimize ? 'sidebar-minimized-posts-sections' : ''}`}>
                    <div className={`to-[#28292c] via-[#202325] from-[#28292c] bg-gradient-to-tr px-3.5 py-8 min-[768px]:py-10 mx-4 mt-4 rounded-md h-full`}>
                        <h1 className="mx-auto w-fit text-[#cbebc6] font-bold text-2xl">
                            Privacy Policy
                        </h1>
                        <span className="text-[#ced8cc] mt-10 block mx-auto min-[768px]:max-w-[750px]">
                            <span className="ml-8">
                                This CS Geeks Blog web application is made with <Link href="https://nextjs.org" target={"_blank"}>NextJS</Link> and styled with <Link href="https://tailwindcss.com/" target={"_blank"}>Tailwind</Link>.&nbsp;
                                Along with that it makes use of browser&#39;s <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target={"_blank"}>localStorage</Link> to store some critical state values to provide users with great user experience.
                            </span>
                            <br />
                            <span className="ml-8">
                                Throughout the experience of users that they will have whille using this web application, the &#34;CSGeeks Blog&#34; won&#39;t be collecting any data by any means.&nbsp;
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrivacyPolicy;