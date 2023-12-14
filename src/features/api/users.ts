import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../app/store"

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User>, void>({
      query: () => "/users",
      transformResponse: (users: User[]) =>
        usersAdapter.setAll(initialState, users),
      providesTags: (result) =>
        result
          ? [
              { type: "Users", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Users" as const, id: id })),
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
  }),
})

export const selectUsersResult = usersApi.endpoints.getUsers.select()

export const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data,
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersId,
} = usersAdapter.getSelectors(
  (state: RootState) => selectUsersData(state) ?? initialState,
)

export const { useGetUsersQuery } = usersApi
