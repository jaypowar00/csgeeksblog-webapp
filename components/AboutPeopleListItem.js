import { useGeekContext } from "@/context/ShareModalContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";

function AboutPeopleListItem({ person, p_no, childRefs, setChildRefs }) {
    const [flipped, setFlipped] = useState(false)
    const [inAnimate, setInAnimate] = useState(false)
    const [focused, setFocused] = useState(false)
    const [detailClicked, setDetailClicked] = useState(false)
    const imageRef = useRef(null)
    const {
        sidebarMinimize, setPeopleModalTriggered, setModal_peoplePhoto,
        setModal_peopleName, setModal_peopleInfo, setModal_peopleExperience,
        setModal_peopleProjects, setModal_peopleAlias
    } = useGeekContext()
    useEffect(() => {
        if (imageRef.current !== null && !childRefs.has(p_no))
            setChildRefs(childRefs.set(p_no, { imageRef, setInAnimate, setFocused }))
    }, [])

    const configurePeopleModal = () => {
        setModal_peoplePhoto(person.image)
        setModal_peopleName(person.fullname)
        setModal_peopleInfo(person.info)
        setModal_peopleExperience(person.experiences)
        setModal_peopleProjects(person.projects)
        setModal_peopleAlias(person.description)
        console.log(person.image)
        console.log(person.fullname)
        console.log(person.info)
        console.log(person.experiences)
        console.log(person.projects)
        console.log(person.description)
        setPeopleModalTriggered(true)
    }

    return (
        <div className={`cursor-pointer image-card select-none my-2 ${flipped ? 'image-card-flipped' : ''} ${sidebarMinimize ? 'image-card-sidebar-minimized' : ''}`} onClick={() => { detailClicked ? setDetailClicked(false) : setFlipped(!flipped) }}>
            <div ref={imageRef} className={`inner-card ${inAnimate ? 'in-animate-image' : ''}`}>
                <div className={`flip-card-front ${focused ? '' : 'opacity-30'} transition-all duration-1000`}>
                    <Image
                        draggable={false}
                        className="max-w-[400px] w-full h-full p-1 rounded-sm inline-block object-cover"
                        width={400} height={400} quality={70}
                        src={person.image}
                        alt={`profile picture`}
                    />
                </div>
                <div className={`flip-card-back ${focused ? '' : 'opacity-60'}`}>
                    <span className="block">{person.description}</span>
                    <Button className="block py-1 px-2 bg-gray-700 text-white rounded-md text-sm" onMouseDown={() => setDetailClicked(true)} onClick={e => { configurePeopleModal() }}>Details</Button>
                </div>
            </div>
        </div>
    );
}

export default AboutPeopleListItem;