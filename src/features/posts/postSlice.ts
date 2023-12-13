import {
  Dictionary,
  EntityId,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

export type Post = {
  userId: number
  id: number
  title: string
  body: string
  reactions: Record<string, number>
  timestamp: number
}

type InitialState = {
  entities: Dictionary<Post>
  ids: EntityId[]
  status: string
  error: string | null | Error | undefined
  count: number
}

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.timestamp - a.timestamp,
})

const initialState: InitialState = {
  status: "idle",
  error: null,
  count: 0,
  ...postsAdapter.getInitialState(),
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (post: Pick<Post, "title" | "body" | "userId">) => {
    const response = await axios.post(POSTS_URL, post)
    return response.data
  },
)

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post) => {
    const response = await axios.put(`${POSTS_URL}/${post.id}`, post)
    console.log(response.data)
    return response.data
  },
)

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: Pick<Post, "id">) => {
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`)
      if (response?.status === 200) return id
      return `${response?.status}: ${response?.statusText}`
    } catch (err: any) {
      return err.message
    }
  },
)

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // addPost: {
    //   reducer(state, action: PayloadAction<Post>) {
    //     state.posts.push(action.payload)
    //   },
    //   prepare(title, body, userId) {
    //     return {
    //       payload: {
    //         id: new Date().getTime(),
    //         title,
    //         body,
    //         userId,
    //         timestamp: new Date().getTime(),
    //         reactions: {
    //           thumbsUp: 0,
    //           wow: 0,
    //           heart: 0,
    //           rocket: 0,
    //           coffee: 0,
    //         },
    //       },
    //     }
    //   },
    // },
    addReaction(state, action) {
      const { postId, reaction } = action.payload
      const post = state.entities[postId]
      if (post) post.reactions[reaction]++
    },
    increaseCounter(state) {
      state.count++
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"

        const loadedPosts = action.payload.map((post: Post, i: number) => {
          post.timestamp = new Date().getTime() - i * 10000
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          }
          return post
        })

        postsAdapter.upsertMany(state, loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addNewPost.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded"
        action.payload.id = new Date().getTime()
        action.payload.timestamp = new Date().getTime()
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        }
        postsAdapter.addOne(state, action.payload)
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Something went wrong.")
          state.status = "failed"
          return
        }
        state.status = "succeeded"
        action.payload.timestamp = new Date().getTime()
        postsAdapter.upsertOne(state, action.payload)
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          state.status = "failed"
          console.log("Something went wrong.")
          console.log(action.payload)
          return
        }
        state.status = "succeeded"
        postsAdapter.removeOne(state, action.payload.id)
      })
  },
})

export const selectCounter = (state: RootState) => state.posts.count

// export const selectPostById = (state: RootState, id: number) =>
//   state.posts.posts.find((post) => post.id === id)

// export const selectPostsByDateDescending = createSelector(
//   [selectAllPosts],
//   (posts) => posts.slice().sort((a, b) => b.timestamp - a.timestamp),
// )

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId),
)

export const getPostsStatus = (state: RootState) => state.posts.status
export const getPostsError = (state: RootState) => state.posts.status

export const { addReaction, increaseCounter } = postSlice.actions

export default postSlice.reducer
