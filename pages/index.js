import Head from "next/head";
import { useEffect, useState } from "react";
function Home() {
  const [hostUrl, sethostUrl] = useState("")
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
        <meta property="og:type" content="website" />
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
      <div className="flex justify-center text-center w-[80vw] h-screen mt-52">
        <h1 className="mx-auto justify-center">
          CSGeeks Blog V2.0
          <br />
          Created Using NextJS + Tailwind
        </h1>
      </div>
    </>
  );
}

export default Home;