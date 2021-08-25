import create from "zustand"
import { devtools } from "zustand/middleware"

const store = (set) => ({
  userModal: { isOpen: false, userDetail: null },
  setUserModal: (obj) => set((state) => ({ userModal: { ...state.userModal, ...obj } })),
  tweetModal: { isOpen: false, tweets: [], tweetIndex: null },
  setTweetModal: (obj) => set((state) => ({ tweetModal: { ...state.tweetModal, ...obj } })),
})

const useStore = create(devtools(store))

export default useStore
