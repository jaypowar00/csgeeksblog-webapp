const { createContext, useContext, useState, useEffect } = require("react");

const ShareModalContext = createContext()

export const ShareContextWrapper = ({ children }) => {
    const [modalShareOpen, setModalShareOpen] = useState(false)
    const [modalTagOptionsOpen, setModalTagOptionsOpen] = useState(false)
    const [sidebarMinimize, setSidebarMinimize] = useState(false)
    const [selectedTag, setSelectedTag] = useState(null)
    const [userTagsShortcut, setUserTagsShortcut] = useState([])
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
        }}>
            {children}
        </ShareModalContext.Provider>
    )
}

export let useGeekContext = () => useContext(ShareModalContext)