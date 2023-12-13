import React from "react"
import { useAppSelector } from "../../app/hooks"
import { selectUserById } from "../users/usersSlice"
import { Link } from "react-router-dom"

type PostAuthorProps = {
  userId: number
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return (
    <span className="postCredit">
      by{" "}
      {author ? (
        <Link to={`/user/${author.id}`}>{author.name} </Link>
      ) : (
        "unknown"
      )}
    </span>
  )
}

export default PostAuthor
