import { create } from "zustand"
import api from "../utils/api"

export const usePostStore = create((set) => ({
    loading: false,
    error: null,
    posts: [],
    createPost: async (post) => {
        try {
            set({ loading: true, error: null })
            const response = await api.post("/posts", { title: post.title, content: post.content })
            if (response.status === 201) {
                set({ loading: false, error: null })
                console.log("Post created:", response)
            }
            else {
                set({ loading: false, error: "Failed to create post" })
            }

        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "An error occurred while creating the post"
            })
        }
    },
    getPosts: async () => {
        try {
            set({ loading: true, error: null })
            const response = await api.get("/posts")
            // console.log(response.data)
            // set({ loading: false, error: null })
            if (response.status === 200) {
                set({
                    loading: false,
                    error: null,
                    posts: response.data
                })
            }
            else {
                set({
                    loading: false,
                    error: "Failed to fetch posts"
                })
            }
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "An error occurred while fetching posts"
            })
        }
    }
}))