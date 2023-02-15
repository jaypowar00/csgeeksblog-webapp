import { useEffect, useRef, useState } from "react";
import JayPhoto from "@/public/Jay_Powar.jpg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";
import { useGeekContext } from "@/context/ShareModalContext";

function DetailPeopleModal() {
    const [emptyCommandSpan, setEmptyCommandSpan] = useState(true)
    const [customCursor, setCustomCursor] = useState(false)
    const eyeImageRef = useRef(null)
    const profileImageRef = useRef(null)
    const allowCommandCursorAnim = useRef(false)
    const {
        peopleModalTriggered, setPeopleModalTriggered, peopleModalOpened, setPeopleModalOpened,
        modal_peoplePhoto, modal_peopleName, modal_peopleInfo, modal_peopleExperience, modal_peopleProjects,
        modal_peopleAlias
    } = useGeekContext()
    let emptyCommandTimeoutOuter = null
    let emptyCommandTimeoutInner = null

    useEffect(() => {
        clearTimeout(emptyCommandTimeoutOuter)
        clearTimeout(emptyCommandTimeoutInner)
        allowCommandCursorAnim.current = peopleModalTriggered
        if (peopleModalTriggered) {
            setPeopleModalOpened(true)
            setTimeout(() => {
                emptyCommandAnim()
            }, 500);
        }
        else {
            setPeopleModalOpened(false)
        }
    }, [peopleModalTriggered])

    const emptyCommandAnim = () => {
        clearTimeout(emptyCommandTimeoutOuter)
        clearTimeout(emptyCommandTimeoutInner)
        setEmptyCommandSpan(true)
        emptyCommandTimeoutOuter = setTimeout(() => {
            setEmptyCommandSpan(false)
            if (allowCommandCursorAnim.current)
                emptyCommandTimeoutInner = setTimeout(() => {
                    if (allowCommandCursorAnim.current)
                        emptyCommandAnim()
                }, 250)
        }, 800)
    }
    const onMouseMoveImage = (e) => {
        if (!navigator.maxTouchPoints > 0) {
            let { left, right, top, bottom } = profileImageRef.current.getBoundingClientRect()
            if ((left < e.pageX && e.pageX < right) && (top < e.pageY && e.pageY < bottom)) {
                if (!customCursor) setCustomCursor(true)
                eyeImageRef.current.style.top = `${e.pageY - 55}px`
                eyeImageRef.current.style.left = `${e.pageX - 106}px`
            } else {
                setCustomCursor(false)
            }
            console.log(left, right, top, bottom)
            console.log(e.pageX, e.pageY)
        }
    }
    const closePeopleModal = () => {
        setPeopleModalTriggered(false)
        setPeopleModalOpened(false)
    }
    return (
        <>
            {/* <div className={`w-screen h-screen fixed bg-black transition-opacity duration-[4s] ${peopleModalTriggered?'block':'hidden'} ${fadeBG ? `opacity-80 opacity-anim` : `opacity-0`} z-10`}> */}
            <div className={`w-screen h-screen fixed cursor-pointer bg-black transition-opacity duration-[4s] ${peopleModalTriggered ? 'block' : 'hidden'} ${peopleModalOpened ? `opacity-80 opacity-anim` : `opacity-0`} z-10`}
                onClick={() => { closePeopleModal() }}>
            </div>
            <div className={`people-detail-modal ${peopleModalTriggered ? 'block' : 'hidden'} ${peopleModalOpened ? 'people-detail-modal-enter-anim' : ''} ${customCursor ? 'cursor-none' : ''}`} onMouseMove={onMouseMoveImage}>
                <div className="absolute w-full h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden">
                    <div className={`w-full h-full absolute overflow-hidden styled-border ${peopleModalOpened ? 'styled-border-enter-anim' : ''}`}>
                        <span className="rotate-0"></span>
                        <span className="rotate-180"></span>
                    </div>
                </div>
                <div className="relative flex flex-col h-full hide-scrollbar overflow-y-scroll" >
                    <div className="w-fit mx-auto h-fit mb-10" style={{ fontSize: '14px' }}>
                        <span className="-mb-5 text-[#f9fbe7]">{modal_peopleAlias}</span><br />
                        <hr className="border-[#dadcb5] w-[30%] absolute left-[50%] translate-x-[-50%]" />
                    </div>
                    <div className="sub-terminals">
                        <div className="shadow-lg rounded-lg relative overflow-hidden w-full h-full bg-center bg-cover image-flare" ref={profileImageRef} style={{ backgroundImage: `url(${modal_peoplePhoto.src})` }} >
                            <div className="">
                                <div className="absolute right-2.5 top-2.5 h-3.5 w-3.5 bg-red-500 hover:bg-red-400 rounded-full text-black transition-colors duration-150 cursor-pointer"
                                    onClick={() => { closePeopleModal() }}></div>
                                <span className={`fixed top-0 left-0 ${customCursor ? '' : 'hidden'}`} ref={eyeImageRef}>
                                    <VisibilityIcon />
                                </span>
                                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-green-400 -z-10">~$: fetching image...</span>
                                {/* <Image
                                    className="w-full transition-all duration-300"
                                    ref={profileImageRef} draggable={false}
                                    src={JayPhoto} quality={70} alt="founder's photo"
                                    width={500} height={500} 
                                    style={{objectFit: 'cover', layout: 'fill'}}/> */}
                            </div>
                        </div>
                        <div className="px-5 pt-1 shadow-lg text-gray-100  subpixel-antialiased pb-3 rounded-lg leading-normal overflow-hidden w-full h-fit" style={{ fontSize: '14px' }}>
                            <div className="my-2 -mr-2 flex float-right">
                                <div className="h-3.5 w-3.5 bg-red-500 hover:bg-red-400 rounded-full text-black transition-colors duration-150 cursor-pointer"
                                    onClick={() => { closePeopleModal() }}></div>
                            </div>
                            <div className="mt-4 flex">
                                <span className="text-green-400 select-none">command~$: </span>
                                <span className="text-green-400 ml-1.5 -mr-1.5">name</span>
                                <p className="flex-1 typing items-center pl-2 select-none">
                                    <span className='font-black'>{emptyCommandSpan ? '|' : ''}</span>
                                    <br />
                                </p>
                            </div>
                            <div className="mt-1 w-full">
                                <span className="text-green-500 py-1">~</span>
                                <span className="text-green-200 py-1 ml-3">{modal_peopleName}</span>
                            </div>
                        </div>
                        <div className="px-5 pt-1 shadow-lg text-gray-100 subpixel-antialiased pb-3 rounded-lg leading-normal overflow-hidden w-full h-fit" style={{ fontSize: '14px' }}>
                            <div className="my-2 -mr-2 flex float-right">
                                <div className="h-3.5 w-3.5 bg-red-500 hover:bg-red-400 rounded-full text-black transition-colors duration-150 cursor-pointer"
                                    onClick={() => { closePeopleModal() }}></div>
                            </div>
                            <div className="mt-4 flex">
                                <span className="text-green-400 select-none">command~$: </span>
                                <span className="text-green-400 ml-1.5 -mr-1.5">info</span>
                                <p className="flex-1 typing items-center pl-2 select-none">
                                    <span className='font-black'>{emptyCommandSpan ? '|' : ''}</span>
                                    <br />
                                </p>
                            </div>
                            <div className="mt-1 w-full">
                                <span className="text-green-500 py-1">~</span>
                                {/* <span className="text-green-200 py-1 ml-3">Skilled at full stack web development. Worked with android development &amp; game development as well!</span> */}
                                <span className="text-green-200 py-1 ml-3">{modal_peopleInfo.bio}</span>
                                <div className="text-green-200 py-1 mt-2">
                                    &#91;x&#93; Links:
                                    <ul className="ml-6 profile-links" style={{ listStyleType: 'square' }}>
                                        {
                                            modal_peopleInfo.links && (Object.keys(modal_peopleInfo.links).length > 0) &&
                                            Object.keys(modal_peopleInfo.links).map((key, index) => {
                                                return (<li key={index}><Link href={key === "Email"?`mailto:${modal_peopleInfo.links[key]}`:modal_peopleInfo.links[key]} target={"_blank"}>{key}</Link></li>)
                                            })
                                        }
                                        {/* <li><Link href="">Github</Link></li>
                                        <li>Website</li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 pt-1 shadow-lg text-gray-100 subpixel-antialiased pb-3 rounded-lg leading-normal overflow-hidden w-full h-fit" style={{ fontSize: '14px' }}>
                            <div className="my-2 -mr-2 flex float-right">
                                <div className="h-3.5 w-3.5 bg-red-500 hover:bg-red-400 rounded-full text-black transition-colors duration-150 cursor-pointer"
                                    onClick={() => { closePeopleModal() }}></div>
                            </div>
                            <div className="mt-4 flex">
                                <span className="text-green-400 select-none">command~$: </span>
                                <span className="text-green-400 ml-1.5 -mr-1.5">experience</span>
                                <p className="flex-1 typing items-center pl-2 select-none">
                                    <span className='font-black'>{emptyCommandSpan ? '|' : ''}</span>
                                    <br />
                                </p>
                            </div>
                            {
                                modal_peopleExperience && modal_peopleExperience.map((experience, index) => {
                                    return (
                                        <div className="mt-1 w-full" key={index}>
                                            <span className="text-green-500 py-1">~</span>
                                            {/* <span className="text-green-200 py-1 ml-3"><u>Krishi Network</u></span> */}
                                            <span className="text-green-200 py-1 ml-3" style={{ fontSize: '16px' }}><Link className="!text-green-200 underline" href={experience.companyWebsite}>{experience.name} &#40; {experience.completed} &#41;</Link></span><br />
                                            <span className="text-green-200 py-1 ml-5"><b><i>{experience.role}</i></b></span>
                                            <div className="text-green-200 mt-2 ml-6">
                                                <ul style={{ listStyleType: 'square' }}>
                                                    {
                                                        experience.info.map((info_item, index) => {
                                                            return (
                                                                <li key={index}>{info_item}</li>
                                                            )
                                                        })
                                                    }
                                                    {/* <li>Krishi Network is an app which encourages farmers to use smartphones for the productive purpose</li>
                                                    <li>Daily SCRUM meets with manager to get receive task, I was give few modules to work on flask backend</li>
                                                    <li>Developed functionality to get similar questions API based on existing question text</li>
                                                    <li>Functionality to highlight unseen answered user question on top of user feed until user has seen the answer using user data from redis cache</li>
                                                    <li>Technologies: Flask MVC, Redis, Postgresql</li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="bg-[#444141] px-5 pt-1 shadow-lg text-gray-100 subpixel-antialiased pb-3 rounded-lg leading-normal overflow-y-scroll w-full h-full hide-scrollbar" style={{ fontSize: '14px' }}>

                            <div className="my-2 -mr-2 flex float-right">
                                <div className="h-3.5 w-3.5 bg-red-500 hover:bg-red-400 rounded-full text-black transition-colors duration-150 cursor-pointer"
                                    onClick={() => { closePeopleModal() }}></div>
                            </div>
                            <div className="mt-4 flex">
                                <span className="text-green-400 select-none">command~$: </span>
                                <span className="text-green-400 ml-1.5 -mr-1.5">projects</span>
                                <p className="flex-1 typing items-center pl-2 select-none">
                                    <span className='font-black'>{emptyCommandSpan ? '|' : ''}</span>
                                    <br />
                                </p>
                            </div>
                            {
                                modal_peopleProjects && modal_peopleProjects.map((project, index) => {
                                    return (
                                        <div className="mt-3 w-full" key={index}>
                                            <span className="text-green-500 py-1">~</span>
                                            <span className="text-green-200 py-1 ml-3" style={{ fontSize: '16px' }}>{project.name} &#40;completed&#41;</span><br />
                                            <span className="text-green-200 py-1 ml-5">
                                                {project.links.length > 0 && 'Links: '}
                                                {
                                                    project.links.map((link, index) => {
                                                        return Object.keys(link).map(key => {
                                                            console.log(key)
                                                            console.log(link[key])
                                                            return (
                                                                <span className="mr-3" key={index}><Link className="underline" href={link[key]}>{key}</Link></span>
                                                            )
                                                        })
                                                    })
                                                }
                                            </span>
                                            <div className="text-green-200 mt-2 ml-6">
                                                <ul style={{ listStyleType: 'square' }}>
                                                    {
                                                        project.info.map((info_item, index) => {
                                                            return (
                                                                <li key={index}>{info_item}</li>
                                                            )
                                                        })
                                                    }
                                                    {/* <li>Krishi Network is an app which encourages farmers to use smartphones for the productive purpose</li>
                                                    <li>Daily SCRUM meets with manager to get receive task, I was give few modules to work on flask backend</li>
                                                    <li>Developed functionality to get similar questions API based on existing question text</li>
                                                    <li>Functionality to highlight unseen answered user question on top of user feed until user has seen the answer using user data from redis cache</li>
                                                    <li>Technologies: Flask MVC, Redis, Postgresql</li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailPeopleModal;