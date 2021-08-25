import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import useStore from "../searchResultsStore"
import Modal from "./Modal"

// a higher order component rendering a modal and handling its conditional rendering.
// THe conditional rendering could be done at a higher level in the page component but it allows for UserModal to contain the animation logic as AnimatePresence must always remain in the tree to trigger the exit animations
const UserModal = ({ closeModal }) => {
  const userModal = useStore((state) => state.userModal)
  return (
    <AnimatePresence exitBeforeEnter>
      {userModal.isOpen && (
        <Modal key="uuuu" closeModal={closeModal}>
          <div className="bg-secondary1 rounded-lg relative flex flex-col p-6">
            <div className="absolute top-6 right-6">
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.08, rotate: 5 }}
                className="material-icons ml-1.5 flex flex-row text-textStandard"
              >
                close
              </motion.button>
            </div>
            <div className="flex">
              <div className="rounded-lg h-14 w-14 overflow-hidden flex-shrink-0">
                <img
                  className="object-cover w-full h-full"
                  src={userModal.userDetail.profile_image_url}
                  alt="Tweet user"
                />
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`http://twitter.com/${userModal.userDetail.screen_name}`}
                className="ml-4 max-w-xs md:max-w-md"
              >
                <div className="text-textStandard text-xl font-bold">{userModal.userDetail.name}</div>
                <div className="text-textDisabled text-base mt-0">@{userModal.userDetail.screen_name}</div>
              </a>
            </div>

            <div className="mt-4 text-textStandard max-w-xs md:max-w-md">{userModal.userDetail.description}</div>
            <div className="mt-4 flex flex-row justify-between">
              <div>
                <span className="text-lg text-textStandard">{userModal.userDetail.followers_count}</span>
                <span className="ml-1.5 text-textDisabled">followers</span>
              </div>
              <div>
                <span className="text-lg text-textStandard">{userModal.userDetail.friends_count}</span>
                <span className="ml-1.5 text-textDisabled">following</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default UserModal
