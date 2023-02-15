const { createContext, useContext, useState, useEffect } = require("react");

const ShareModalContext = createContext()

export const ShareContextWrapper = ({ children }) => {
    const [modalShareOpen, setModalShareOpen] = useState(false)
    const [modalTagOptionsOpen, setModalTagOptionsOpen] = useState(false)
    const [sidebarMinimize, setSidebarMinimize] = useState(false)
    const [selectedTag, setSelectedTag] = useState(null)
    const [userTagsShortcut, setUserTagsShortcut] = useState([])
    const [searchBarToggle, setSearchBarToggle] = useState(false)
    const [peopleModalTriggered, setPeopleModalTriggered] = useState(false)
    const [peopleModalOpened, setPeopleModalOpened] = useState(false)
    const [modal_peoplePhoto, setModal_peoplePhoto] = useState(false)
    const [modal_peopleName, setModal_peopleName] = useState(false)
    const [modal_peopleInfo, setModal_peopleInfo] = useState(false)
    const [modal_peopleExperience, setModal_peopleExperience] = useState(false)
    const [modal_peopleProjects, setModal_peopleProjects] = useState(false)
    const [modal_peopleAlias, setModal_peopleAlias] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('minimized'))
            setSidebarMinimize(localStorage.getItem('minimized') === 'true')
        if (localStorage.getItem('user.tags'))
            setUserTagsShortcut(localStorage.getItem('user.tags').split(','))
    }, [])

    return (
        <ShareModalContext.Provider value={{
            modalShareOpen, setModalShareOpen,
            sidebarMinimize, setSidebarMinimize,
            selectedTag, setSelectedTag,
            userTagsShortcut, setUserTagsShortcut,
            modalTagOptionsOpen, setModalTagOptionsOpen,
            searchBarToggle, setSearchBarToggle,
            peopleModalTriggered, setPeopleModalTriggered,
            peopleModalOpened, setPeopleModalOpened,
            modal_peoplePhoto, setModal_peoplePhoto,
            modal_peopleName, setModal_peopleName,
            modal_peopleInfo, setModal_peopleInfo,
            modal_peopleExperience, setModal_peopleExperience,
            modal_peopleProjects, setModal_peopleProjects,
            modal_peopleAlias, setModal_peopleAlias,
        }}>
            {children}
        </ShareModalContext.Provider>
    )
}

export let useGeekContext = () => useContext(ShareModalContext)