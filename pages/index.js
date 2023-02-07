import { useGeekContext } from "@/context/ShareModalContext";
import Head from "next/head";
import { useEffect, useState } from "react";
import nextSVG from '@/public/next.svg'
import tailwindSVG from '@/public/tailwind_css_logo.svg'
import AddIcon from '@mui/icons-material/Add';
import Image from "next/image";
import Link from "next/link";
import { GitHub } from "@mui/icons-material";
import PreviewIcon from '@mui/icons-material/Preview';
import CircleIcon from '@mui/icons-material/Circle';

function Home() {
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
        <meta name="description" content="Official CS Geeks Blog, know the tech, feel the tech! A place for tech." />
        <meta property="og:type" content="article" />
        <meta name="author" content="Jay Powar" />
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

      <div className={`main-container ${sidebarMinimize ? 'main-container-minimized' : ''}`}>
        <div className={`posts-sections ${sidebarMinimize ? 'sidebar-minimized-posts-sections' : ''}`}>
          <div className={`home-container ${sidebarMinimize ? `home-container-minimized`:``}`}>
            <h1 className="mx-auto w-fit text-[#C2F9BB] font-bold text-2xl">
              CSGeeks Blog V2.0
            </h1>
            <br />
            {/* <span className="italic text-[#F5ABAB]">Created Using</span> */}
            <span className="italic text-[#38AECC]">created with</span>
            <div className="-mt-6 max-[460px]:-mt-3">
              <Link href='https://nextjs.org/' passHref target={'_blank'}>
                <Image className="home-svg-next inline-block" src={nextSVG} alt='next_icon' width={200} height={0} />
              </Link>
              <AddIcon className="ml-2 text-[#BEB2C8]" />
              <Link href="https://tailwindcss.com/" passHref target={'_blank'}>
                <Image className="home-svg-tail inline-block" src={tailwindSVG} alt='tailwind_icon' width={100} height={0} />
              </Link>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-[95 %]" />
              <div className="home-body-section">
                <span className="justify-center flex"><GitHub /><span className="ml-2"> Github Links:</span></span>
                <Link className="my-2.5 !text-[#F1F7ED] block" href="https://github.com/jaypowar00/csgeeksblog-webapp" passHref target={'_blank'}>
                  <CircleIcon className="mr-1 w-[5px]" />Latest frontend (current)
                </Link>
                <Link className="my-2.5 !text-[#F1F7ED] block" href="https://github.com/jaypowar00/csgeeksblog" passHref target={'_blank'}>
                  <CircleIcon className="mr-1 w-[5px]" />Old frontend
                </Link>
                <span className="justify-center flex"><PreviewIcon /><span className="ml-2"> Preview Links:</span></span>
                <Link className="my-2.5 !text-[#F1F7ED] block" href="https://csgeeksblog.netlify.app" passHref target={'_blank'}>
                  <CircleIcon className="mr-1 w-[5px]" />Latest frontend (current)
                </Link>
                <Link className="my-2.5 !text-[#F1F7ED] block" href="https://jaypowar00.github.io/csgeeksblog" passHref target={'_blank'}>
                  <CircleIcon className="mr-1 w-[5px]" />Old frontend
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;