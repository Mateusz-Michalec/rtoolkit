import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { RootState } from "../../app/store"

export type Post = {
  userId: number
  id: number
  title: string
  body: string
  reactions: Record<string, number>
  timestamp: number
}

type PostPick = Pick<Post, "body" | "title" | "userId">

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.timestamp - a.timestamp,
})

const initialState = postsAdapter.getInitialState()

const transformPosts = (response: Post[]) => {
  const time = new Date().getTime()
  const loadedPosts = response.map((post, i) => {
    if (!post.timestamp) post.timestamp = time - i * 10000
    if (!post.reactions)
      post.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      }
    return post
  })
  return postsAdapter.setAll(initialState, loadedPosts)
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => "/posts",
      transformResponse: (posts: Post[]) => transformPosts(posts),
      providesTags: (result) =>
        result
          ? [
              { type: "Posts", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Posts" as const, id: id })),
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (posts: Post[]) => transformPosts(posts),
      providesTags: (result) =>
        result
          ? [...result.ids.map((id) => ({ type: "Posts" as const, id: id }))]
          : [{ type: "Posts", id: "LIST" }],
    }),
    addNewPost: builder.mutation({
      query: (post: PostPick) => ({
        url: `/post`,
        method: "POST",
        body: {
          ...post,
          timestamp: new Date().getTime(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (post: Post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: {
          ...post,
          timestamp: new Date().getTime(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Posts", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Posts", id: arg }],
    }),
  }),
})

export const selectPostsResults = postsApi.endpoints.getPosts.select()

const selectPostsData = createSelector(
  selectPostsResults,
  (postResults) => postResults.data, // normalized state object with ids and entities
)

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsId,
} = postsAdapter.getSelectors(
  (state: RootState) => selectPostsData(state) ?? initialState,
)
