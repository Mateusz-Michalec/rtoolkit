import React from "react"
import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectUserById } from "./usersSlice"
import { selectPostsByUser } from "../posts/postSlice"

const User = () => {
  const { userId } = useParams()

  const user = useAppSelector((state) => selectUserById(state, Number(userId)))
  const userPosts = useAppSelector((state) =>
    selectPostsByUser(state, Number(userId)),
  )

  return (
    <>
      <h2>{user?.name}</h2>
      <ol>
        {userPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ol>
    </>
  )
}

export default User
