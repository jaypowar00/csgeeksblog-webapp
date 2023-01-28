const { createContext, useContext, useState } = require("react");

const ShareModalContext = createContext()

export const ShareModalWrapper = ({children}) => {
    const [modalShareOpen, setModalShareOpen] = useState(false)
    return (
        <ShareModalContext.Provider value={{
            modalShareOpen,
            setModalShareOpen
        }}>
            {children}
        </ShareModalContext.Provider>
    )
}

export let useShowModalContext = () => useContext(ShareModalContext)