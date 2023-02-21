import { useGeekContext } from "@/context/ShareModalContext";
import Head from "next/head";
import { useEffect, useState } from "react";

function AdminArticles() {
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
                <title>Manage Articles | CSGeeks Blog</title>
                <meta name="description" content="Manage articles of Official CS Geeks Blog; know the tech, feel the tech! A place for tech." />
                <meta property="og:type" content="article" />
                <meta name="author" content="CSGeeks" />
                <meta property="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:secure" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:width" content="526" />
                <meta property="og:image:height" content="275" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:title" content="Manage Articles | CSGeeks Blog" />
                <meta property="og:description" content="Manage articles of CSGeeks Blog" />
                <meta property="og:url" content={`${hostUrl}/admin/articles/`} />
                <meta property="og:url" content={`${hostUrl}/admin/articles`} />
                <meta property="og:site_name" content={`${hostName}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={`${hostName}`} />
                <meta property="twitter:url" content={`${hostUrl}/admin/articles/`} />
                <meta property="twitter:url" content={`${hostUrl}/admin/articles`} />
                <meta name="twitter:title" content="Manage articles | CSGeeks Blog" />
                <meta name="twitter:description" content="Manage articles of CSGeeks Blog" />
                <meta name="twitter:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
            </Head>

            <div className={`main-container ${sidebarMinimize ? 'main-container-minimized' : ''}`}>
                <div className={`posts-sections ${sidebarMinimize ? 'sidebar-minimized-posts-sections' : ''}`}>
                    <div className={`home-container ${sidebarMinimize ? `home-container-minimized` : ``}`}>
                        ...articles...
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminArticles;