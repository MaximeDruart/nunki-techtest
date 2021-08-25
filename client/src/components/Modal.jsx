import React, { useEffect } from "react"
import { motion } from "framer-motion"

const Modal = ({ children, closeModal, cardAnimProps }) => {
  useEffect(() => {
    const toggle = ({ key }) => key === "Escape" && closeModal()
    window.addEventListener("keydown", toggle)
    return () => window.removeEventListener("keydown", toggle)
  }, [closeModal])

  return (
    <motion.div className="w-screen h-screen top-0 left-0 fixed z-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="w-full h-full absolute bg-black z-[-10]"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        {...cardAnimProps}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default Modal
