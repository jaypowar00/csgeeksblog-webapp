import Head from "next/head";
import { useEffect, useState } from "react";
function Home() {
  const [hostUrl, sethostUrl] = useState("https://csgeeksblog.netlify.app")
  const [hostName, sethostName] = useState("csgeeksblog.netlify.app")
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
        <meta name="description" content="Official CS Geeks Blog, know the tech, feel the tech! A place for tech." />
        <meta property="og:type" content="article" />
        <meta name="author" content="Jay Powar"/>
        <meta property="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
        <meta property="og:image:secure" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
        <meta property="og:image:width" content="526" />
        <meta property="og:image:height" content="275" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:title" content="CSGeeks Blog | Official" />
        <meta property="og:description" content="Want to know tech, then take your tech with CS Geeks' Official Blog!" />
        <meta property="og:url" content={`${hostUrl}/`} />
        <meta property="og:url" content={`${hostUrl}`} />
        <meta property="og:site_name" content={`${hostName}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={`${hostName}`} />
        <meta property="twitter:url" content={`${hostUrl}/`} />
        <meta property="twitter:url" content={`${hostUrl}`} />
        <meta name="twitter:title" content="CSGeeks Blog | Official" />
        <meta name="twitter:description" content="Want to know tech, then take your tech with CS Geeks' Official Blog!" />
        <meta name="twitter:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
      </Head>
      <div className="posts-sections">
        <h1 className="mx-auto w-fit height-[100px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
          CSGeeks Blog V2.0
          <br />
          <span className="italic">Created Using <b>NextJS + Tailwind</b></span>
        </h1>
      </div>
    </>
  );
}

export default Home;