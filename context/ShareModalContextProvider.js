import React, { useState } from 'react'
import { ShowModalContext } from './ShareModalContext'

function ShareModalContextProvider({ children }) {
  let [modalShareOpen, setModalShareOpen] = useState(false)
  let setModalShareOpenFunction = (value) => {
    console.log('modal clicked')
    setModalShareOpen(value)
  }
  return (
    <ShowModalContext.Provider value={{ modalShareOpen, setModalShareOpenFunction }}>
      {children}
    </ShowModalContext.Provider>
  )
}

export default ShareModalContextProvider