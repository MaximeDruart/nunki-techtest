import create from "zustand"
import { devtools } from "zustand/middleware"

const store = (set) => ({
  userModal: { isOpen: false, userDetail: null },
  setUserModal: (obj) => set((state) => ({ userModal: { ...state.userModal, ...obj } })),
})

const useStore = create(devtools(store))

export default useStore
