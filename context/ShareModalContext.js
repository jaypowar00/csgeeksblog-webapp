const { createContext, useContext, useState } = require("react");

const ShareModalContext = createContext()

export const ShareContextWrapper = ({children}) => {
    const [modalShareOpen, setModalShareOpen] = useState(false)
    const [sidebarMinimize, setSidebarMinimize] = useState(false)
    return (
        <ShareModalContext.Provider value={{
            modalShareOpen, setModalShareOpen,
            sidebarMinimize, setSidebarMinimize
        }}>
            {children}
        </ShareModalContext.Provider>
    )
}

export let useGeekContext = () => useContext(ShareModalContext)