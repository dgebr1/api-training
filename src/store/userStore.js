import { create } from "zustand";


export const useUserStore = create(()=>({
    user:2,
    login:()=>{
        console.log("login")
    }
}))