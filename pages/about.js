import { useGeekContext } from "@/context/ShareModalContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AvadhutPhoto from "@/public/Avadhut_Tanugade.jpg";
import AjayPhoto from "@/public/Ajay_Powar.jpg";
import JayPhoto from "@/public/Jay_Powar.jpg";
import SreyashPhoto from "@/public/Sreyash_Gulavani.jpg";
import VinayPhoto from "@/public/Vinay_Shinde.jpg";
import AboutPeopleListItem from "@/components/AboutPeopleListItem";

const peopleList = [
    {
        name: "Jay Powar",
        image: JayPhoto,
        description: "RedRanger"
    }, {
        name: "Avadhut Tanugade",
        image: AvadhutPhoto,
        description: "Mr.WhoKnows"
    }, {
        name: "Ajay Powar",
        image: AjayPhoto,
        description: "AeyJey"
    }, {
        name: "Vinay Shinde",
        image: VinayPhoto,
        description: "Vin Diesel"
    }, {
        name: "Sreyash Gulavani",
        image: SreyashPhoto,
        description: "Traveller"
    },
]

function AboutPage() {
    const [hostUrl, sethostUrl] = useState("https://csgeeksblog.netlify.app")
    const [hostName, sethostName] = useState("csgeeksblog.netlify.app")
    const [childRefs, setChildRefs] = useState(new Map())
    const { sidebarMinimize } = useGeekContext()
    let doneAnimate = new Map()
    let initScrollCheck = false
    useEffect(() => {
        if (window.location.origin !== hostUrl)
            sethostUrl(window.location.origin)
        if (window.location.host !== hostName)
            sethostName(window.location.host)
        if (!initScrollCheck) { onScrollDetect(); initScrollCheck = true }
    }, [])
    const onScrollDetect = () => {
        childRefs.forEach(({ imageRef, setInAnimate, setFocused }, key) => {
            const clientHeight = document.documentElement.clientHeight
            const clientWidth = document.documentElement.clientWidth
            const photoSectionY = imageRef.current.getBoundingClientRect().y
            const photoSectionBottom = imageRef.current.getBoundingClientRect().bottom
            const photoSectionHeight = imageRef.current.getBoundingClientRect().height
            // anim check
            if (!doneAnimate.get(key)) {
                if (clientHeight > photoSectionY + photoSectionHeight * 2 / 3) {
                    doneAnimate.set(key, true)
                    setFocused(true)
                    setInAnimate(true)
                    setTimeout(() => {
                        setInAnimate(false)
                    }, 500);
                }
            }
            // focus check
            if (clientWidth > 555) {
                if (photoSectionBottom < clientHeight * 1.5 / 4)
                    setFocused(false)
                else if (photoSectionBottom > clientHeight * 3.5 / 3)
                    setFocused(false)
                else
                    setFocused(true)
            } else {
                if (photoSectionBottom < clientHeight * 1 / 4)
                    setFocused(false)
                else if (photoSectionBottom > clientHeight * 3.5 / 3)
                    setFocused(false)
                else
                    setFocused(true)
            }
        });
    }
    return (
        <>
            <Head>
                <title>CSGeeks Blog</title>
                <meta name="description" content="About Official CS Geeks Blog, know the tech, feel the tech! A place for tech." />
                <meta property="og:type" content="website" />
                <meta name="author" content="Jay Powar" />
                <meta property="og:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:secure" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
                <meta property="og:image:width" content="526" />
                <meta property="og:image:height" content="275" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:title" content="CSGeeks Blog | Official" />
                <meta property="og:description" content="About CSGeeks Blog site, Want to know tech, then take your tech with CS Geeks' Official Blog!" />
                <meta property="og:url" content={`${hostUrl}/`} />
                <meta property="og:url" content={`${hostUrl}`} />
                <meta property="og:site_name" content={`${hostName}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={`${hostName}`} />
                <meta property="twitter:url" content={`${hostUrl}/`} />
                <meta property="twitter:url" content={`${hostUrl}`} />
                <meta name="twitter:title" content="CSGeeks Blog | Official" />
                <meta name="twitter:description" content="About CSGeeks Blog site, Want to know tech, then take your tech with CS Geeks' Official Blog!" />
                <meta name="twitter:image" content={`${hostUrl}/CSGeeksBlog-OG-Thumbnail.jpg`} />
            </Head>
            <div className={`main-container ${sidebarMinimize ? 'main-container-minimized' : ''}`}>
                <div onScroll={onScrollDetect} className={`posts-sections ${sidebarMinimize ? 'sidebar-minimized-posts-sections' : ''}`}>
                    <div className="to-[#28292c] via-[#202325] from-[#28292c] bg-gradient-to-tr px-3.5 py-8 min-[768px]:py-10 mx-4 my-4 rounded-md h-fit">
                        <h1 className="mx-auto w-fit text-[#cbebc6] font-bold text-2xl">
                            CS Geeks
                        </h1>
                        <span className="text-[#ced8cc] mt-10 block mx-auto min-[768px]:max-w-[750px]" style={{ fontFamily: "Nunito" }}>
                            <span className="ml-8">
                                In the year 2016, a group 5 people came together and founded CSGeeks.&nbsp;
                                Initiated the founding by creating a <Link href="https://www.youtube.com/@CSGeeks" target={"_blank"} title="Go to official CSGeeks YouTube channel">YouTube</Link> channel for sharing technology related tricks and tips and other amazing tech things.
                            </span><br /><br />
                            <span className="ml-8">
                                If you have any security related issues while using this website check <Link href="/privacypolicy">privacy policy</Link> just in case.
                            </span>
                            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-[95 %]" />
                            <span className="mx-auto block w-fit font-semibold text-lg text-[#cbebc6]">who WE are?</span>
                            <div className="w-[100%] grid min-[1224px]:-ml-8 min-[1224px]:grid-cols-2 gap-20 min-[555px]:gap-x-20 gap-y-0 ">
                                {
                                    peopleList.map((person, index) =>
                                        <AboutPeopleListItem
                                            key={index}
                                            p_no={index}
                                            person={person}
                                            childRefs={childRefs}
                                            setChildRefs={setChildRefs}
                                        />
                                    )
                                }
                            </div>
                        </span>
                    </div>
                    <footer className="bg-gray-800">
                        <div className="p-4 pr-5 py-6 mx-auto max-w-screen-xl md:p-8 lg:p-10">
                            <div className="grid grid-cols-3 gap-8 md:grid-cols-3 lg:grid-cols-4">
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Social</h2>
                                    <ul className="text-gray-500 dark:text-gray-400">
                                        <li className="mb-4">
                                            <Link href="#" className="hover:underline">YouTube</Link>
                                        </li>
                                        <li className="mb-4">
                                            <Link href="#" className="hover:underline">Facebook</Link>
                                        </li>
                                        <li className="mb-4">
                                            <Link href="#" className="hover:underline">Instagram</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Info</h2>
                                    <ul className="text-gray-500 dark:text-gray-400">
                                        <li className="mb-4">
                                            <Link href="/about" className="hover:underline">About</Link>
                                        </li>
                                        <li className="mb-4">
                                            <Link href="/posts" className="hover:underline">Blog</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
                                    <span className="mb-4 text-gray-500 dark:text-gray-400">
                                        <Link target={'_blank'} href="https://github.com/mrwhoknows55/csgeeks-blog-app/releases" className="hover:underline">Android</Link>
                                    </span>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                    <span className="mb-4 text-gray-500 dark:text-gray-400">
                                        <Link href="/privacypolicy" className="hover:underline">Privacy Policy</Link>
                                    </span>
                                </div>
                            </div>
                            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                            <div className="text-center">
                                <Link href="#" className="flex justify-center items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white footer-title">
                                    CSGeeks
                                </Link>
                                <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2017-2022 <a href="#" className="hover:underline footer-mini-title">CSGeeks™</a>. All Rights Reserved.
                                </span>
                                <ul className="flex justify-center mt-5 space-x-5">
                                    <li>
                                        <Link href="https://www.instagram.com/csgeeks_3/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400" target={'_blank'}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://twitter.com/Red_Ranger00" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400" target={'_blank'}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://github.com/jaypowar00/csgeeksblog-webapp" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400" target={'_blank'}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default AboutPage;