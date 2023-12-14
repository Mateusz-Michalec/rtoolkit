import React from "react"
import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { useGetPostsByUserIdQuery } from "../api/posts"
import { selectUserById } from "../api/users"

const User = () => {
  const { userId } = useParams()
  const {
    data: userPosts,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostsByUserIdQuery(userId)

  const user = useAppSelector((state) => selectUserById(state, Number(userId)))

  return (
    <>
      <h2>{user?.name}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <ol>
          {userPosts.ids.map((postId) => (
            <li key={postId}>
              <Link to={`/post/${postId}`}>
                {userPosts.entities[postId]?.title}
              </Link>
            </li>
          ))}
        </ol>
      ) : isError ? (
        <p>Something went wrong.</p>
      ) : null}
    </>
  )
}

export default User
